<?php

namespace app\api\model;

use app\api\model\core\BaseModel;

class UserAddress extends BaseModel {
    protected $hidden = ['id', 'delete_time', 'update_time'];
}