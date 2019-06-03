<?php


namespace app\lib\exception;

use app\lib\exception\core\BaseException;

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