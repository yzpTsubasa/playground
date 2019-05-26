<?php


namespace app\api\validate;


class TokenCode extends BaseValidate
{
    protected $rule = [
        'code' => 'require|isNotEmpty'
    ];

    protected $message = [
        'code' => 'code不能为空'
    ];
}