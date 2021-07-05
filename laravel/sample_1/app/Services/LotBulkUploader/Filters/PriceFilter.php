<?php

namespace App\Services\LotBulkUploader\Filters;

class PriceFilter extends AbstractFilter {
    protected $_validationRules = 'numeric|min:0';

    public function processValue($value)
    {
        $this->_isLastProcessedValid = false;

        $v = ( float ) $value;

        if(!empty($value) and $v >= 0) {
            $this->_isLastProcessedValid = true;
            return ( float ) $value;
        }

        return $value;
    }
}
