<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressCreateRequest extends FormRequest
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
            'country_code'      => 'required|size:2|exists:countries,code',
            'postal_code'       => 'required|max:16',
            'city'              => 'required|max:64',
            'province'          => 'nullable|max:64',
            'address_line_1'    => 'required|max:128',
            'address_line_2'    => 'nullable|max:128',
            'address_line_3'    => 'nullable|max:128',
            'address_line_4'    => 'nullable|max:128',
            'is_primary'        => 'sometimes|required|bool',
            'is_shipping'       => 'sometimes|required|bool',
            'is_billing'        => 'sometimes|required|bool',
            'formatted_address' => 'required|max:256',
            'data'              => 'nullable|array',
        ];
    }
}
