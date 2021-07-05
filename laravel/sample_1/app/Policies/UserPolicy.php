<?php

namespace App\Policies;

use App\Policies\Traits\AdminUserPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;

class UserPolicy
{
    use HandlesAuthorization, AdminUserPolicy;

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\User $model
     * @return mixed
     */
    public function delete(User $user, User $model)
    {
        return optional($user)->auctioneer_id === $model->auctioneer_id;
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\User $model
     * @return mixed
     */
    public function create(User $user, User $model)
    {
        return optional($user)->auctioneer_id === $model->auctioneer_id;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\User $model
     * @return mixed
     */
    public function update(User $user, User $model)
    {
        return optional($user)->auctioneer_id === $model->auctioneer_id;
    }
}
