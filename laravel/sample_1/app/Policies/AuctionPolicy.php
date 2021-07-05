<?php

namespace App\Policies;

use App\Policies\Traits\AdminUserPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use App\Models\Auction;
use Illuminate\Auth\Access\Response;

class AuctionPolicy
{
    use HandlesAuthorization, AdminUserPolicy;

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auction $auction
     * @return mixed
     */
    public function delete(User $user, Auction $auction)
    {
        if(!optional($user)->isAdmin() and $auction->published_at) {
            return Response::deny('It is not possible delete already published auction');
        }

        return (optional($user)->isAdmin() or optional($user)->auctioneer_id === $auction->auctioneer_id)
            ? Response::allow()
            : Response::deny('You do not own this auction.');
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auction $auction
     * @return mixed
     */
    public function create(User $user, Auction $auction)
    {
        return (optional($user)->isAdmin() or optional($user)->auctioneer_id === $auction->auctioneer_id)
            ? Response::allow()
            : Response::deny('You can not create auction for selected auctioneer');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auction $auction
     * @return mixed
     */
    public function update(User $user, Auction $auction)
    {
        if(!optional($user)->isAdmin() and $auction->published_at) {
            return Response::deny('It is not possible update already published auction');
        }

        return (optional($user)->isAdmin() or optional($user)->auctioneer_id === $auction->auctioneer_id)
            ? Response::allow()
            : Response::deny('You do not own this auction.');
    }
}
