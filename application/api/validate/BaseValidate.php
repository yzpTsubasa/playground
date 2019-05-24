<?php

namespace app\api\validate;

use app\lib\exception\ParameterException;
use think\Validate;
use think\Request;
use think\Exception;

class BaseValidate extends Validate {
    public function goCheck() {
        $request = Request::instance();
        $params = $request->param();

        $result = $this->batch()->check($params);

        if (!$result) {
            $error = $this->error;
            $e = new ParameterException([
                'msg' => $error,
//                'errorCode' => 10001,
//                'foo' => 'foo',
            ]);
            throw $e;
        } else {
            return true;
        }
    }


    /**
     * 是否为正整数
     */
    protected function isPositiveInt($value, $rule = '', $data = '', $field = '') {
        if (is_numeric($value) && is_int($value + 0) && ($value + 0 > 0)) {
            return true;
        } else {
            return false;
        }
    }
}