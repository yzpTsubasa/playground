<?php


namespace app\api\service;

use think\Request;
use think\Cache;
use app\lib\exception\TokenException;
use think\Exception;

class BaseTokenService
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

    public static function getCurrentTokenValue($key) {
        // 约定token必须放在header中
        $token = Request::instance()->header('token');
        $values = Cache::get($token);
        if (!$values) {
            throw new TokenException();
        }
        if (!is_array($values)) { // redis 可能直接就是数组
            $values = json_decode($values, true); // 使用数据返回
        }
        if (!array_key_exists($key, $values)) {
            throw new Exception(sprintf( '尝试获取token的变量%s并不存在', $key));
        }
        return $values[$key];
    }

    public static function getCurrentUID() {
        return self::getCurrentTokenValue('uid');
    }

    public static function getCurrentOpenID() {
        return self::getCurrentTokenValue('openid');
    }

    public static function getCurrentUserScope() {
        return self::getCurrentTokenValue('scope');
    }
}