<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

class BannerMissException extends BaseException
{
    public $code = 404;
    public $msg = 'Banner不存在';
    public $errorCode = 40000;
}