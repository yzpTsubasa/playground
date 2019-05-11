<?php
namespace app\api\validate;

class TestValidate extends BaseValidate{
    protected $rule = [
        'name' => 'require|max:5',
        'email' => 'email',
    ];
}