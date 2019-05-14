<?php


namespace app\lib\exception;

/**
 * 参数异常
 * @package app\lib\exception
 */
class ParameterException extends BaseException
{
    public $code = 400;
    public $msg = '参数异常';
    public $errorCode = 10000;
}