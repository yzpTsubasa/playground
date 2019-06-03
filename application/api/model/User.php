<?php


namespace app\api\model;

use app\api\model\core\BaseModel;

class User extends BaseModel
{
    public function address() {
        return $this->hasOne('UserAddress', 'user_id', 'id');
    }

    public static function getByOpenID($openid) {
        $result = self::where("openid", '=', $openid)
                    ->find();
        return $result;
    }
}