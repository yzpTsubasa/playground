<?php


namespace app\api\model;


class ProductProperty extends BaseModel {
    protected $hidden = ['id', 'update_time', 'delete_time', 'product_id'];
}