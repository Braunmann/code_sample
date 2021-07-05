<?php

namespace App\Http\Controllers;


//use Illuminate\Http\Request;
use App\Models\Country as Model;
use App\Http\Resources\Country as Resource;
use App\Http\Resources\CountryCollection as ResourceCollection;
use Illuminate\Http\Request;

class StripePaymentController extends Controller
{
    public function storeCard() {
        $models = Model::alphabetically()->get();
        return new ResourceCollection($models);
    }

    public function getSetupIntent(Request $request) {
        if(!$request->user()->hasStripeId()) {
            $request->user()->createAsStripeCustomer();
        }
        return $request->user()->createSetupIntent();
    }

    public function setDefaultPaymentMethod(Request $request) {
        $paymentMethod = $request->input('payment_method');

        if(strpos($paymentMethod, 'pm_') === 0 and $request->user()->hasStripeId()) {
            $request->user()->updateDefaultPaymentMethod($paymentMethod);
        }
        return [];
    }
}
