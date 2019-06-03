<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

class UserException extends BaseException {
    public $code = 404;
    public $msg = '用户不存在';
    public $errorCode = 40001;
}