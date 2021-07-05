<?php

namespace App\Providers;

use App\Models\Auction;
use App\Models\Auctioneer;
use App\Models\User;
use App\Policies\AuctioneerPolicy;
use App\Policies\AuctionPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Auction::class => AuctionPolicy::class,
        Auctioneer::class => AuctioneerPolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::define('update-post', [PostPolicy::class, 'update']);
    }
}
