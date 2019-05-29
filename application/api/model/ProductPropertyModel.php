<?php


namespace app\api\model;


class ProductPropertyModel extends BaseModel {
    protected $hidden = ['id', 'update_time', 'delete_time', 'product_id'];
}