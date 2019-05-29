<?php


namespace app\api\controller\v1;


use app\api\validate\TokenCode;
use app\api\service\UserTokenService;

class Token
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