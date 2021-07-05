<?php

namespace App\Policies;

use App\Policies\Traits\AdminUserPolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use App\Models\Photo;

class PhotoPolicy
{
    use HandlesAuthorization, AdminUserPolicy;

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \  $user
     * @param  \App\Models\Photo $photo
     * @return mixed
     */
    public function delete(User $user, Photo $photo)
    {
        return optional($user)->id === $photo->photoable()->user_id;
    }
}
