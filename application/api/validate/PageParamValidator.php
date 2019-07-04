<?php


namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class PageParamValidator extends BaseValidate
{
    protected $rule = [
        'page' => 'isPositiveInt',
        'size' => 'isPositiveInt',
    ];

    protected  $message = [
        'page' => 'page必须为正整数',
        'size' => 'size必须为正整数',
    ];
}