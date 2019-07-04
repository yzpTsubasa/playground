<?php

namespace app\api\model;

use app\api\model\core\BaseModel;
use think\Paginator;

class Order extends BaseModel {
    protected $hidden = ['user_id', 'delete_time', 'update_time'];
    protected $autoWriteTimestamp = true; // 自动写入时间

    public function getSnapItemsAttr($value, $data) {
        return empty($value) ? null : json_decode($value);
    }

    public function getSnapAddressAttr($value, $data) {
        return json_decode($value);
    }

    /**
     * @return \think\Paginator
     */
    public static function getByUser($uid, $page, $size) {
        $paginateData = self::where('user_id', '=', $uid)
            ->order('create_time desc')
            ->paginate($size, true, [
                'page' => $page,
            ]);
        return $paginateData;
    }
}