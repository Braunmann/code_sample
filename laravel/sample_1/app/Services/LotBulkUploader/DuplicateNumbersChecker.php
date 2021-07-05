<?php

namespace App\Services\LotBulkUploader;

use App\Models\Auction;

class DuplicateNumbersChecker {
    protected $_lotNumbersAreExists = [];
    protected $_duplicatedLines = [];

    public function __construct(Auction $auction) {
        $this->_auction = $auction;
        $this->_initLotNumbersAreExists();
    }

    /**
     * Init array to with amount of lot numbers
     */
    protected function _initLotNumbersAreExists() {
        foreach ($this->_auction->lots as $lot) {
            $this->placeLotNumber($lot->lot_no_normalized);
        }
    }

    protected function _normalizeLotNumber($lotNr) {
        return trim(strtolower($lotNr));
    }

    public function placeLotNumber($lotNr, $line = 0) {
        $lotNr = $this->_normalizeLotNumber($lotNr);
        if(isset($this->_lotNumbersAreExists[$lotNr])) {
            $this->_lotNumbersAreExists[$lotNr]++;
            $this->_duplicatedLines[] = $line;
        } else {
            $this->_lotNumbersAreExists[$lotNr] = 1;
        }
    }

    public function getDuplicatedLotNumbers() {
        $duplicatedNumbers = [];
        foreach($this->_lotNumbersAreExists as $k => $v) {
            if($v > 1) {
                $duplicatedNumbers[] = $k;
            }
        }
        return $duplicatedNumbers;
    }

    public function getDuplicatedLines() {
        return $this->_duplicatedLines;
    }
}
