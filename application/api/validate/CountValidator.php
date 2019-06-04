<?php


namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class CountValidator extends BaseValidate
{
    protected $rule = [
        'count' => 'isPositiveInt|between:1,15'
    ];

    protected $message = [
        'count' => 'count参数必须为1~15的正整数'
    ];
}