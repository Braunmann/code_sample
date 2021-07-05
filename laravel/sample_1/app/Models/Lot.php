<?php

namespace App\Models;

use App\Models\Interfaces\AuctioneerScopeInterface;
use App\Models\Interfaces\BelongsToAuctionInterface;
use App\Models\Interfaces\FilterableInterface;
use App\Models\Interfaces\PhotoableInterface;
use App\Models\Interfaces\SearchableInterface;
use App\Models\Interfaces\SortableInterface;
use App\Models\Traits\BelongsToAuction;
use App\Models\Traits\Photoable;
use App\Models\Traits\Searchable;
use App\Models\Traits\Sortable;
use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Lot extends Model implements FilterableInterface, PhotoableInterface, SortableInterface, SearchableInterface, BelongsToAuctionInterface, AuctioneerScopeInterface
{
    use HasFactory, Photoable, Sortable, Filterable, Searchable, BelongsToAuction;
    use HasSlug, Sortable;

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('lot_name')
            ->saveSlugsTo('slug');
    }

    /**
     * {@inheritdoc}
     */
    protected $casts = [
        'extra_columns' => 'array'
    ];

    /**
     * Return columns allowed to full text search
     *
     * @var array
     */
    public $searchables = [
        'lot_name', 'lot_number'
    ];

    /**
     * Allowed columns to filter by.
     *
     * @var array
     */
    public $filterables = [
        'lot_name', 'lot_number',
    ];

    /**
     * Allowed columns to sort by.
     *
     * @var array
     */
    public $sortables = [
        'lot_name', 'lot_number',
    ];

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'lot_number', 'lot_suffix', 'lot_name', 'lot_description', 'condition_report', 'lot_type', 'low_est_value', 'high_est_value', 'reserve', 'starting_price', 'vat', 'withdrawn', 'arr_flag', 'cites_flag'
    ];

    /**
     * Column available for bulk uploader
     * @var array
     */
    protected $bulkUploaderColumns = [
        'lot_number', 'lot_suffix', 'lot_name', 'lot_description', 'condition_report', 'lot_type', 'low_est_value', 'high_est_value', 'reserve', 'starting_price', 'vat', 'withdrawn', 'arr_flag', 'cites_flag'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'lot_no_normalized'
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'lot_suffix' => null,
        'high_est_value' => null,
        'reserve' => null,
        'vat' => false,
        'withdrawn' => false,
        'arr_flag' => false,
        'cites_flag' => false
    ];


    /**
     * @return array
     */
    public function getBulkUploaderColumns()
    {
        return $this->bulkUploaderColumns;
    }

    /**
     * Get the winner user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function hammeredUser()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Get the Auction for this Lot
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function auction()
    {
        return $this->belongsTo(\App\Models\Auction::class);
    }

    public function setExtraColumns($rowData) {
        $columnMap = $this->auction->auctionType->getColumnMapLabelToId();

        $data = [];
        foreach($columnMap as $label => $v) {
            if(isset($rowData[$label])) {
                $data[$label] = $rowData[$label];
            }
        }

        $this->extra_columns = $data;
    }

    /**
     * Separates import for the existing fields,
     * and the rest should be serialized by calling setExtraColumns()
     */
    public function importLotData($rowData, $order)
    {
        $this->fill($rowData);
        $this->order = $order;
        $this->setExtraColumns($rowData);
        $this->save();
    }


    /**
     * Get the the normalized lot number
     *
     * @return string
     */
    public function getLotNoNormalizedAttribute()
    {
        return $this->attributes['lot_number'] . strtolower(trim($this->attributes['lot_suffix']));
    }

    public function scopeBelongsToAuctioneer($query, $auctioneerId)
    {
        return $query->whereHas('auction', function($q) use ($auctioneerId)
        {
            $q->where('auctioneer_id', '=', $auctioneerId);

        });
    }
}
