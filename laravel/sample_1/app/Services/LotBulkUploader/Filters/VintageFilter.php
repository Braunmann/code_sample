<?php

namespace App\Services\LotBulkUploader\Filters;

class VintageFilter extends YearFilter {
    protected $_validationRules = 'date_format:Y';

    public function processValue($value)
    {
        /// NV can be allowed value
        $value = parent::processValue($value);

        if($value <= date('Y')) {
            $this->_isLastProcessedValid = true;
        } elseif(trim(strtolower($value)) == 'nv' or trim(strtolower($value)) == 'n/v') {
            $this->_isLastProcessedValid = true;
            return 'NV';
        }

        return $value;
    }
}
