<?php

namespace app\api\model;

use think\Model;

class BannerItem extends Model
{
    public function img() {
        return $this->hasOne('Image', 'id', 'img_id');
    }
}
