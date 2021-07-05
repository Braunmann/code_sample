<?php

namespace App\Models;

use App\Services\PhotoService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Photo extends Model
{

    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = ['path'];
    public $timestamps = false;

    protected $_extensions = [
        'jpeg' => 'jpg',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function($model){
            // TODO maybe upload here?
        });

        self::deleted(function($model){
            $model->removeFile();
        });
    }

    public function photoable()
    {
        return $this->morphTo();
    }

    private $storeConfig = [
        'App\Models\Lot' => [
            'url_prefix' => 'https://phoenix-assets.ams3.cdn.digitaloceanspaces.com/',
            'path' => 'lots-images',
            'disk' => 's3',
        ]
    ];

    public function getStoreConfig($type) {
        if(isset($this->storeConfig[$type])) {
            return $this->storeConfig[$type];
        } else {
            throw New \Exception('Store Config for type: ' . $type . ' is NOT configured');//TODO Custom Exception Class?
        }
    }

    protected function _getFileExtension($file) {
        $ext = $file->extension();

        if(isset($this->_extensions[$ext])) {
            return $this->_extensions[$ext];
        }

        return $ext;
    }

    protected function _generateFileName($file) {
        $o = $this->photoable;
        $name = $this->id;
        if($o->slug) {
            $name .= '_' . $o->slug;
        } elseif($o->name) {
            $name .= '_' . Str::slug($o->name);
        } elseif($o->lot_name) {
            $name .= '_' . Str::slug($o->lot_name);
        }

        return $name . '_' . hrtime(true) . '.' . $this->_getFileExtension($file);
    }

    public function storeFile($file, $checksum = null) {
        $path = $this->_generateFileName($file);
        $this->path = $file->storeAs($this->getStoreConfig($this->photoable_type)['path'] . '/' . $this->photoable_id, $path, $this->getStoreConfig($this->photoable_type)['disk']);
        $this->checksum = $checksum;
        return $this->save();
    }

    public function removeFile() {
        Storage::disk($this->getStoreConfig($this->photoable_type)['disk'])->delete($this->path);
    }

    /**
     * Get the photo url.
     *
     * @return string
     */
    public function getUrlAttribute() {
        // TODO: consider assets()
        return $this->getStoreConfig($this->photoable_type)['url_prefix'] . $this->path;
    }
}
