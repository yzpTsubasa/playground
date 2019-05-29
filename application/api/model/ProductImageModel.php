<?php


namespace app\api\model;


class ProductImageModel extends BaseModel {
    protected $hidden = ['id', 'img_id', 'delete_time', 'product_id'];

    public function imgUrl() {
        return $this->belongsTo('Image', 'img_id', 'id');
    }
}