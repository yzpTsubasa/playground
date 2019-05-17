<?php

namespace app\api\model;

use think\Model;

class BannerItem extends Model
{
    protected $hidden = ['id', 'img_id', 'banner_id', 'delete_time', 'update_time'];
    public function img() {
        return $this->hasOne('Image', 'id', 'img_id');
    }
}
