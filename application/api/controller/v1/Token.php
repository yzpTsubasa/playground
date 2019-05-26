<?php


namespace app\api\controller\v1;


use app\api\service\UserToken;
use app\api\validate\TokenCode;

class Token
{
    public function getToken() {
        $code = input('code');

        (new TokenCode())->goCheck();
        $usrToken = new UserToken($code);
        $token = $usrToken->get();
        return $token;
    }
}