<?php


namespace app\lib\exception;


class ScopeException extends BaseException {
    public $code = 404;
    public $msg = '无权限';
    public $errorCode = 80001;
}