<?php

namespace App\Services\LotBulkUploader\Filters;

use Illuminate\Contracts\Validation\Rule;

class BooleanFilter extends AbstractFilter {
    protected $_validationRules = 'in:n,y,N,Y,yes,no,0,1,YES,NO,true,false,TRUE,FALSE';

    public function processValue($value)
    {
        $this->_isLastProcessedValid = false;

        $value = strtolower($value);

        if($value === 1 or $value === true or $value == 'y' or $value == 'yes' or $value == '1' or $value == 'true') {
            $this->_isLastProcessedValid = true;
            return true;
        } else if ($value === 0 or $value === false or $value == 'n' or $value == 'no' or $value == '0' or $value == 'false') {
            return false;
        }

        return $value;
    }
}
