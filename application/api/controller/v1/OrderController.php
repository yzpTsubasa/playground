<?php

namespace app\api\controller\v1;
use app\api\controller\v1\core\BaseController;
use app\api\validate\ProductsValidator;
use app\api\service\BaseTokenService;
use app\lib\exception\core\SuccessfulMessage;
use app\api\service\OrderService;

class OrderController extends BaseController {

    protected $beforeActionList = [
        'checkUserScope' => ['only' => 'submitOrder'],
    ];
    // 订单主要流程：
    // 选择商品后，提交所选的商品
    // 检查订单（有效，库存量）
    // 订单有效，写入库，返回下单成功，可以开始支付
    // 调用支付接口
    // 还需要再次进行库存量检测
    // 服务器调用微信支付接口进行支付
    // 根据微信返回结果(异步推送)
    // 成功...库存量检测...扣除库存量  失败...

    public function submitOrder() {
        // 验证数组数据 [[id: number], ...]
        (new ProductsValidator())->goCheck();
        // 为什么 /a 为影响 Validator???
        $products = input('products/a');
        $uid = BaseTokenService::getCurrentUID();
        $oderModel = new OrderService();
        $oderModel->submit($uid, $products);
        return json(new SuccessfulMessage(), 201);
    }
}