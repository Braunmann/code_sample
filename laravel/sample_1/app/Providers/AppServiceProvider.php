<?php

namespace App\Providers;

use App\Models\Auction;
use App\Observers\BelongsToAuctioneerObserver;
use App\Observers\BelongsToUserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Auction::observe(BelongsToAuctioneerObserver::class);
        Auction::observe(BelongsToUserObserver::class);
    }
}
