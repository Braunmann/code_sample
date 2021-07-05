<?php
namespace App\Services;
use App\Models\Auctioneer as Model;
use App\Models\User;
use Illuminate\Http\Request;

class AuctioneerService extends AbstractCrudService
{
    protected $_modelFields = ['company_name', 'company_vat', 'user_charge_type', 'is_active', 'blocked'];
    protected $_model = Model::class;

    public function setUserBan(Request $request, Model $model) {
        $user = User::findOrFail($request->user_id);

        if(!$model->blockedUsers()->pluck('users.id')->contains($user->id)) {
            $model->blockedUsers()->attach($user);
        }
        return $model;
    }

    public function removeUserBan(Request $request, Model $model) {
        $user = User::findOrFail($request->user_id);

        if($model->blockedUsers()->pluck('users.id')->contains($user->id)) {
            $model->blockedUsers()->detach($user);
        }
        return $model;
    }
}
