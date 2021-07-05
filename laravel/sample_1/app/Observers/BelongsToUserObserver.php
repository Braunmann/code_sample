<?php

namespace App\Observers;

use App\Models\Auction;
use App\Models\Interfaces\BelongsToUserInterface;
use Illuminate\Support\Facades\Auth;

class BelongsToUserObserver
{
    /**
     * Handle the userable object "creating" event.
     * Add the
     *
     *
     * @param  \App\Models\Interfaces\BelongsToUserInterface  $userable
     * @return void
     */
    public function creating(BelongsToUserInterface $userable)
    {
        if(Auth::check()) {
            $user = Auth::user();
            $userable->user()->associate($user);
        }
    }

}
