<?php

namespace app\api\validate;

use app\api\validate\core\BaseValidate;
use app\lib\exception\ParameterException;

class ProductValidate extends BaseValidate {
    protected $rule = [
        'product_id' => 'require|isPositiveInt',
        'count' => 'require|isPositiveInt',
    ];

    protected $message = [
        'product_id' => '商品ID必须为正整数',
        'count' => '商品数量必须为正整数',
    ];
}