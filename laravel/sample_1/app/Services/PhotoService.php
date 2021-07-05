<?php
namespace App\Services;
use App\Http\Resources\Photo as PhotoResource;
use App\Models\Interfaces\PhotoableInterface;
use App\Models\Photo;
use App\Models\Photo as Model;
use Illuminate\Http\Request;

class PhotoService extends AbstractCrudService
{
    protected $_modelFields = [''];
    protected $_model = Model::class;

    public function uploadFor(Request $request, PhotoableInterface $object) {
        $data = [];
        if($request->hasfile('files')) {
            foreach($request->file('files') as $file) {
                $photo = $object->photos()->create(['path' => '']);
                $photo->storeFile($file);

                $data[] = $photo;
            }
        }
        return $data;
    }

}