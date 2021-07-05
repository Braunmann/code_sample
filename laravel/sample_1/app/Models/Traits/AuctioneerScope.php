<?php

namespace App\Models\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

trait AuctioneerScope
{
    /**
     * Scope a query to only include popular users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param integer $auctioneerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBelongsToAuctioneer($query, $auctioneerId)
    {
        return $query->where('auctioneer_id', '=', $auctioneerId);
    }
}
