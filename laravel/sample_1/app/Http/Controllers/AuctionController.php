<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuctionCreateRequest as CreateRequest;
use App\Http\Requests\AuctionUpdateRequest as UpdateRequest;
use App\Http\Requests\AuctionPublishRequest as PublishRequest;
use App\Http\Requests\SetApproveUserRequest;

use App\Models\Auction as Model;
use App\Http\Resources\Auction as Resource;
use App\Http\Resources\AuctionCollection as ResourceCollection;
use App\Http\Resources\UserCollection;
use App\Services\AuctionService;
use App\Services\LotsBulkUploaderService;
use App\Services\AuctionResultsGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class AuctionController extends AbstractCrudController
{

    protected $resource = Resource::class;
    protected $resourceCollection = ResourceCollection::class;

    public function __construct(AuctionService $modelService) {
        $this->modelService = $modelService;
    }

    /**
     * Create auction
     *
     * @param  CreateRequest  $request
     * @return Resource
     */
    public function create(CreateRequest $request) {
        return new $this->resource($this->modelService->create($request));
    }

    /**
     * Update auction
     *
     * @param UpdateRequest $request
     * @param Model $auction
     * @return Resource
     */
    public function update(UpdateRequest $request, Model $auction) {
        return new $this->resource($this->modelService->update($request, $auction));
    }


    /**
     * Upload file and process lots for auction
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotsBulkUploader(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        $lotBulkUploaderService->uploadSourceFile($request->file('file'));
        return $lotBulkUploaderService->getStats();
    }

    /**
     * Get data quality stats of the uploaded file
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotsBulkUploaderDataQuality(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->getStats() ];
    }


    /**
     * Get error report file
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function downloadLotsBulkUploaderReport(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);

        $safeName = Str::Slug($auction->name) . '-bulk-upload-error-report.xls';

        $headers = array(
            "Content-type"        => "application/vnd.ms-excel",
            "Content-Disposition" => "attachment; filename=" . $safeName ,
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        $spreadsheet = $lotBulkUploaderService->getSpreadsheetErrorReport();

        $callback = function() use($spreadsheet) {
            $writer = IOFactory::createWriter($spreadsheet, 'Xls');
            $writer->save('php://output');
        };

        return response()->stream($callback, 200, $headers);
    }


    /**
     * Provide possibility to adjust settings for the column mapping
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotsBulkUploaderReplaceColumn(Request $request, Model $auction) {
        $sourceField = $request->input('sourceField');
        $destinationField = $request->input('destinationField');
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        $lotBulkUploaderService->mapColumn($sourceField, $destinationField);
        return ['data' => $lotBulkUploaderService->getStats() ];
    }

    /**
     * Return final results of parsing lots import file
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotsBulkUploaderResults(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->getResults() ];
    }


    /**
     * Import lots for current procesing file
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotsBulkUploaderImportLots(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->importLots() ];
    }


    /**
     * Return matching rules for lot images uploader
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function imagesBulkUploaderMatchingRules(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->imagesToLotsMatchingRules() ];
    }

    /**
     * Return upload image from bulk uploader
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function imagesBulkUploaderUpload(Request $request, Model $auction) {
        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->imageToLotUpload($request->file('file'), $request->input('checksum', null)) ];
    }

    /**
     * Get fields configuration for Lot add / edit
     *
     * @param Request $request
     * @param Model $auction
     * @return array
     */
    public function lotAuctionColumnSettings(Request $request, Model $auction) {

        $lotBulkUploaderService = new LotsBulkUploaderService($auction);
        return ['data' => $lotBulkUploaderService->columnsSettings() ];
    }

    /**
     * Publish auction
     *
     * @param PublishRequest $request
     * @param  Model $auction
     * @return Resource
     */
    public function publish(PublishRequest $request, Model $auction) {
        return new $this->resource($this->modelService->publish($request, $auction));
    }

    /**
     * Get users list registered for auction - pending, and accepted
     *
     * @param  Model $auction
     * @return Resource
     */
    public function auctionRegisteredUsers(Model $auction) {
        return new UserCollection($this->modelService->registeredUsers($auction));
    }

    /**
     * Get auction Results Summary
     *
     * @param  Model $auction
     * @return Resource
     */
    public function auctionResultsSummary(Model $auction) {
        return ['data' => $this->modelService->auctionResultsSummary($auction) ];
    }

    /**
     * Set approval for user
     *
     * @param SetApproveUserRequest $request
     * @param Model $auction
     * @return Resource
     */
    public function approveUser(SetApproveUserRequest $request, Model $auction)
    {
        return ['data' => $this->modelService->approveUser($request, $auction) ];
    }

    /**
     * Download auction results
     *
     * @param Model $auction
     * @return Resource
     */
    public function downloadResults(Model $auction)
    {
        $auctionResultsGeneratorService = new AuctionResultsGeneratorService($auction);

        $safeName = Str::Slug($auction->name) . '-result-report.xls';

        $headers = array(
            "Content-type"        => "application/vnd.ms-excel",
            "Content-Disposition" => "attachment; filename=" . $safeName ,
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        $spreadsheet = $auctionResultsGeneratorService->getSpreadsheetReport();

        $callback = function() use($spreadsheet) {
            $writer = IOFactory::createWriter($spreadsheet, 'Xls');
            $writer->save('php://output');
        };

        return response()->stream($callback, 200, $headers);
    }


}
