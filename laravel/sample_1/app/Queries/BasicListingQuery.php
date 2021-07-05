<?php

namespace App\Queries;

use App\Models\Interfaces\FilterableInterface;
use App\Models\Interfaces\AuctioneerScopeInterface;
use App\Models\Interfaces\SearchableInterface;
use App\Models\Interfaces\SortableInterface;
use App\Queries\Filters\FuzzyFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BasicListingQuery extends QueryBuilder {
    public function __construct(Model $subject, ?Request $request = null)
    {
        $query = $subject::query();

        parent::__construct($query, $request);

        if($subject instanceof SortableInterface) {
            $this->allowedSorts($subject->getSortables());
        }

        $allowedFilters = [];

        if($subject instanceof FilterableInterface) {
            $allowedFilters = array_merge($allowedFilters, $subject->getFilterables());
        }
        if($subject instanceof SearchableInterface) {
            $fullTextFields = $subject->getSearchables();

            if(count($fullTextFields)) {
                $allowedFilters[] = AllowedFilter::custom('search', new FuzzyFilter(
                    ...$subject->getSearchables()
                ));
            }
        }

        if(count($allowedFilters)) {
            $this->allowedFilters($allowedFilters);
        }

    }
}
