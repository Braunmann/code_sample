<?php

namespace App\Models\Interfaces;

interface AuctioneerScopeInterface
{
    /**
     * Scope a query to only include popular users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  integer  $auctioneerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBelongsToAuctioneer($query, $auctioneerId);
}
