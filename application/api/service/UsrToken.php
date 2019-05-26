<?php


namespace app\api\service;


use think\Exception;

class UsrToken {
    protected $code;
    protected $wxAppID;
    protected $wxAppSecret;
    protected $wxLoginUrl;

    function __construct($code){
        $this->code = $code;
        $this->wxAppID = config('wx.app_id');
        $this->wxAppSecret = config('wx.app_secret');
        $this->wxLoginUrl = sprintf(config('wx.login_url'), $this->wxAppID, $this->wxAppSecret, $this->$code);
    }

    public function get() {
        $httpCode = 0;
        $result = curl_get($this->wxLoginUrl, $httpCode);
        $result = json_decode($result, true);
        if (empty($result)) {
            throw new Exception('获取sessionKey及openID时异常，微信内部错误');
        }
        $isSuccess = !array_key_exists('errcode', $result);
        if ($isSuccess) {

        }
    }
}