<?php


namespace app\api\model;

use app\api\model\core\BaseModel;

class ProductProperty extends BaseModel {
    protected $hidden = ['id', 'update_time', 'delete_time', 'product_id'];
}