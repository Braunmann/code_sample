<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'auctioneer_id'    => 'required|exists:App\Models\Auctioneer,id',
            'email'            => 'required|email', //'required|email:rfc,dns'
            'given_name'       => 'required|max:32',
            'family_name'      => 'required|max:32',
            'mobile'           => 'required|max:16',
            'country_code'     => 'required|size:2|exists:countries,code',
            'password'         => 'required|string|min:8|confirmed',
            'type'  => [
                'required',
                Rule::in(['auctioneer', 'admin', 'bidder']),
            ]
        ];
    }
}
