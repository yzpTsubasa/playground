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

    protected function isNotEmpty($value) {
        if (empty($value)) {
            return false;
        }
        return true;
    }

    /**
     * 是否为手机号码
     */
    protected function isMobile($value) {
        $pattern = '^1(3|4|5|7|8)[0-9]\d{8}$^';
        $result = preg_match($pattern, $value);
        return !!$result;
    }

    public function getDataByRule($array) {
        if (array_key_exists('user_id', $array) | array_key_exists('uid', $array)) {
            throw new ParameterException([
                'msg' => '参数中包含非法参数名user_id 或 uid'
            ]);
        }
        $newArray = [];
        foreach ($this->rule as $key => $value) {
            $newArray[$key] = $array[$key];
        }
        return $newArray;
    }

    public function getData($method = null) {
        $newArray = [];
        foreach ($this->rule as $key => $value) {
            $newArray[$key] = input($method ? $method . '.' . $key : $key);
        }
        return $newArray;
    }
}