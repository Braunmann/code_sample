<?php

namespace App\Services\LotBulkUploader\Filters;

class YearFilter extends AbstractFilter {
    protected $_validationRules = 'date_format:Y';

    public function processValue($value)
    {
        $this->_isLastProcessedValid = false;

        if(strlen($value) == 4 and ( int ) $value == $value) {
            $this->_isLastProcessedValid = true;
            return ( int ) $value;
        }

        return $value;
    }
}
