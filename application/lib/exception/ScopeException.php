<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

class ScopeException extends BaseException {
    public $code = 403;
    public $msg = '权限不足';
    public $errorCode = 10001;
}