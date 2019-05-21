<?php

namespace app\api\model;

class Product extends BaseModel
{
    public function theme() {
        return $this->hasMany('Theme', 'product_id', 'id');
    }
}
