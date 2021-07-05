<?php

namespace App\Services\LotBulkUploader\Filters;

class FloatFilter extends AbstractFilter {
    protected $_validationRules = 'numeric';

    public function processValue($value)
    {
        $this->_isLastProcessedValid = false;

        if(( float ) $value == $value) {
            $this->_isLastProcessedValid = true;
            return ( float ) $value;
        }

        return $value;
    }
}
