<?php

namespace App\Models\Traits;

trait Filterable {
    /**
     * Return columns allowed to filter
     *
     * @return array;
     */
    public function getFilterables() {
        return data_get($this, 'filterables', []);
    }
}
