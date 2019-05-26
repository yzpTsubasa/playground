<?php


namespace app\api\service;


use app\lib\exception\WeChatException;
use think\Exception;

class UserToken {
    protected $code;
    protected $wxAppID;
    protected $wxAppSecret;
    protected $wxLoginUrl;

    function __construct($code){
        $this->code = $code;
        $this->wxAppID = config('wx.app_id');
        $this->wxAppSecret = config('wx.app_secret');
        $this->wxLoginUrl = sprintf(config('wx.login_url'), $this->wxAppID, $this->wxAppSecret, $this->code);
    }

    public function get() {
        $httpCode = 0;
        $result = curl_get($this->wxLoginUrl, $httpCode);
        $result = json_decode($result, true);
        if (empty($result)) {
            throw new Exception('获取sessionKey及openID时异常，微信内部错误');
        }
        // session_key, expires_in, openid...
        $isSuccess = !array_key_exists('errcode', $result);
        if (!$isSuccess) {
            return $this->processLoginError($result);
        }
        $this->grantToken($result);
    }

    protected function grantToken($wxResult) {
        // 取openid
        $openid = $wxResult['openid'];
        // 在数据库中没有这个openid，则添加到User中

        // 生成Token，准备缓存数据
        // 返回Token
    }

    protected function processLoginError($wxResult) {
        throw new WeChatException([
            'msg' => $wxResult['errmsg'],
            'errorCode' => $wxResult['errcode'],
        ]);
    }
}