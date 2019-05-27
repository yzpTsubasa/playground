<?php


namespace app\api\service;


class Token
{
    /**
     * 生成随机的令牌
     */
    public static function generateToken() {
        // 32个字符
        $length = 32;
        $randChars = getRandChars($length);
        // 三组字符串，md5
        $timestamp = $_SERVER['REQUEST_TIME_FLOAT'];
        $salt = config('secure.token_salt');
        $result = md5($randChars . $timestamp . $salt);
        return $result;
    }
}