<?php

namespace app\api\model;

use app\api\model\core\BaseModel;

class Order extends BaseModel {
    protected $hidden = ['user_id', 'delete_time', 'update_time'];
    protected $autoWriteTimestamp = true; // 自动写入时间
}