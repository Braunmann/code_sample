<?php

namespace App\Services\LotBulkUploader\Filters;

class IntegerFilter extends AbstractFilter {
    protected $_validationRules = 'integer';

    public function processValue($value)
    {
        $this->_isLastProcessedValid = false;

        if(( int ) $value == $value) {
            $this->_isLastProcessedValid = true;
            return ( int ) $value;
        }

        return $value;
    }
}
