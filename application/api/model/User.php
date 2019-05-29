<?php


namespace app\api\model;


class UserModel extends BaseModel
{
    public static function getByOpenID($openid) {
        $result = self::where("openid", '=', $openid)
                    ->find();
        return $result;
    }

}