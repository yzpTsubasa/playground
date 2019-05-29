<?php


namespace app\api\validate;


class Count extends BaseValidate
{
    protected $rule = [
        'count' => 'isPositiveInt|between:1,15'
    ];

    protected $message = [
        'count' => 'count参数必须为1~15的正整数'
    ];
}