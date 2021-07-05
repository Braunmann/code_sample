<?php

namespace App\Policies\Traits;
use App\Models\User;

trait AdminUserPolicy
{
    public function before(User $user, $ability)
    {
        if ($user->isAdmin()) {

            return true;
        }
    }

}
