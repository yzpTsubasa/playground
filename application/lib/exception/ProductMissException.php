<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

class ProductMissException extends BaseException
{
    public $code = 404;
    public $msg = '商品不存在';
    public $errorCode = 20000;
}