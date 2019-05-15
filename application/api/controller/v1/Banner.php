<?php

namespace app\api\controller\v1;

use app\api\model\Banner as BannerModel;
use app\api\validate\IDIsPositiveInt;
use app\lib\exception\BannerMissException;

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
        if (!$banner) {
            throw new BannerMissException();
//            throw new Exception("内部错误");
        }
        return json($banner);
    }
}