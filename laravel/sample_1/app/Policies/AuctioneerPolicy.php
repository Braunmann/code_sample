<?php

namespace App\Policies;

use App\Policies\Traits\AdminUserPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use App\Models\Auctioneer;

class AuctioneerPolicy
{
    use HandlesAuthorization, AdminUserPolicy;

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auctioneer $auctioneer
     * @return mixed
     */
    public function delete(User $user, Auctioneer $auctioneer)
    {
        return false;
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auctioneer $auctioneer
     * @return mixed
     */
    public function create(User $user, Auctioneer $auctioneer)
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Auctioneer $auctioneer
     * @return mixed
     */
    public function update(User $user, Auctioneer $auctioneer)
    {
        return optional($user)->auctioneer_id === $auctioneer->id;
    }
}
