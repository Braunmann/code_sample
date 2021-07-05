<?php

namespace App\Observers;
use Illuminate\Support\Str;
use App\Models\Interfaces\BelongsToUserInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class CrudToRedisPublishObserver
{

    /**
     * Crate message and publish to Redis Pub/Sub.
     *
     * @param  string $action
     * @param  Model $model
     * @return void
     */
    protected function _publishMessage($action, $model) {
        $class = Str::snake((new \ReflectionClass($model))->getShortName());

        Redis::publish(config('phoenix.api.redis_master'), json_encode([
            'command' => 'crud',
            'data' => [
                'model' => $class,
                'action' => $action,
                'id' => (int) $model->id,
                'payload' => $model->toArray()
            ]
        ]));
    }

    /**
     * Handle the Model "created" event and publish to Redis Pub/Sub.
     *
     * @param  Model $model
     * @return void
     */
    public function created(Model $model)
    {
        $this->_publishMessage('created', $model);
    }

    /**
     * Handle the Model "updated" event and publish to Redis Pub/Sub.
     *
     * @param  Model $model
     * @return void
     */
    public function updated(Model $model)
    {
        $this->_publishMessage('updated', $model);
    }

    /**
     * Handle the Model "deleted" event and publish to Redis Pub/Sub.
     *
     * @param  Model $model
     * @return void
     */
    public function deleted(Model $model)
    {
        $this->_publishMessage('deleted', $model);
    }

    /**
     * Handle the Model "forceDeleted" event and publish to Redis Pub/Sub.
     *
     * @param  Model $model
     * @return void
     */
    public function forceDeleted(Model $model)
    {
        $this->_publishMessage('deleted', $model);
    }

}
