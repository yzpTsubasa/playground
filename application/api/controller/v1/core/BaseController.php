<?php

namespace app\api\controller\v1\core;

use think\Controller;
use app\api\service\BaseTokenService;
use app\api\model\User;
use app\lib\exception\UserException;
use app\lib\enum\ScopeEnum;
use app\lib\exception\ScopeException;
use app\lib\exception\TokenException;

class BaseController extends Controller {

    /**
     * 检查普通用户及以上的权限
     */
    protected function checkUserAboveScope() {
        return BaseTokenService::checkUserAboveScope();
    }

    /**
     * 只检查普通用户的权限
     */
    protected function checkUserScope() {
        return BaseTokenService::checkUserScope();
    }
}