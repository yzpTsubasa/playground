<?php
namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class TestValidate extends BaseValidate{
    protected $rule = [
        'name' => 'require|max:5',
        'email' => 'email',
    ];
}