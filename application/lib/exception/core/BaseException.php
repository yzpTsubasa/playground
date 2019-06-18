<?php


namespace app\lib\exception\core;


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

    function __construct(string $msg = null, int $errorCode = null, int $code = null, $params = [])
    {
        $this->code = $code != null ? $code : $this->code;
        $this->msg = $msg != null ? $msg : $this->msg;
        $this->errorCode = $errorCode != null ? $errorCode : $this->errorCode;
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