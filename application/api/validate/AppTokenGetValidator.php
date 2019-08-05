<?php


namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class AppTokenGetValidator extends BaseValidate
{
    protected $rule = [
        'ac' => 'require|isNotEmpty',
        'se' => 'require|isNotEmpty'
    ];

    protected $message = [
        'ac' => '帐号不能为空',
        'se' => '密码不能为空',
    ];
}