<?php


namespace app\api\model;

use app\api\model\core\BaseModel;


class Category extends BaseModel
{
    protected $hidden = ['update_time', 'delete_time', 'create_time', 'topic_img_id'];
    public function img() {
        return $this->belongsTo('Image', 'topic_img_id', 'id');
    }
}