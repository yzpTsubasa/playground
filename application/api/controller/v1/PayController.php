<?php

namespace app\api\controller\v1;

use app\api\controller\v1\core\BaseController;
use app\api\validate\IDIsPositiveIntValidator;
use app\api\service\PayService;

class PayController extends BaseController {

    protected $beforeActionList = [
        'checkUserScope' => ['only' => 'getPreOrder']
    ];

    /**
     * 获取预定单（微信定制）
     */
    public function getPreorder() {
        (new IDIsPositiveIntValidator())->goCheck();
        
        $order_id = input('id');
        $payService = new PayService($order_id);
        $payService->pay();
    }
}