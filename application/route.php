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
Route::group('api/:version', function() {
    Route::group('/banner', function() {
        Route::get('/:id', 'api/:version.BannerController/getBanner');
    });
    Route::group('/theme', function() {
        Route::get('', 'api/:version.ThemeController/getSimpleList');
        Route::get('/:id', 'api/:version.ThemeController/getThemeDetail');
    });
    Route::group('/product', function() {
        Route::get('/by_category', 'api/:version.ProductController/getByCategoryID');
        Route::get('/:id', 'api/:version.ProductController/getDetail', [], ['id' => '\d+']);
        Route::get('/recent', 'api/:version.ProductController/getRecent');
    });
    Route::group('/category', function() {
        Route::get('/all', 'api/:version.CategoryController/getAllCategories');
    });
    Route::group('/token', function() {
        Route::post('/user', 'api/:version.TokenController/getToken');
        Route::post('/verify', 'api/:version.TokenController/verifyToken');
        Route::post('/app', 'api/:version.TokenController/getAppToken');
    });
    Route::group('/address', function() {
        Route::post('', 'api/:version.AddressController/createOrUpdateAddress');
        Route::get('', 'api/:version.AddressController/getUserAddress');
    });
    Route::group('/order', function() {
        Route::post('', 'api/:version.OrderController/submitOrder');
        Route::get('/summary', 'api/:version.OrderController/getSummary');
        Route::get('/:id', 'api/:version.OrderController/getDetail', [], ['id' => '\d+']);
    });
    Route::group('/pay', function() {
        Route::post('/preorder', 'api/:version.PayController/getPreorder');
        Route::post('/notify', 'api/:version.PayController/recvNotifyFromWxPay');
    });
});

// Route::rule('test', 'api/v1.AddressController/second');
