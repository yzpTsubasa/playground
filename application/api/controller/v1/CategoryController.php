<?php


namespace app\api\controller\v1;

use app\api\model\Category;
use app\lib\exception\CategoryMissException;
use app\api\controller\v1\core\BaseController;

class CategoryController
{
    public function getAllCategories() {
        $data = [];
        $results = Category::all($data, ['img']);
        if ($results->isEmpty()) {
            throw new CategoryMissException();
        }
        return json($results);
    }
}