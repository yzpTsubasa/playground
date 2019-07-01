<?php
namespace app\api\service;

use app\lib\enum\OrderStatusEnum;
use app\api\model\Product;
use app\lib\exception\core\ExceptionHandler;

Loader::import('WxPay.WxPay', EXTEND_PATH, '.Notify.php');

class WxNotify extends \WxPayNotify {

    
    // <xml>
    //     <appid><![CDATA[wx2421b1c4370ec43b]]></appid>
    //     <attach><![CDATA[支付测试]]></attach>
    //     <bank_type><![CDATA[CFT]]></bank_type>
    //     <fee_type><![CDATA[CNY]]></fee_type>
    //     <is_subscribe><![CDATA[Y]]></is_subscribe>
    //     <mch_id><![CDATA[10000100]]></mch_id>
    //     <nonce_str><![CDATA[5d2b6c2a8db53831f7eda20af46e531c]]></nonce_str>
    //     <openid><![CDATA[oUpF8uMEb4qRXf22hE3X68TekukE]]></openid>
    //     <out_trade_no><![CDATA[1409811653]]></out_trade_no>
    //     <result_code><![CDATA[SUCCESS]]></result_code>
    //     <return_code><![CDATA[SUCCESS]]></return_code>
    //     <sign><![CDATA[B552ED6B279343CB493C5DD0D78AB241]]></sign>
    //     <sub_mch_id><![CDATA[10000100]]></sub_mch_id>
    //     <time_end><![CDATA[20140903131540]]></time_end>
    //     <total_fee>1</total_fee>
    //     <coupon_fee_0><![CDATA[10]]></coupon_fee_0>
    //     <coupon_count><![CDATA[1]]></coupon_count>
    //     <coupon_type><![CDATA[CASH]]></coupon_type>
    //     <coupon_id><![CDATA[10000]]></coupon_id> 
    //     <trade_type><![CDATA[JSAPI]]></trade_type>
    //     <transaction_id><![CDATA[1004400740201409030005092168]]></transaction_id>
    // </xml>
    
    /**
	 * 
	 * 回调方法入口，子类可重写该方法
	 	//TODO 1、进行参数校验
		//TODO 2、进行签名验证
		//TODO 3、处理业务逻辑
	 * 注意：
	 * 1、微信回调超时时间为2s，建议用户使用异步处理流程，确认成功之后立刻回复微信服务器
	 * 2、微信服务器在调用失败或者接到回包为非确认包的时候，会发起重试，需确保你的回调是可以重入
	 * @param \WxPayNotifyResults $objData 回调解释出的参数
	 * @param \WxPayConfigInterface $config
	 * @param string $msg 如果回调处理失败，可以将错误信息输出到该方法
	 * @return true回调出来完成不需要继续回调，false回调处理未完成需要继续回调
	 */
    public function NotifyProcess($objData, $config, $msg)
    {
        try {
            $values = $objData->GetValues();
            if ($values['result_code'] === 'SUCCESS') { // 支付成功
                $order_no = $values['out_trade_no'];
                $order = Order::where("order_no", "=", $order_no)
                                ->find();
                if (!$order) {
                    return false;
                }
                if ($order['status'] != OrderStatusEnum::UNPAID) {
                    return false;
                }
                $orderService = new OrderService();
                $orderStatus = $orderService->checkOrderStock($order['id']);
                // if (!$orderStatus['pass']) {
                //     return false;
                // }
                $this->updateOrderStatus($order['id'], $orderStatus['pass']);
                $this->reduceStock($orderStatus);
            }
        } catch (\Exception $th) {
            ExceptionHandler::recordException($th);
            return false;
        }
        return true;
    }

    private function updateOrderStatus($order_id, $success) {
        $status = $success ? OrderStatusEnum::PAID : OrderStatusEnum::PAID_STOCKOUT;
        Order::where('id', '=', $order_id) 
            ->update("status", $status);
        
    }

    private function reduceStock($orderStatus) {
        if ($orderStatus['pass']) {
            foreach ($orderStatus['pStatusArray'] as $singleStatus) {
                Product::where('id', '=', $singleStatus['id'])
                    ->setDec('stock', $singleStatus['count']);
            }
        }
    }
}