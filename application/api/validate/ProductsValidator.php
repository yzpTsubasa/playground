<?php

namespace app\api\validate;

use app\api\validate\core\BaseValidate;
use app\lib\exception\ParameterException;

class ProductsValidator extends BaseValidate {
    protected $rule = [
        /**
         * [
         *  ['product_id' => 1, 'count' => 2],
         *  ['product_id' => 2, 'count' => 4],
         *  ['product_id' => 3, 'count' => 3],
         * ]
         */
        'products' => 'require|checkProducts',
    ];

    protected $message = [
        'products' => '商品列表无效',
    ];

    protected function checkProducts($values) {
        if (!is_array($values)) {
            return false;
        }

        if (empty($values)) {
            return false;
        }

        foreach ($values as $value) {
            (new ProductValidate())->goCheck($value);
        }

        return true;
    }
}