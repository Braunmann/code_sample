<?php

namespace App\Providers;

use App\Models\{Auction, User, Lot};
use App\Observers\CrudToRedisPublishObserver;
use Illuminate\Support\ServiceProvider;

class PhoenixServiceProvider extends ServiceProvider
{

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Auction::observe(CrudToRedisPublishObserver::class);
        Lot::observe(CrudToRedisPublishObserver::class);
        User::observe(CrudToRedisPublishObserver::class);
    }
}
