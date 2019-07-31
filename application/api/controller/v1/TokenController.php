<?php


namespace app\api\controller\v1;


use app\api\validate\TokenCodeValidator;
use app\api\service\UserTokenService;
use app\api\controller\v1\core\BaseController;
use app\lib\exception\ParameterException;
use app\api\service\TokenService;

class TokenController
{
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