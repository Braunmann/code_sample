<?php

namespace App\Models\Interfaces;

interface FilterableInterface {
    /**
     * Return columns allowed to filter
     *
     * @return array;
     */
    public function getFilterables();
}
