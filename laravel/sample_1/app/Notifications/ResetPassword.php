<?php

namespace App\Notifications;

use App\Messages\SendGridMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class ResetPassword extends \Illuminate\Auth\Notifications\ResetPassword
{
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
     * Get the reset URL and base64 encode it, attach to frontend App URL .
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function getResetUrl($notifiable)
    {
        return config('services.phoenix.url') . config('services.phoenix.auth.reset_path') . '?'
            . http_build_query([
                'email' => $notifiable->getEmailForPasswordReset(),
                'token' => $this->token,
            ]);
    }

    /**
     * Get the SendGrid representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SendGridMessage
     */
    public function toSendGrid($notifiable) {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        return (new SendGridMessage(config('services.sendgrid.templates.forgot_password_email')))
            ->to($notifiable->email, $notifiable->given_name . ' ' . $notifiable->family_name)
            ->from(getenv('MAIL_FROM_ADDRESS'), getenv('MAIL_FROM_NAME'))
            ->data([
                'user' => $notifiable,
                'reset_link'  => $this->getResetUrl($notifiable),
                'expire_in'  => config('auth.passwords.'.config('auth.defaults.passwords').'.expire'),
            ]);
    }

}
