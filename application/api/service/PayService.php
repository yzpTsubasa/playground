<?php

namespace app\api\service;

use think\Exception;
use app\lib\exception\OrderException;
use app\lib\exception\TokenException;
use app\lib\enum\OrderStatusEnum;
use app\lib\exception\core\BaseException;
use think\Loader;
use app\api\model\Order;
use think\Log;

Loader::import('WxPay.WxPay', EXTEND_PATH, '.Api.php');
Loader::import('WxPay.WxPay', EXTEND_PATH, '.Config.php');

class PayService {

    private $order_id;
    private $order_num;

    function __construct($order_id) {
        $this->order_id = $order_id;
    }

    public function pay() {
        // 订单存在
        // 订单与用户匹配
        // 订单未被支付
        $this->checkOrderValid();
        // 库存量检测
        $orderService = new OrderService();
        $orderStatus = $orderService->checkOrderStock($this->order_id);

        if (!$orderStatus['pass']) {
            return $orderStatus; // 直接返回订单状态
        }
        return $this->makeWxPreorder($orderStatus['orderPrice']);
    }

    // 创建微信预订单
    private function makeWxPreorder($totalPrice) {
        $openid = TokenService::getCurrentOpenID();
        if (!$openid) {
            throw new TokenException();
        }
        $wxPayUnifiedOrder = new \WxPayUnifiedOrder();
        $wxPayUnifiedOrder->SetOut_trade_no($this->order_num);
        $wxPayUnifiedOrder->SetTrade_type('JSAPI');
        $wxPayUnifiedOrder->SetTotal_fee($totalPrice * 100); // 以分为单位
        $wxPayUnifiedOrder->SetBody('零售商贩'); 
        $wxPayUnifiedOrder->SetOpenid($openid); 
        $wxPayUnifiedOrder->SetNotify_url(''); // 回调地址

        $this->getPaySignature($wxPayUnifiedOrder);
    }

    private function getPaySignature($wxPayUnifiedOrder) {
        $order = \WxPayApi::unifiedOrder(new \WxPayConfig(), $wxPayUnifiedOrder);
        if ($order['return_code'] != 'SUCCESS' ||
            $order['result_code'] != 'SUCCESS') {
            Log::write($order, 'error');
            Log::write('获取预支付订单失败', 'error');
        }
        return null;
    }

    private function checkOrderValid() {
        $order = Order::where('id', '=', $this->order_id)
                        ->find();
        if (!$order) {
            throw new OrderException();
        }
        TokenService::isValidOperation($order->user_id, '订单与用户不匹配', 10003);
        if ($order->status != OrderStatusEnum::UNPAID) {
            throw new OrderException("订单已经支付过了", 80003, 400);
        }
        $this->order_num = $order->order_no;
        return true;
    }
}