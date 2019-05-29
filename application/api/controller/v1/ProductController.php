<?php


namespace app\api\controller\v1;


use app\api\validate\Count;
use app\api\model\Product;
use app\api\model\Category;
use app\api\validate\IDIsPositiveInt;
use app\lib\exception\ProductMissException;

class ProductController
{
    public function getRecent() {
        $count = input('count', 3);
        (new Count())->goCheck();
        $results = Product::getMostRecent($count);
        if ($results->isEmpty()) {
            throw new ProductMissException();
        }
//        $results = collection($results);
        $results->hidden(['summery']);
        return json($results);
    }

    public function getByCategoryID() {
        (new IDIsPositiveInt())->goCheck();
        $id = input('id');
        $results = Product::getByCategoryID($id);
        if ($results->isEmpty()) {
            throw new ProductMissException();
        }
        $results->hidden(['summary']);
        return json($results);
    }

    public function getDetail() {
        (new IDIsPositiveInt())->goCheck();
        $id = input('id');
        $result = Product::getDetail($id);
        if (!$result) {
            throw new ProductMissException();
        }
        $result->hidden(['summary']);
        return json($result);
    }
}