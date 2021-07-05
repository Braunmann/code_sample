<?php

namespace App\Http\Controllers;

use App\Http\Resources\Photo as Resource;
use App\Http\Resources\PhotoCollection as ResourceCollection;
use App\Services\PhotoService;
use Illuminate\Http\Request;

class PhotoController extends AbstractCrudController
{

    protected $resource = Resource::class;
    protected $resourceCollection = ResourceCollection::class;

    public function __construct(PhotoService $modelService)
    {
        $this->modelService = $modelService;
    }
}
