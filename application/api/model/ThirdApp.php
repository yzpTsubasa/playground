<?php

namespace app\api\model;

use app\api\model\core\BaseModel;
use think\Paginator;

class ThirdApp extends BaseModel {
    protected $hidden = ['user_id', 'delete_time', 'update_time'];
    protected $autoWriteTimestamp = true; // 自动写入时间


    public static function check($ac, $se) {
        $app = self::where('app_id', '=', $ac)
            ->where('app_secret', '=', md5($se))
            ->find();
        return $app;
    }
}