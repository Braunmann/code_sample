<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MobileVerificationController extends VerificationController
{
    /*
    |--------------------------------------------------------------------------
    | Mobile Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling mobile verification for any
    | user that recently registered with the application. SMS messages may also
    | be re-sent if the user didn't receive the original SMS message.
    |
    */

    public function pinValidate(Request $request) {
        // Check length to be sure there is not comparision of empty strings
        if(strlen($request->user()->mobile_pin) < 6 or strlen($request->input('pin_code')) < 6) {
            throw new AuthorizationException;
        }

        // Check PINs are the same
        if ($request->user()->mobile_pin != $request->input('pin_code')) {
            throw new AuthorizationException;
        }

        if ($request->user()->hasVerifiedMobile()) {
            return $request->wantsJson()
                ? new JsonResponse([], 204)
                : redirect($this->redirectPath());
        }

        if ($request->user()->markMobileAsVerified()) {
            event(new Verified($request->user()));
        }

        if ($response = $this->verified($request)) {
            return $response;
        }

        return $request->wantsJson()
            ? new JsonResponse([], 204)
            : redirect($this->redirectPath())->with('verified', true);
    }


    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedMobile()) {
            return $request->wantsJson()
                ? new JsonResponse([], 204)
                : redirect($this->redirectPath());
        }

        $request->user()->sendMobileVerificationNotification();

        return $request->wantsJson()
            ? new JsonResponse([], 202)
            : back()->with('resent', true);
    }
}
