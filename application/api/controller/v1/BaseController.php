<?php

namespace app\api\controller\v1;

use think\Controller;
use app\api\service\BaseTokenService;
use app\api\model\User;
use app\lib\exception\UserException;
use app\lib\enum\ScopeEnum;
use app\lib\exception\ScopeException;

class BaseController extends Controller {

    protected function requireUserScope() {
        $scope = BaseTokenService::getCurrentUserScope();
        if ($scope < ScopeEnum::User) {
            throw new ScopeException();
        }
    }
}