<?php


namespace app\lib\exception;

class NoneException extends BaseException
{
    public $code = 201;
    public $msg = 'ok';
    public $errorCode = 0;
}