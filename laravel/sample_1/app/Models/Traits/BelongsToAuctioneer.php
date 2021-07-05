<?php

namespace App\Models\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

trait BelongsToAuctioneer
{
    /**
     * Get all attached auctioneer to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function auctioneer()
    {
        return $this->belongsTo(\App\Models\Auctioneer::class);
    }
}
