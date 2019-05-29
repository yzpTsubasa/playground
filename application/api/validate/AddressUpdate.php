<?php

namespace app\api\validate;


class AddressUpdate extends BaseValidate{
    protected $rule = [
        'name' => 'require|isNotEmpty',
        'mobile' => 'require|isMobile',
        'province' => 'require|isNotEmpty',
        'city' => 'require|isNotEmpty',
        'country' => 'require|isNotEmpty',
        'detail' => 'require|isNotEmpty',
    ];

    protected $message = [
        'name' => 'name不能为空',
        'mobile' => 'mobile必须为手机号',
        'province' => 'province不能为空',
        'city' => 'city不能为空',
        'country' => 'country不能为空',
        'detail' => 'detail不能为空',
    ];
}