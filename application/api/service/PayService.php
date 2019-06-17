<?php

namespace app\api\service;

use think\Exception;

class PayService {

    private $order_id;
    private $order_num;

    function __construct($order_id) {
        $this->order_id = $order_id;
    }

    public function pay() {
        $orderService = new OrderService();
        $orderStatus = $orderService->checkOrderStock($this->order_id);

        if (!$orderStatus['pass']) {
            
        }
    }
}