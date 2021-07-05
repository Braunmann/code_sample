<?php

namespace App\Models\Interfaces;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

interface SortableInterface {
    /**
     * Scope a query to sort results.
     *
     * @param Builder $query
     * @param Request $request
     * @return Builder
     */
    public function scopeSort(Builder $query, Request $request);

    /**
     * Return columns allowed to sort by
     *
     * @return array;
     */
    public function getSortables();
}
