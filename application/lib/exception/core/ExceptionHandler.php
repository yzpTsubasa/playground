<?php


namespace app\lib\exception\core;


use think\Config;
use Exception;
use think\exception\Handle;
use think\Log;
use think\Request;

/**
 * 所有的异常处理（自定义的异常，以及其他框架异常）
 * @package app\lib\exception
 */
class ExceptionHandler extends Handle
{
    private $code;
    private $msg;
    private $errorCode;
    // 返回客户端当前请求的url路径

    public function render(Exception $e)
    {
        if ($e instanceof BaseException) { // 自己定义的异常
            $this->code = $e->code;
            $this->msg = $e->msg;
            $this->errorCode = $e->errorCode;
        } else {
            // 记录日志
            $this->recordException($e);

            /** 是否启用默认的异常页面*/
            $enableExceptionPage = Config::get('app_debug'); // config('app_debug')
            if ($enableExceptionPage) {
                return parent::render($e);
            }
            $this->code = 500;
            $this->msg = '服务器内部错误';
            $this->errorCode = 999;
        }
        $request = Request::instance();
        $result = [
            'msg' => $this->msg,
            'error_code' => $this->errorCode,
            'request_url' => $request->url(),
        ];
        return json($result, $this->code);
    }

    private function recordException(Exception $e) {
        Log::write(get_class($e) . $e->getMessage(), 'error', true);
    }
}