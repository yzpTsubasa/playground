<?php

namespace app\sample\controller;

use think\Request;

class Test {
    public function hello(Request $request) { // 依赖注入
        $id = Request::instance()->param('id');
        $name = Request::instance()->param('name');
        $age = Request::instance()->param('age');
        // $all = Request::instance()->param(); // 全部
        // $all = Request::instance()->get(); // query ?xxx
        // $all = Request::instance()->post(); // body
        // $all = Request::instance()->route(); // :xx

        $all = input('param.');
        $all = $request->param();

        var_dump($all);
    }
}