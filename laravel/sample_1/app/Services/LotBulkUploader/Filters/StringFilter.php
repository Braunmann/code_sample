<?php

namespace App\Services\LotBulkUploader\Filters;

class StringFilter extends AbstractFilter {
    protected $_validationRules = null;

    public function processValue($value)
    {
        $this->_isLastProcessedValid = true;
        return trim($value);
    }
}
