<?php

namespace app\api\service;

use app\api\model\Product;
use app\lib\exception\ProductException;
use app\lib\exception\OrderException;

class OrderService {
    /** 客户端下单提交的products参数 */
    protected $orderProducts;

    /** 数据库中查找的商品结果。结构与$orderProducts等同 */
    protected $products;

    protected $uid;

    public function submit($_uid, $_prodcuts) {
        // 对比$orderProducts 和 $products
        $this->uid = $_uid;
        $this->orderProducts = $_prodcuts;
        $this->products = $this->getByOrder($this->orderProducts);
        $orderStatus = $this->getOrderStatus();
    }

    private function getOrderStatus() {
        $status = [
            'pass' => true,
            'orderPrice' => 0,
            'pStatusArray' => [],
        ];
        // $productMap = [];
        // foreach ($this->products as $product) {
        //     $productMap[$product['id']] = $product;
        // }
        foreach ($this->orderProducts as $orderProduct) {
            $productStatus = $this->getProductStatus($orderProduct['product_id'], $orderProduct['count'], $this->products);
            if (!$productStatus['haveStock']) {
                $status['pass'] = false;
            }
            $status['orderPrice'] += $productStatus['totalPrice'];
            array_push($status['pStatusArray'], $productStatus);
        }
        return $status;
    }

    private function getProductStatus($order_product_id, $order_count, $products) {
        $pStatus = [
            'id' => $order_product_id,
            'haveStock' => false,
            'count' => 0,
            'name' => '',
            'totalPrice' => 0,
        ];
        $productIndex = array_search($order_product_id, array_column($products, 'id'));
        if ($productIndex !== false) {
            $product = $products[$productIndex];
            $pStatus['haveStock'] = $product['stock'] >= $order_count;
            $pStatus['count'] = $order_count;
            $pStatus['name'] = $product['name'];
            $pStatus['totalPrice'] = $product['price'] * $order_count;
        } else {
            throw new OrderException([
                'msg' => sprintf('订单中id为 %d 的商品不存在', $order_product_id)
            ]);
        }

        return $pStatus;
    }

    /** 根据订单获取数据库的库存 */
    private function getByOrder($orderProducts) {
        $orderproduct_ids = [];
        foreach ($orderProducts as $orderProduct) {
            array_push($orderproduct_ids, $orderProduct['product_id']);
        }

        $products = Product::all($orderproduct_ids)
            ->visible(['id', 'stock', 'price', 'name', 'main_img_url'])
            ->toArray();

        return $products;
    }
}