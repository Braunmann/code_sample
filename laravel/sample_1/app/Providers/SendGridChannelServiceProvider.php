<?php

/**
 * See: https://github.com/cuonggt/laravel-sendgrid-notification-channel
 */

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Notification;
use App\Channels\SendGridMailChannel;

class SendGridChannelServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        Notification::extend('sendgrid', function ($app) {
            return new SendGridMailChannel(
                new \SendGrid(
                    config('services.sendgrid.api_key')
                )
            );
        });
    }
}
