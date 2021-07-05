<?php

namespace App\Services\LotBulkUploader;

use App\Services\LotBulkUploader\Filters\{
    BooleanFilter,
    FilterInterface,
    FloatFilter,
    IntegerFilter,
    PriceFilter,
    StringFilter,
    TextFilter,
    VintageFilter,
    YearFilter
};

class FilterFactory {
    protected $_availableFilters = [
        'boolean' => BooleanFilter::class,
        'float' => FloatFilter::class,
        'integer' => IntegerFilter::class,
        'price' => PriceFilter::class,
        'string' => StringFilter::class,
        'text' => TextFilter::class,
        'year' => YearFilter::class,
        'vintage' => VintageFilter::class,
    ];

    /**
     * FilterFactory.
     * @param string $filter
     * @return FilterInterface
     * @throws \Exception
     */
    public function create(string $filter) {
        $filter = trim(strtolower($filter));
        if(!isset($this->_availableFilters[$filter])) {
            throw new \Exception('Filter type: ' . $filter . ' is not allowed');
        }
        return new $this->_availableFilters[$filter];
    }
}
