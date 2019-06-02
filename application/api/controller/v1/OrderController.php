<?php

namespace app\api\controller\v1;

class OrderController extends BaseController {
    // 订单主要流程：
    // 选择商品后，提交所选的商品
    // 检查订单（有效，库存量）
    // 订单有效，写入库，返回下单成功，可以开始支付
    // 调用支付接口
    // 还需要再次进行库存量检测
    // 服务器调用微信支付接口进行支付
    // 根据微信返回结果(异步推送)
    // 成功...库存量检测...扣除库存量  失败...
}