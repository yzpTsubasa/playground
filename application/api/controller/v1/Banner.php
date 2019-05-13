<?php

namespace app\api\controller\v1;

use think\Exception;
use think\Validate;
use app\api\validate\IDIsPositiveInt;
use app\api\model\Banner as BannerModel;

class Banner {
    /**
     * 获取指定id的banner数据
     * @url /banner/:id
     * @http GET
     * @param $id 指定bannerid
     */
    public function getBanner($id) {
        /**
         * 1. 独立验证
         */
        // $validate = new Validate([
        //     'name' => 'require|max:8', // max指的是字符串长度
        //     'email' => 'email',
        // ]);
        // $result = $validate->batch()->check($data);
        // if (!$result) {
        //     return var_dump($validate->getError());
        // }
        /**
        * 2. 验证器
        */
        (new IDIsPositiveInt())->goCheck();
        // 异常处理
//        try {
            $banner = BannerModel::getBannerByID($id);
//        } catch (Exception $exception) {
//            $err = [
//                'code' => 10001,
//                'msg' => $exception->getMessage()
//            ];
//            return json($err, 400);
//        }
        return $banner;
    }
}