<?php


namespace app\api\controller\v1;


use app\api\validate\TokenCode;
use app\api\service\UserTokenService;
use app\api\controller\v1\core\BaseController;

class TokenController
{
    public function getToken() {
        $code = input('code');

        (new TokenCode())->goCheck();
        $usrToken = new UserTokenService($code);
        $token = $usrToken->get();
        $result = [
            'token' => $token,
        ];
        return json($result);
    }
}