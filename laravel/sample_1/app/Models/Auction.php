<?php

namespace App\Models;

use App\Models\Interfaces\BelongsToAuctioneerInterface;
use App\Models\Interfaces\BelongsToUserInterface;
use App\Models\Interfaces\FilterableInterface;
use App\Models\Interfaces\PhotoableInterface;
use App\Models\Interfaces\SearchableInterface;
use App\Models\Interfaces\SortableInterface;
use App\Models\Interfaces\AuctioneerScopeInterface;
use App\Models\Traits\AuctioneerScope;
use App\Models\Traits\BelongsToAuctioneer;
use App\Models\Traits\BelongsToUser;
use App\Models\Traits\Photoable;
use App\Models\Traits\Searchable;
use App\Models\Traits\Sortable;
use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Auction extends Model implements FilterableInterface, PhotoableInterface, SortableInterface, SearchableInterface, BelongsToAuctioneerInterface, BelongsToUserInterface, AuctioneerScopeInterface
{
    use HasFactory, Photoable, Sortable, Filterable, Searchable, BelongsToAuctioneer, AuctioneerScope;
    use HasSlug, Sortable;

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Return columns allowed to full text search
     *
     * @var array
     */
    public $searchables = [
        'name',
    ];

    /**
     * Allowed columns to filter by.
     *
     * @var array
     */
    public $filterables = [
        'name',
    ];

    /**
     * Allowed columns to sort by.
     *
     * @var array
     */
    public $sortables = [
        'name',
    ];

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'name', 'description', 'start_datetime', 'end_datetime', 'currency_code', 'auctioneer_id', 'created_by_user_id', 'auction_type_id'
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'lots_count',
        'status',
    ];


    public static function boot()
    {
        parent::boot();

        self::deleting(function ($auction) { // before delete() method call this
            // Fires removing the lots to provide photos clean up
            $auction->lots()->each(function ($lot) {
                $lot->delete();
            });
        });
    }

    /**
     * Get the auctioneer for this Auction
     *
     * @return BelongsTo
     */
    public function auctioneer()
    {
        return $this->belongsTo(Auctioneer::class);
    }

    /**
     * Get the user that created this Auction
     *
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * Get the Auction Type for this Auction
     *
     * @return BelongsTo
     */
    public function auctionType()
    {
        return $this->belongsTo(AuctionType::class);
    }

    /**
     * Get Lots for this Auction
     *
     * @return HasMany
     */
    public function lots()
    {
        return $this->hasMany(Lot::class);
    }

    /**
     * Get lots count
     *
     * @return integer
     */
    public function getLotsCountAttribute()
    {
        return $this->lots->count();
    }

    /**
     * Get auction status
     *
     * @return integer
     */
    public function getStatusAttribute()
    {
        if($this->end_datetime) {
            return 'finished';
        } elseif($this->start_datetime && $this->start_datetime <= date("Y-m-d H:i:s")) {
            return 'on_live';
        } elseif($this->published_at) {
            return 'published';
        } else {
            return 'draft';
        }
    }

    /**
     * Flag auction as published
     *
     * @return integer
     */
    public function publish()
    {
        $this->published_at = now();
        return $this->save();
    }

    /**
     * The user that registered to auction
     */
    public function registeredUsers()
    {
        //return $this->belongsToMany(User::class)->using(AuctionRegisteredUser::class);
        return $this->belongsToMany(User::class, 'auction_registered_users');
    }

    /**
     * The user that approved for bidding to auction
     */
    public function approvedForBidUsers()
    {
        return $this->belongsToMany(User::class)->using(AuctionRegisteredUser::class)->wherePivot('is_approved', 1);
    }


    public function approveUserAction($user, $status) {
        $this->registeredUsers()->updateExistingPivot($user, [
            'is_approved' => $status,
        ]);
    }
}
