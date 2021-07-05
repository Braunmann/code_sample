<?php

namespace App\Services\LotBulkUploader\Filters;


abstract class AbstractFilter implements FilterInterface {
    protected $_isLastProcessedValid = false;

    public function isLastProcessedValid() {
        return $this->_isLastProcessedValid;
    }

    public function getValidationRules() {
        return $this->_validationRules;
    }
}
