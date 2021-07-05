<?php

namespace App\Services\LotBulkUploader;

class Column {
    /**
     * Name of the column in source
     * @var string
     */
    protected $_sourceField;

    /**
     * Name of the column for import
     * @var string
     */
    protected $_destinationField;

    /**
     * If data required
     * @var boolean
     */
    protected $_required;

    /**
     * Data type filter
     * @var string
     */
    protected $_type = 'string';

    /**
     * Data filter
     * @var string
     */
    protected $_filter;

    /**
     * Keep information about processed rows
     * @var array
     */
    protected $_rowsData = [];

    public function __construct(string $destinationField, $options = []) {
        $this->_destinationField = $destinationField;

        if(isset($options['required'])) {
            $this->_required = $options['required'];
        }

        if(isset($options['type'])) {
            $this->_type = $options['type'];
        }

        $this->_setupFilter();
    }

    /**
     * @param string $sourceField
     */
    public function setSourceField(string $sourceField)
    {
        $this->_sourceField = $sourceField;
    }

    /**
     * Process data using column setting
     * @param mixed $data
     * @return mixed
     */
    public function processData($data)
    {
        if(empty(trim($data))) {
            $this->_rowsData[] = 0;
            return null;
        }
        $data = $this->_filter->processValue($data);
        $this->_rowsData[] = $this->_filter->isLastProcessedValid() ? 1 : -1;
        return $data;
    }

    /**
     * Setup filter for selected type
     *
     * @throws \Exception
     */
    protected function _setupFilter()
    {
        $this->_filter = (new FilterFactory())->create($this->_type);
    }

    /**
     * Check is all data valid
     * @return boolean
     */
    protected function _isValid()  {
        if($this->_required) {
            return count($this->_rowsData) > 0 and !in_array(-1, $this->_rowsData) and !in_array(0, $this->_rowsData);
        } else {
            return count($this->_rowsData) > 0 and !in_array(-1, $this->_rowsData);
        }
    }

    protected function _countValidRows() {
        return count(array_keys($this->_rowsData, 1));
    }

    protected function _countEmptyRows() {
        return count(array_keys($this->_rowsData, 0));
    }

    protected function _getEmptyRows() {
        return array_keys($this->_rowsData, 0);
    }

    protected function _getInvalidRows() {
        if($this->_required) {
            return array_merge(array_keys($this->_rowsData, -1), array_keys($this->_rowsData, 0));
        } else {
            return array_keys($this->_rowsData, -1);
        }
    }

    protected function _countRows() {
        return count($this->_rowsData);
    }

    protected function _isReadyToUpload() {
        return $this->_isValid();
    }

    public function getStats() {
        return [
            'isRequired' => $this->_required,
            'isValid' => $this->_isValid(),
            'validRowsCount' => $this->_countValidRows(),
            'invalidRows' => $this->_getInvalidRows(),
            'emptyRows' => $this->_getEmptyRows(),
            'emptyRowsCount' => $this->_countEmptyRows(),
            'totalRowsCount' => $this->_countRows(),
            'type' => $this->_type,
            'sourceField' => $this->_sourceField,
            'destinationField' => $this->_destinationField,
            'isReadyToUpload' => $this->_isReadyToUpload(),
        ];
    }

    /**
     * @return string
     */
    public function getSourceField()
    {
        return $this->_sourceField;
    }
}
