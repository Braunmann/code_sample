<?php

/**
 * See: https://github.com/cuonggt/laravel-sendgrid-notification-channel
 */

namespace App\Messages;

use SendGrid\Mail\To;
use SendGrid\Mail\From;

class SendGridMessage
{
    /**
     * The "from" for the message.
     *
     * @var \SendGrid\Mail\From
     */
    public $from;

    /**
     * The "tos" for the message.
     *
     * @var array
     */
    public $tos = [];

    /**
     * The SendGrid Template ID for the message.
     *
     * @var string
     */
    public $templateId;

    /**
     * The SendGrid Data for the message.
     *
     * @var object
     */
    public $data;

    /**
     * Create a new SendGrid channel instance.
     *
     * @param  string  $templateId
     * @return void
     */
    public function __construct($templateId)
    {
        $this->templateId = $templateId;
    }

    /**
     * Set the "data".
     *
     * @param  object  $data
     * @return $this
     */
    public function data($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Set the "from".
     *
     * @param  string  $email
     * @param  string  $name
     * @return $this
     */
    public function from($email, $name)
    {
        $this->from = new From($email, $name);

        return $this;
    }

    /**
     * Set the "tos".
     *
     * @param  string  $email
     * @param  string  $name
     * @param  array  $data
     * @return $this
     */
    public function to($email, $name, $data = [])
    {
        $this->tos = array_merge($this->tos, [new To($email, $name, $data)]);

        return $this;
    }
}
