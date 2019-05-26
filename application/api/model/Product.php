<?php

namespace app\api\model;

class Product extends BaseModel
{
    protected $hidden = ['delete_time', 'update_time', 'create_time', 'pivot', 'category_id', 'from', 'img_id'];

    public function getMainImgUrlAttr($value, $data) {
        return $this->prefixImgUrl($value, $data);
    }

    public static function getMostRecent($count) {
        $results = self::limit($count)
            ->order('create_time desc')
            ->select();
        return $results;
    }

    public static function getByCategoryID($id) {
        $results = self::where('category_id', '=', $id)
            ->select();
        return $results;
    }
}
