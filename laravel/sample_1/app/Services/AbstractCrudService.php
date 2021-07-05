<?php

namespace App\Services;

use App\Models\Interfaces\AuctioneerScopeInterface;
use App\Queries\BasicListingQuery;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

abstract class AbstractCrudService {
    protected $_model;
    protected $_modelFields = [];

    public function all(Request $request) {
        $query = new BasicListingQuery(new $this->_model, $request);

        $user = $request ? optional($request->user()) : null;

        if(new $this->_model instanceof AuctioneerScopeInterface and $user and $user->type != 'admin') {
            $query->belongsToAuctioneer($user->auctioneer_id);
        }

        return $query->jsonPaginate();
    }

    public function firstOrFail($id) {
        return $this->_model::with('photos')->findOrFail($id);
    }

    public function create(Request $request) {
        $model = New $this->_model;
        $model->fill($request->all());
        if (!$request->user() or $request->user()->cannot('create', $model)) {
            throw ValidationException::withMessages([
                'user_cannot_update' => 'You are not allowed to create.'
            ]);
        }
        $model->save();
        return $model;
    }

    public function update(Request $request, Model $model) {
        $model->fill($request->all());
        if (!$request->user() or $request->user()->cannot('update', $model)) {
            throw ValidationException::withMessages([
                'user_cannot_update' => 'You are not allowed to update.'
            ]);
        }
        $model->save();
        return $model;
    }

    public function delete(Request $request, $id) {
        $model = $this->_model::findOrFail($id);
        if (!$request->user() or $request->user()->cannot('delete', $model)) {
            throw ValidationException::withMessages([
                'user_cannot_update' => 'You are not allowed to delete.'
            ]);
        }
        $model->delete();
        return true;
    }
}
