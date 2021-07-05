<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuctionCreateRequest extends FormRequest
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
            'name' => 'required|min:3',
            'auction_type_id' => 'required|exists:App\Models\AuctionType,id',
            'auctioneer_id' => 'required|exists:App\Models\Auctioneer,id',
            'start_datetime' => 'required|min:5',
            'description' => 'required|min:5',
            'currency' => 'required|exists:currencies,code',
        ];
    }
}
