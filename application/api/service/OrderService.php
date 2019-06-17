<?php

namespace app\api\service;

use app\api\model\Product;
use app\lib\exception\ProductException;
use app\lib\exception\OrderException;
use app\api\model\UserAddress;
use app\lib\exception\UserException;
use app\api\model\Order;
use app\api\model\OrderProduct;
use think\Db;

class OrderService {
    /** 客户端下单提交的products参数 */
    protected $orderProducts;

    /** 数据库中查找的商品结果。结构与$orderProducts等同 */
    protected $products;

    protected $uid;

    /**
     * 提交订单
     */
    public function submit($_uid, $_prodcuts) {
        // 对比$orderProducts 和 $products
        $this->uid = $_uid;
        $this->orderProducts = $_prodcuts;
        $this->products = $this->getProductsByOrder($this->orderProducts);
        $orderStatus = $this->getOrderStatus();
        if (!$orderStatus['pass']) { // 未通过
            $orderStatus['order_id'] = -1;
            return $orderStatus;
        }
        // 创建订单
        $orderSnap = $this->snapOrder($orderStatus);
        $order = $this->createOrder($orderSnap);
        $order['pass'] = true;
        return $order;
    }

    /**
     * 检查订单库存
     */
    public function checkOrderStock($order_id) {
        $this->orderProducts = OrderProduct::where('order_id', '=', $order_id)->select();
        if (!($this->orderProducts)) {
            throw new OrderException();
        }
        $this->products = $this->getProductsByOrder($this->orderProducts);
        $orderStatus = $this->getOrderStatus();
        return $orderStatus;
    }

    private function createOrder($snap) {
        Db::startTrans(); // 开始事务
        try {
            // 写 order 表
            $orderSN = self::generateOrderSN();
            $order = new Order();
            $order->save([
                'order_no' => $orderSN, 
                'user_id' => $this->uid,
                'total_price' => $snap['orderPrice'],
                'total_count' => $snap['totalCount'],
                'snap_name' => $snap['snapName'],
                'snap_img' => $snap['snapImg'],
                'snap_address' => json_encode($snap['snapAddress']),
                'snap_items' => json_encode($snap['pStatus']),
            ]);
            $order_id = $order->id;
            // 写 order_product 表
            // foreach ($this->orderProducts as $value) {
            //     $orderProductModel = new OrderProduct();
            //     $orderProductModel->save([
            //         'order_id' => $order_id,
            //         'product_id' => $value['product_id'],
            //         'count' => $value['count'],
            //     ]);
            // }
            foreach ($this->orderProducts as &$value) {
                $value['order_id'] = $order_id;
            }
            (new OrderProduct())->saveAll($this->orderProducts);
            Db::commit();
            return [
                'order_no' => $orderSN,
                'order_id' => $order_id,
                'create_time' => $order->create_time,
            ];
        } catch (\Throwable $th) {
            Db::rollback();
            throw $th;
        }
    }

    public static function generateOrderSN() {
        $yCode = ['A','B','C','D','E','F','G','H','I','J'];
        $orderSN = $yCode[intval(date('Y')) - 2019] // 第n年，取yCode
                . strtoupper(dechex(date('m'))) // 月份十进制->十六进制
                . date('d') // 日
                . substr(time(), -5) // unix时间戳
                . substr(microtime(), 2, 5) // 时间戳微秒数
                . sprintf('%02d', rand(0, 99)); // 随机值
        return $orderSN;
    }

    /**
     * 生成订单快照
     */
    private function snapOrder($orderStatus) {
        $snap = [
            'orderPrice' => 0, // 总价
            'totalCount' => 0, // 总数
            'pStatus' => [],
            'snapAddress' => null,
            'snapName' => null,
            'snapImg' => null,
        ];

        $snap['orderPrice'] = $orderStatus['orderPrice'];
        $snap['totalCount'] = $orderStatus['totalCount'];
        $snap['pStatus'] = $orderStatus['pStatusArray'];
        $snap['snapAddress'] = $this->getUserAddress();
        $snap['snapName'] = $this->products[0]['name'];
        if (count($this->products) > 1) {
            $snap['snapName'] .= '等';
        }
        $snap['snapImg'] = $this->products[0]['main_img_url'];
        return $snap;
    }

    private function getUserAddress() {
        $userAddress = UserAddress::where('user_id', '=', $this->uid)
                ->find();
        if (!$userAddress) {
            throw new UserException([
                'msg' => '用户收货地址不存在',
                'errorCode' => 60001,
            ]);
        }
        return $userAddress->toArray();
    }

    private function getOrderStatus() {
        $status = [
            'pass' => true,
            'orderPrice' => 0,
            'totalCount' => 0,
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
            $status['totalCount'] += $productStatus['count'];
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
    private function getProductsByOrder($orderProducts) {
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