<?php

namespace app\api\controller\v1;

use app\api\validate\IDCollection;
use app\api\validate\IDIsPositiveInt;
use app\lib\exception\ThemeMissException;
use think\Controller;
use think\Request;
use app\api\model\Theme as ThemeModel;

class Theme
{
    /**
     * @url /theme?ids=id1,id2,id3...
     * @return 一组Theme模型
     */
    public function getSimpleList($ids='') {
        (new IDCollection())->goCheck();
        $ids = explode(',', $ids);
        $result = ThemeModel::all($ids, ['topicImg', 'headImg']);
        if (!$result) {
            throw new ThemeMissException();
        }
        return json($result);
    }

    /**
     * @url /theme/:id
     */
    public function getThemeDetail($id) {
        (new IDIsPositiveInt())->goCheck();
        $result = ThemeModel::getThemeWithProducts($id);
        if (!$result) {
            throw new ThemeMissException();
        }
        return json($result);
    }
}
