<?php

namespace app\api\controller\v1;

use app\api\controller\v1\core\BaseController;
use app\api\validate\IDIsPositiveIntValidator;
use app\api\service\PayService;
use app\lib\exception\core\SuccessfulMessage;
use app\api\service\OrderService;
use app\lib\enum\OrderStatusEnum;
use app\api\service\WxNotify;
use think\Loader;

Loader::import('WxPay.WxPay', EXTEND_PATH, '.Api.php');
Loader::import('WxPay.WxPay', EXTEND_PATH, '.Config.php');

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
        $payResult = $payService->pay();
        return json($payResult);
    }

    
    /**
     * 小程序支付成功后
     * 微信定时调用该接口
     * 调用频率 15 / 15 / 30 / 180 / 1800 / 1800 / 3600 (s)
     * 
     * @method POST xml格式，无query参数
     * 
     * 
     * 
     */
    public function recvNotifyFromWxPay() {
        // 检查库存
        // 更新订单状态
        // 更新库存
        // 返回成功 / 失败

        $config = new \WxPayConfig();
        $result = (new WxNotify())->Handle($config);
        return $result;
    }
}