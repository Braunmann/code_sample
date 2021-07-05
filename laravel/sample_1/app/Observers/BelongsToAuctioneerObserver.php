<?php

namespace App\Observers;

use App\Models\Auction;
use App\Models\Interfaces\BelongsToAuctioneerInterface;
use Illuminate\Support\Facades\Auth;

class BelongsToAuctioneerObserver
{
    /**
     * Handle the auctioneerable object "creating" event.
     * Add the
     *
     *
     * @param  \App\Models\Interfaces\BelongsToAuctioneerInterface  $auctioneerable
     * @return void
     */
    public function creating(BelongsToAuctioneerInterface $auctioneerable)
    {
        if(Auth::check()) {
            $user = Auth::user();
            if(!$user->isAdmin()) {
                $auctioneerable->auctioneer()->associate($user->auctioneer);
            }
        }
    }

}
