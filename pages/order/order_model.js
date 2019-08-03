import {Base} from '../../utils/base.js';

export class Order extends Base{

  storageKeyName = 'new_order';

  createOrder(products, callback) {
    this.request({
      url: 'order',
      method: 'POST',
      data: {
        products: products
      },
      success: data => {
        wx.setStorageSync(this.storageKeyName, true); // 保存新订单标识到本地
        callback && callback(data);
      },
    });
  }

  createPrepay(order_id, callback) {
    this.request({
      url: 'pay/preorder',
      method: 'POST',
      data: {
        id: order_id,
      },
      success: data => {
        var timeStamp = data.timeStamp;
        callback && callback(data);
        console.log(data);
      }
    });
  }

  pay(paymentData, callback) {
    var timeStamp = paymentData.timeStamp;
    if (timeStamp) { // 可以支付
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: paymentData.nonceStr,
        package: paymentData.package,
        signType: paymentData.signType,
        paySign: paymentData.paySign,
        success: data => { // 微信支付成功
          callback && callback(true);
          console.log(data);
        },
        fail: data => { // 微信支付失败
          callback && callback(false);
          console.log(data);
        }
      });
    }
  }

  isNewOrder() {
    return wx.getStorageSync(this.storageKeyName);
  }

  getOrderById(id, callback) {
    this.request({
      url: `order/${id}`,
      method: 'GET',
      success: data => {
        callback && callback(data);
      }
    })
  }

  getOrderSummary(callback) {
    this.request({
      url: 'order/summary',
      data: {
        page: 1,
        size: 10
      },
      success: data => {
        callback && callback(data);
      }
    });
  }
}