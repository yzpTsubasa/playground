<?php

namespace app\api\model;

use think\Model;

class BaseModel extends Model {

    public function getUrlAttr($value, $data) {
        $result = $value;
        if ($data['from'] == 1) {
            $result = config('setting.img_prefix') . $value;
        }
        return $result;
    }
}
