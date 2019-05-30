<?php


namespace app\api\service;


use app\lib\exception\TokenException;
use app\lib\exception\WeChatException;
use think\Exception;
use app\api\model\User as UserModel;
use app\lib\enum\ScopeEnum;

class UserTokenService extends BaseTokenService {
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
        $wxResult = curl_get($this->wxLoginUrl, $httpCode);
        $wxResult = json_decode($wxResult, true);
        if (empty($wxResult)) {
            throw new Exception('获取sessionKey及openID时异常，微信内部错误');
        }
        // session_key, expires_in, openid...
        $isSuccess = !array_key_exists('errcode', $wxResult);
        if (!$isSuccess) {
            return $this->processLoginError($wxResult);
        }
        $token = $this->grantToken($wxResult);
        return $token;
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
        $token = $this->saveCache($cachedValue);
        return $token;
    }

    private function saveCache($cachedValue) {
        $key = self::generateToken();
        $value = json_encode($cachedValue);
        $expire_in = config('setting.token_expire_in');
        $result = cache($key, $value, $expire_in);
        if (!$result) {
            throw new TokenException([
                'msg' => '服务器缓存异常',
                'errorCode' => 10005,
            ]);
        }
        return $key;
    }

    private function prepareCache($wxResult, $uid) {
        $cacheValue = $wxResult;
        $cacheValue['uid'] = $uid;
        $cacheValue['scope'] = ScopeEnum::User;
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