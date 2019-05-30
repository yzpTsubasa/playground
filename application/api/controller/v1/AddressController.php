<?php

namespace app\api\controller\v1;

use app\api\validate\AddressUpdate;
use app\api\service\BaseTokenService;
use app\api\model\User;
use app\lib\exception\UserException;
use app\api\model\UserAddress;
use app\lib\exception\SuccessfulMessage;

class AddressController {

    public function createOrUpdateAddress() {
        $addressUpdate = new AddressUpdate();
        $addressUpdate->goCheck();
        // 根据 token 获取 uid
        $uid = BaseTokenService::getCurrentUID();
        // 根据uid查找用户数据，判断用户是否存在
        $user = User::get($uid);
        if (!$user) {
            throw new UserException();
        }
        // 更新或者创建记录
        $userAddress = $user->address;
        // $dataArray = [
        //     'name' => input['name'],
        //     'mobile' => input['mobile'],
        //     'province' => input['province'],
        //     'city' => input['city'],
        //     'country' => input['country'],
        //     'detail' => input['detail'],
        // ];
        $dataArray = $addressUpdate->getData();
        if (!$userAddress) {
            // $userAddress = UserAddress::create($dataArray);
            // 使用模型的关联模型创建
            $user->address()->save($dataArray);
        } else {
            $userAddress->save($dataArray);
        }
        // return $user;
        return json(new SuccessfulMessage(), 201);
    }

}