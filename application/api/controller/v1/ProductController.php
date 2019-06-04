<?php


namespace app\api\controller\v1;


use app\api\validate\CountValidator;
use app\api\model\Product;
use app\api\model\Category;
use app\api\validate\IDIsPositiveIntValidator;
use app\lib\exception\ProductException;
use app\api\controller\v1\core\BaseController;

class ProductController
{
    public function getRecent() {
        $count = input('count', 3);
        (new CountValidator())->goCheck();
        $results = Product::getMostRecent($count);
        if ($results->isEmpty()) {
            throw new ProductException();
        }
//        $results = collection($results);
        $results->hidden(['summery']);
        return json($results);
    }

    public function getByCategoryID() {
        (new IDIsPositiveIntValidator())->goCheck();
        $id = input('id');
        $results = Product::getByCategoryID($id);
        if ($results->isEmpty()) {
            throw new ProductException();
        }
        $results->hidden(['summary']);
        return json($results);
    }

    public function getDetail() {
        (new IDIsPositiveIntValidator())->goCheck();
        $id = input('id');
        $result = Product::getDetail($id);
        if (!$result) {
            throw new ProductException();
        }
        $result->hidden(['summary']);
        return json($result);
    }

}