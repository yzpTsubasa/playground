<?php

namespace app\api\controller\v1;

use app\api\model\Banner;
use app\api\model\BannerItem;
use app\api\validate\IDIsPositiveInt;
use app\lib\exception\BannerMissException;
use app\api\controller\v1\core\BaseController;

class BannerController {
    /**
     * 获取指定id的banner数据
     * @url /banner/:id
     * @http GET
     * @param $id 指定bannerid
     */
    public function getBanner() {
        $id = input('id');
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
            $banner = Banner::getBannerByID($id);
//            $banner = Banner::get($id, ['items', 'items.img']);
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