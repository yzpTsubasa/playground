<?php


namespace app\api\model;


class UserModel extends BaseModel
{
    public function address() {
        return $this->hasOne('UserAddressModel', 'user_id', 'id');
    }
    
    public static function getByOpenID($openid) {
        $result = self::where("openid", '=', $openid)
                    ->find();
        return $result;
    }


}