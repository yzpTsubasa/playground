<?php


namespace app\api\model;


class CategoryModel extends BaseModel
{
    protected $hidden = ['update_time', 'delete_time', 'create_time', 'topic_img_id'];
    public function img() {
        return $this->belongsTo('Image', 'topic_img_id', 'id');
    }
}