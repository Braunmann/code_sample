<?php

namespace App\Models\Traits;

trait Searchable {
    /**
     * Return columns allowed to full text search
     *
     * @return array;
     */
    public function getSearchables() {
        return data_get($this, 'searchables', []);
    }
}
