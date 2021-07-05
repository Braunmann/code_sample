<?php

namespace App\Models\Interfaces;

interface SearchableInterface {

    /**
     * Return columns allowed to full text search
     *
     * @return array;
     */
    public function getSearchables();
}
