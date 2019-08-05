<?php


namespace app\api\controller\v1;


use app\api\validate\TokenCodeValidator;
use app\api\service\UserTokenService;
use app\api\controller\v1\core\BaseController;
use app\lib\exception\ParameterException;
use app\api\service\TokenService;
use app\api\validate\AppTokenGetValidator;
use app\api\service\AppTokenService;

class TokenController
{
    /**
     * 微信小程序获取令牌
     */
    public function getToken() {
        $code = input('code');

        (new TokenCodeValidator())->goCheck();
        $usrToken = new UserTokenService($code);
        $token = $usrToken->get();
        $result = [
            'token' => $token,
        ];
        return json($result);
    }

    /**
     * 第三方应用获取令牌
     */
    public function getAppToken($ac = '', $se = '') {
        (new AppTokenGetValidator())->goCheck();
        $service = new AppTokenService();
        $token = $service->get($ac, $se);
        return json([
            'token' => $token,
        ]);
    }

    public function verifyToken() {
        $token = input('token');
        if (!$token) {
            throw new ParameterException('token不允许为空');
        }
        $valid = TokenService::verifyToken($token);
        return json([
            'isValid' => $valid
        ]);
    }
}