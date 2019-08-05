<?php

namespace app\api\controller\v1;

use app\api\validate\IDCollectionValidator;
use app\api\validate\IDIsPositiveIntValidator;
use app\lib\exception\ThemeMissException;
use think\Controller;
use think\Request;
use app\api\model\Theme;
use app\api\controller\v1\core\BaseController;

class ThemeController
{
    /**
     * @url /theme?ids=id1,id2,id3...
     * @return 一组Theme模型
     */
    public function getSimpleList() {
        $ids = input('ids', '');
        (new IDCollectionValidator())->goCheck();
        $ids = explode(',', $ids);
        $result = Theme::all($ids, ['topicImg', 'headImg']);
        if (!$result) {
            throw new ThemeMissException();
        }
        return json($result);
    }

    /**
     * @url /theme/:id
     */
    public function getThemeDetail() {
        $id = input('id');
        (new IDIsPositiveIntValidator())->goCheck();
        $result = Theme::getThemeWithProducts($id);
        if (!$result) {
            throw new ThemeMissException();
        }
        return json($result);
    }
}