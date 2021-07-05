<?php

namespace App\Models;

use App\Models\Interfaces\FilterableInterface;
use App\Models\Interfaces\PhotoableInterface;
use App\Models\Interfaces\SearchableInterface;
use App\Models\Interfaces\SortableInterface;
use App\Models\Interfaces\AuctioneerScopeInterface;
use App\Models\Traits\Addressable;
use App\Models\Traits\AuctioneerScope;
use App\Models\Traits\Photoable;
use App\Models\Traits\Searchable;
use App\Models\Traits\Sortable;
use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Auctioneer extends Model implements FilterableInterface, PhotoableInterface, SortableInterface, SearchableInterface, AuctioneerScopeInterface
{
    use HasFactory, Photoable, Sortable, Filterable, Searchable, Addressable;
    use HasSlug, Sortable;

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('company_name')
            ->saveSlugsTo('slug');
    }
    /**
     * Return columns allowed to full text search
     *
     * @var array
     */
    public $searchables = [
        'company_name',
        'company_vat',
    ];

    /**
     * Allowed columns to filter by.
     *
     * @var array
     */
    public $filterables = [
        'company_name',
        'company_vat',
    ];

    /**
     * Allowed columns to sort by.
     *
     * @var array
     */
    public $sortables = [
        'company_name',
        'company_vat',
        'user_charge_type'
    ];

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'company_name',
        'company_vat',
        'user_charge_type',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_blocked'
    ];

    /**
     * Get all attached users to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function users()
    {
        return $this->hasMany(\App\Models\User::class);
    }

    /**
     * Get all attached auctions to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function auctions()
    {
        return $this->hasMany(\App\Models\Auction::class);
    }

    /**
     * Get the blocked flag for the auctioneer.
     *
     * @return bool
     */
    public function getIsBlockedAttribute()
    {
        return isset($this->attributes['blocked_at']);
    }

    /**
     * The users that auctioneer blocked
     */
    public function blockedUsers()
    {
        return $this->belongsToMany(User::class, 'auctioneer_blocked_users');//->using(AuctioneerBlockedUser::class);
    }

    public function scopeBelongsToAuctioneer($query, $auctioneerId)
    {
        return $query->where('id', '=', $auctioneerId);
    }

}
