<?php

namespace App\Models;

use App\Models\Interfaces\{AuctioneerScopeInterface,
    BelongsToAuctioneerInterface,
    FilterableInterface,
    PhotoableInterface,
    SearchableInterface,
    SortableInterface};
use App\Models\Traits\{Addressable,
    AuctioneerScope,
    BelongsToAuctioneer,
    Filterable,
    MustVerifyMobile,
    Photoable,
    Searchable,
    Sortable};
use App\Notifications\VerifyEmail;
use App\Notifications\ResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Sametsahindogan\JWTRedis\Traits\JWTRedisHasRoles;
use Spatie\Activitylog\Traits\LogsActivity;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail, BelongsToAuctioneerInterface, FilterableInterface, PhotoableInterface, SortableInterface, SearchableInterface, AuctioneerScopeInterface
{
    use HasFactory, Notifiable, LogsActivity, MustVerifyMobile, Addressable, Photoable, AuctioneerScope,
        Billable, Sortable, Filterable, Searchable, BelongsToAuctioneer,
        JWTRedisHasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'given_name', 'family_name', 'email', 'password', 'type', 'email_pin', 'mobile_pin', 'country_code', 'auctioneer_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_pin', 'mobile_pin',
    ];

    /**
     * The attributes that should be logged in Activity Log.
     *
     * @var array
     */
    protected static $logAttributes = [
        'given_name', 'family_name', 'email', 'type'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'mobile_verified_at' => 'datetime',
        'address_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_email_verified', 'is_mobile_verified', 'is_address_verified',
        'primary_address', 'billing_address', 'shipping_address',
        'auctioneer_company', 'is_card_verified',
        'registered_auctions', 'approved_auctions',
        'blocked_auctioneers', 'pending_auctions'
    ];

    /**
     * Return columns allowed to full text search
     *
     * @var array
     */
    public $searchables = [
        'given_name', 'family_name', 'email', 'type'
    ];

    /**
     * Allowed columns to filter by.
     *
     * @var array
     */
    public $filterables = [
        'given_name', 'family_name', 'email', 'type'
    ];

    /**
     * Allowed columns to sort by.
     *
     * @var array
     */
    public $sortables = [
        'given_name', 'family_name', 'email', 'type'
    ];

    /**
     * Check If user is admin
     *
     * @return boolean
     */
    public function isAdmin() {
        return $this->type == 'admin';
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Send the verification notification.
     * Overload to use SendGrid
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    /**
     * Get the email verified flag for the user.
     *
     * @return bool
     */
    public function getIsEmailVerifiedAttribute()
    {
        return isset($this->attributes['email_verified_at']);
    }

    /**
     * Get the mobile verified flag for the user.
     *
     * @return bool
     */
    public function getIsMobileVerifiedAttribute()
    {
        return isset($this->attributes['mobile_verified_at']);
    }

    /**
     * Get the address verified flag for the user.
     *
     * @return bool
     */
    public function getIsAddressVerifiedAttribute()
    {
        return isset($this->attributes['address_verified_at']);
    }

    /**
     * Get the card verified flag for the user.
     *
     * @return bool
     */
    public function getIsCardVerifiedAttribute()
    {
        return isset($this->attributes['card_last_four']) && strlen($this->attributes['card_last_four']) == 4;
    }

    /**
     * Route notifications for the Nexmo channel.
     *
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return string
     */
    public function routeNotificationForNexmo($notification)
    {
        return $this->mobile;
    }

    /**
     * Send the password reset notification.
     * Override email type
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * Get the associated auctioneers.
     *
     * @return \App\Models\Auctioneer
     */
    public function getAuctioneerCompanyAttribute()
    {
        return $this->auctioneer;
    }

    /**
     * Get all attached auctions to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function auctions()
    {
        return $this->hasMany(Auction::class, 'created_by_user_id');
    }

    /**
     * The auctions that user is registered
     */
    public function registeredAuctions()
    {
        return $this->belongsToMany(Auction::class, 'auction_registered_users');
    }

    public function getRegisteredAuctionsAttribute()
    {
        return $this->registeredAuctions()->pluck('auctions.id');
    }

    /**
     * The auctions that user is approved for bidding in following auctions
     */
    public function approvedAuctions()
    {
        return $this->belongsToMany(Auction::class, 'auction_registered_users')->wherePivot('is_approved', 1);
    }

    public function getApprovedAuctionsAttribute()
    {
        return $this->approvedAuctions()->pluck('auctions.id');
    }

    /**
     * The auctions that user is pending for approve for bidding in following auctions
     */
    public function pendingAuctions()
    {
        return $this->belongsToMany(Auction::class, 'auction_registered_users')->wherePivot('is_approved', 0);
    }

    public function getPendingAuctionsAttribute()
    {
        return $this->pendingAuctions()->pluck('auctions.id');
    }

    /**
     * The auctioneers that user is blocked
     */
    public function blockedAuctioneers()
    {
        return $this->belongsToMany(Auctioneer::class, 'auctioneer_blocked_users');
    }

    public function getBlockedAuctioneersAttribute()
    {
        return $this->blockedAuctioneers()->pluck('auctioneers.id');
    }

    public function registerForAuction($auction)
    {
        if(!$this->registeredAuctions()->pluck('auctions.id')->contains($auction->id)) {
            return $this->pendingAuctions()->attach($auction);
        }
        return $this->approvedAuctions();
    }

}
