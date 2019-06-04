<?php
namespace app\api\validate;

use app\api\validate\core\BaseValidate;

class TestValidator extends BaseValidate{
    protected $rule = [
        'name' => 'require|max:5',
        'email' => 'email',
    ];
}