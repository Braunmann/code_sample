<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

abstract class AbstractCrudController extends Controller {
    protected $modelService, $resource, $resourceCollection;

    public function index(Request $request) {
        return new $this->resourceCollection($this->modelService->all($request));
    }

    public function show($pk) {
        return new $this->resource($this->modelService->firstOrFail($pk));
    }

    public function delete(Request $request, $id) {
        $this->modelService->delete($request, $id); // returns true
        return response(null, 204);
    }
}
