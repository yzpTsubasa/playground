<?php


namespace app\api\controller\v1;


use app\api\validate\Count;
use app\api\model\Product as ProductModel;
use app\api\model\Category as CategoryModel;
use app\api\validate\IDIsPositiveInt;
use app\lib\exception\ProductMissException;

class Product
{
    public function getRecent() {
        $count = input('count', 3);
        (new Count())->goCheck();
        $results = ProductModel::getMostRecent($count);
        if ($results->isEmpty()) {
            throw new ProductMissException();
        }
//        $results = collection($results);
        $results->hidden(['summery']);
        return json($results);
    }

    public function getByCategoryID() {
        (new IDIsPositiveInt())->goCheck();
        $id = input['id'];
        $results = ProductModel::getByCategoryID($id);
        if ($results->isEmpty()) {
            throw new ProductMissException();
        }
        $results->hidden(['summery']);
        return json($results);
    }
}