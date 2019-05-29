<?php

namespace app\api\controller\v1;

use app\api\validate\AddressUpdate;
use app\api\service\BaseTokenService;
use app\api\model\UserModel;
use app\lib\exception\UserException;

class Address {

    public function createOrUpdateAddress() {
        (new AddressUpdate())->goCheck();
        // 根据 token 获取 uid
        $uid = BaseTokenService::getCurrentUID();
        // 根据uid查找用户数据，判断用户是否存在
        $user = UserModel::get($uid);
        if (!$user) {
            throw new UserException();
        }
        // 更新或者创建记录
    }

}