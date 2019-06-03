<?php

namespace app\api\model;

use app\api\model\core\BaseModel;

class BannerItem extends BaseModel
{
    protected $hidden = ['id', 'img_id', 'banner_id', 'delete_time', 'update_time'];
    public function img() {
        return $this->belongsTo('Image', 'img_id', 'id');
    }
}
