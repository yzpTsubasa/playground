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
        $scope = BaseTokenService::getCurrentUserScope();
        if (!$scope) {
            throw new TokenException();
        }
        if ($scope < ScopeEnum::User) {
            throw new ScopeException();
        }
    }

    /**
     * 只检查普通用户的权限
     */
    protected function checkUserScope() {
        $scope = BaseTokenService::getCurrentUserScope();
        if (!$scope) {
            throw new TokenException();
        }
        if ($scope != ScopeEnum::User) {
            throw new ScopeException();
        }
    }
}