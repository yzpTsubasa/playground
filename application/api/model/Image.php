<?php

namespace app\api\model;

use app\api\model\core\BaseModel;

class Image extends BaseModel
{
    protected $hidden = ['id', 'from', 'delete_time', 'update_time'];

    public function getUrlAttr($value, $data) {
        return $this->prefixImgUrl($value, $data);
    }
}
