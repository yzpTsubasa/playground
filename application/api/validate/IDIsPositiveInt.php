<?php

namespace app\api\validate;


class IDIsPositiveInt extends BaseValidate {
    protected $rule = [
        'id' => 'require|isPositiveInt'
    ];

    /**
     * 是否为正整数
     */
    protected function isPositiveInt($value, $rule = '', $data = '', $field = '') {
        if (is_numeric($value) && is_int($value + 0) && ($value + 0 > 0)) {
            return true;
        } else {
            return $field . " 必须为正整数，实际接收到的值:" . $value;
        }
    }
}