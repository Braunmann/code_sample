<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Builder;
use \Illuminate\Database\Eloquent\Relations\MorphTo;

class Address extends Model
{
    use HasFactory;

    /**
     * {@inheritdoc}
     */
    protected $casts = [
        'addressable_id' => 'integer',
        'addressable_type' => 'string',
        'country_code' => 'string',
        'postal_code' => 'string',
        'city' => 'string',
        'province' => 'string',
        'address_line_1' => 'string',
        'address_line_2' => 'string',
        'address_line_3' => 'string',
        'address_line_4' => 'string',
        'is_primary' => 'boolean',
        'is_billing' => 'boolean',
        'is_shipping' => 'boolean',
        'formatted_address' => 'string',
        'data' => 'json',
    ];

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'country_code',
        'postal_code',
        'city',
        'province',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'address_line_4',
        'is_primary',
        'is_billing',
        'is_shipping',
        'formatted_address',
        'data',
    ];

    /**
     * Get the owner model of the address.
     *
     * @return MorphTo
     */
    public function addressable(): MorphTo
    {
        return $this->morphTo('addressable', 'addressable_type', 'addressable_id', 'id');
    }

    /**
     * Scope primary addresses.
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function scopeIsPrimary(Builder $builder): Builder
    {
        return $builder->where('is_primary', true);
    }

    /**
     * Scope billing addresses.
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function scopeIsBilling(Builder $builder): Builder
    {
        return $builder->where('is_billing', true);
    }

    /**
     * Scope shipping addresses.
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function scopeIsShipping(Builder $builder): Builder
    {
        return $builder->where('is_shipping', true);
    }
}
