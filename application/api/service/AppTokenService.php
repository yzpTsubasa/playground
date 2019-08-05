<?php


namespace app\api\service;


use app\lib\exception\TokenException;
use app\lib\exception\WeChatException;
use think\Exception;
use app\api\model\User as UserModel;
use app\lib\enum\ScopeEnum;
use app\api\model\ThirdApp;

/**
 * 第三方应用令牌服务
 */
class AppTokenService extends TokenService {

    function __construct(){
    }

    public function get($ac, $se) {
        $app = ThirdApp::check($ac, $se);
        if (!$app) {
            throw new TokenException('授权失败', 10004);
        } else {
            $scope = $app->scope;
            $uid = $app->id;
            $values = [
                'scope' => $scope,
                'uid' => $uid,
            ];
            $token = $this->saveToCache($values);
            return $token;
        }
    }

    private function saveToCache($cachedValue) {
        $token = self::generateToken();
        $value = json_encode($cachedValue);
        $expire_in = config('setting.token_expire_in');
        $result = cache($token, $value, $expire_in);
        if (!$result) {
            throw new TokenException('服务器缓存异常', 10005);
        }
        return $token;
    }
}