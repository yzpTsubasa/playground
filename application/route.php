<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// return [
//     '__pattern__' => [
//         'name' => '\w+',
//     ],
//     '[hello]'     => [
//         ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
//         ':name' => ['index/hello', ['method' => 'post']],
//     ],

// ];

use think\Route;
// Route::get('hello', 'sample/Test/hello');
// Route::post('hello', 'sample/Test/hello');
// Route::rule('hello/:id', 'sample/Test/hello', 'GET|POST', ["https" => false]);

//Route::get('banner/:id', 'api/v1.Banner/getBanner');

// api开头;携带版本号
Route::get('api/:version/banner/:id', 'api/:version.Banner/getBanner');

Route::get('api/:version/theme', 'api/:version.Theme/getSimpleList');
Route::get('api/:version/theme/:id', 'api/:version.Theme/getThemeDetail');

// 路由分组
Route::group('api/:version/product', function() {
    Route::get('/by_category', 'api/:version.Product/getByCategoryID');
    Route::get('/:id', 'api/:version.Product/getDetail', [], ['id' => '\d+']);
    Route::get('/recent', 'api/:version.Product/getRecent');
});

Route::get('api/:version/category/all', 'api/:version.Category/getAllCategories');

Route::post('api/:version/token/user', 'api/:version.Token/getToken');

Route::post('api/:version/address', 'api/:version.Address/createOrUpdateAddress');