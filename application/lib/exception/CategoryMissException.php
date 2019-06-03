<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

class CategoryMissException extends BaseException
{
    public $code = 404;
    public $msg = 'Category不存在';
    public $errorCode = 50000;
}