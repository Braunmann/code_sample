<?php

namespace App\Notifications;

use App\Messages\SendGridMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

class VerifyEmail extends \Illuminate\Auth\Notifications\VerifyEmail
{
    /**
     * The callback that should be used to build the mail message.
     *
     * @var \Closure|null
     */
    public static $toMailCallback;

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['sendgrid'];
    }

    /**
     * Get the verification URL and base64 encode it, attach to frontend App URL .
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        $url = parent::verificationUrl($notifiable);
        return config('services.phoenix.url') . config('services.phoenix.auth.verify_path') . '?' . http_build_query(['verify_email_link' => base64_encode($url)]);
    }

    /**
     * Get the SendGrid representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SendGridMessage
     */
    public function toSendGrid($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $verificationUrl);
        }

        return (new SendGridMessage(config('services.sendgrid.templates.verify_email')))
            ->to($notifiable->email, $notifiable->given_name . ' ' . $notifiable->family_name)
            ->from(getenv('MAIL_FROM_ADDRESS'), getenv('MAIL_FROM_NAME'))
            ->data([
                'user' => $notifiable,
                'verify_link'  => $verificationUrl,
                'pin_code'  => $notifiable->email_pin,
                'direct_url' => parent::verificationUrl($notifiable)
            ]);
    }
}
