<?php

namespace App\Policies;

use App\Policies\Traits\AdminUserPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use App\Models\Photo;

class AddressPolicy
{
    use HandlesAuthorization, AdminUserPolicy;


    /**
     * Determine whether the user can delete the model.
     *
     * @param  \  $user
     * @param  \App\Models\Address  $address
     * @return mixed
     */
    public function delete(User $user, Photo $address)
    {
        return optional($user)->id === $address->addressable()->user_id;
    }
}
