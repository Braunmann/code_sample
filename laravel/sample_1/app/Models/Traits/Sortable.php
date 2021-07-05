<?php

namespace App\Models\Traits;

use \Illuminate\Database\Eloquent\Builder,
    \Illuminate\Http\Request;


trait Sortable {
    /**
     * Return columns allowed to sort by
     *
     * @return array;
     */
    public function getSortables() {
        return data_get($this, 'sortables', []);
    }

    /**
     * Scope a query to sort results.
     *
     * @param Builder $query
     * @param Request $request
     * @return Builder
     */
    public function scopeSort(Builder $query, Request $request)
    {
        $sortables = $this->getSortables();

        // Get the column to sort
        $sort = $request->get('sort');

        // Get the direction of which to sort - if first char is "-" sort DESC
        $direction = $sort[0] == '-' ? 'desc' : 'asc';

        // Ensure column to sort is part of model's sortables
        // property and that the direction is a valid value
        if ($sort
            && in_array($sort, $sortables)
            && $direction
            && in_array($direction, ['asc', 'desc'])) {
            // Return ordered query
            return $query->orderBy($sort, $direction);
        }

        // No sorting, return query
        return $query;
    }
}
