<?php

namespace App\Models\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Photoable
{

    /**
     * Get all attached photos to the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function photos(): MorphMany
    {
        return $this->morphMany(\App\Models\Photo::class, 'photoable');
    }

}
