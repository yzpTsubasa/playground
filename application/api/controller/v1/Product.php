<?php


namespace app\api\controller\v1;


use app\api\validate\Count;
use app\api\model\Product as ProductModel;
use app\lib\exception\ProductMissException;

class Product
{
    public function getRecent($count=15) {
        (new Count())->goCheck();
        $result = ProductModel::getMostRecent($count);
        if (!$result) {
            throw new ProductMissException();
        }
        return json($result);
    }
}