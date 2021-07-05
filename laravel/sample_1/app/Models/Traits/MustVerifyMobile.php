<?php

namespace App\Models\Traits;

use App\Notifications\VerifyMobile;

trait MustVerifyMobile
{
    /**
     * Determine if the user has verified their mobile phone number.
     *
     * @return bool
     */
    public function hasVerifiedMobile()
    {
        return ! is_null($this->mobile_verified_at);
    }

    /**
     * Mark the given user's phone number as verified.
     *
     * @return bool
     */
    public function markMobileAsVerified()
    {
        return $this->forceFill([
            'mobile_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Send the sms verification notification.
     *
     * @return void
     */
    public function sendMobileVerificationNotification()
    {
        $this->notify(new VerifyMobile);
    }

    /**
     * Get the mobile number that should be used for verification.
     *
     * @return string
     */
    public function getMobileForVerification()
    {
        return $this->mobile;
    }

    /**
     * Generates New PIN for verification mobile phone
     *
     * @return bool
     */
    public function generateNewMobileVerificationPin()
    {
        return $this->forceFill([
            'mobile_pin' => rand(100000, 999999),
        ])->save();
    }


    /**
     * Update mobile number and reset verification
     *
     * @param String $mobile
     * @return bool
     */
    public function changeMobile($mobile)
    {
        $this->generateNewMobileVerificationPin();

        return $this->forceFill([
            'mobile' => $mobile,
            'mobile_verified_at' => null,
        ])->save();
    }

}
