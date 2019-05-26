<?php


namespace app\api\service;


use app\lib\exception\WeChatException;
use think\Exception;
use app\api\model\User as UserModel;

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

    private function grantToken($wxResult) {
        // 取openid
        $openid = $wxResult['openid'];
        // 在数据库中没有这个openid，则添加到User中
        $user = UserModel::getByOpenID($openid);
        if (!$user) {
            $user = $this->createUser($openid);
        }
        $uid = $user->id;
        // {token: {wxResult, uid, scope(权限)}}
        // 生成Token，准备缓存数据
        $cachedValue = $this->prepareCache($wxResult, $uid);
        // 返回Token
    }

    private function saveCache($cachedValue) {
        $key = generateToken();

    }

    private function prepareCache($wxResult, $uid) {
        $cacheValue = $wxResult;
        $cacheValue['uid'] = $uid;
        $cacheValue['scope'] = 16;
        return $cacheValue;
    }

    private function processLoginError($wxResult) {
        throw new WeChatException([
            'msg' => $wxResult['errmsg'],
            'errorCode' => $wxResult['errcode'],
        ]);
    }

    private function createUser($openid) {
        $user = UserModel::create([
           "openid" => $openid,
        ]);
        return $user;
    }
}