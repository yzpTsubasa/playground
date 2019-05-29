<?php


namespace app\lib\exception;


use think\Exception;
use think\Log;
use Throwable;

class BaseException extends Exception
{
    // HTTP 状态码
    public $code = 400;

    // 错误具体信息
    public $msg = '参数错误';

    // 自定义的错误码
    public $errorCode = 10000;

    function __construct($params = [])
    {
        if (!is_array($params)) {
            return;
//            throw new Exception("参数必须为数组");
        }
//        if (array_key_exists('code', $params))
        foreach ($params as $key=> $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            } else {
                // 异常参数
            }
        }
    }
}