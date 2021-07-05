<?php

namespace App\Models\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

trait BelongsToAuction
{
    /**
     * Get all attached auction to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function auction()
    {
        return $this->belongsTo(\App\Models\Auction::class);
    }
}
