<?php

namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class IDIsPositiveIntValidator extends BaseValidate {
    protected $rule = [
        'id' => 'require|isPositiveInt',
//        'num' => 'in:1,2,3'
    ];
    protected $message = [
        'id' => 'id必须为非空的正整数'
    ];

}