<?php


namespace app\api\controller\v1;

use app\api\model\Category as CategoryModel;
use app\lib\exception\CategoryMissException;

class Category
{
    public function getAllCategories() {
        $data = [];
        $results = CategoryModel::all($data, ['img']);
        if ($results->isEmpty()) {
            throw new CategoryMissException();
        }
        return json($results);
    }
}