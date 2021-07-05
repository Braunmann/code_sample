<?php

namespace App\Services\LotBulkUploader\Filters;

class TextFilter extends AbstractFilter {
    protected $_validationRules = null;

    public function processValue($value)
    {
        $this->_isLastProcessedValid = true;
        return trim($value);
    }
}
