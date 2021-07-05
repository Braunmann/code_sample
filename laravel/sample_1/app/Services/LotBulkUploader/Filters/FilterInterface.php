<?php

namespace App\Services\LotBulkUploader\Filters;

interface FilterInterface {
    public function getValidationRules();
    public function processValue($value);
    public function isLastProcessedValid();
}
