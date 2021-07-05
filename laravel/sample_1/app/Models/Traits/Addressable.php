<?php

namespace App\Models\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Addressable
{

    /**
     * Determine if the user has verified their address.
     *
     * @return bool
     */
    public function hasVerifiedAddress()
    {
        return ! is_null($this->address_verified_at);
    }

    /**
     * Mark the given user's address as verified.
     *
     * @return bool
     */
    public function markAddressAsVerified()
    {
        return $this->forceFill([
            'address_verified_at' => $this->freshTimestamp(),
        ])->save();
    }


    /**
     * Register a deleted model event with the dispatcher.
     *
     * @param \Closure|string $callback
     *
     * @return void
     */
    abstract public static function deleted($callback);

    /**
     * Define a polymorphic one-to-many relationship.
     *
     * @param string $related
     * @param string $name
     * @param string $type
     * @param string $id
     * @param string $localKey
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    abstract public function morphMany($related, $name, $type = null, $id = null, $localKey = null);

    /**
     * Boot the addressable trait for the model.
     *
     * @return void
     */
    public static function bootAddressable()
    {
        static::deleted(function (self $model) {
            $model->addresses()->delete();
        });
    }

    /**
     * Get all attached addresses to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function addresses(): MorphMany
    {
        return $this->morphMany(\App\Models\Address::class, 'addressable');
    }

    /**
     * Set selected address as user primary address
     *
     * @var \App\Models\Address
     * @return \App\Models\Address
     */
    public function setAddressAsPrimary($address) {
        $addresses = $this->addresses()->isPrimary();
        $addresses->update(['is_primary' => false]);

        if($a = \App\Models\Address::find($address->id)) {
            $a->is_primary = true;
            $a->save();
        }
    }

    /**
     * Set selected address as user shipping address
     *
     * @var \App\Models\Address
     * @return \App\Models\Address
     */
    public function setAddressAsShipping($address) {
        $addresses = $this->addresses()->isShipping();
        $addresses->update(['is_shipping' => false]);

        if($a = \App\Models\Address::find($address->id)) {
            $a->is_shipping = true;
            $a->save();
        }
    }

    /**
     * Set selected address as user billing address
     *
     * @var \App\Models\Address
     * @return \App\Models\Address
     */
    public function setAddressAsBilling($address) {
        $addresses = $this->addresses()->isBilling();
        $addresses->update(['is_billing' => false]);

        if($a = \App\Models\Address::find($address->id)) {
            $a->is_billing = true;
            $a->save();
        }
    }

    /**
     * Setup default address.
     *
     * @var \App\Models\Address
     * @return \App\Models\Address
     */
    public function setDefaultAddress($address)
    {
        $address = $this->addresses()->save($address);
        $this->setAddressAsPrimary($address);
        $this->setAddressAsShipping($address);
        $this->setAddressAsBilling($address);

        return $address;
    }

    /**
     * Get the billing address object for the user.
     *
     * @return \App\Models\Address
     */
    public function getBillingAddress()
    {
        return $this->addresses()->isBilling()->first();
    }

    /**
     * Get the shipping address object for the user.
     *
     * @return \App\Models\Address
     */
    public function getShippingAddress()
    {
        return $this->addresses()->isShipping()->first();
    }

    /**
     * Get the primary address object for the user.
     *
     * @return \App\Models\Address
     */
    public function getPrimaryAddress()
    {
        return $this->addresses()->isPrimary()->first();
    }

    /**
     * Get the billing address label for the user.
     *
     * @return string
     */
    public function getBillingAddressAttribute()
    {
        return optional($this->getBillingAddress())->formatted_address;
    }

    /**
     * Get the shipping address label for the user.
     *
     * @return string
     */
    public function getShippingAddressAttribute()
    {
        return optional($this->getShippingAddress())->formatted_address;
    }

    /**
     * Get the primary address label for the user.
     *
     * @return string
     */
    public function getPrimaryAddressAttribute()
    {
        return optional($this->getPrimaryAddress())->formatted_address;
    }
}
