// pages/order/order.js
import {Singleton, AppEvent, Order} from '../../utils/singleton';

var cart = Singleton.Cart;
var address = Singleton.Address;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 0,
    from: '',
    id: 0, // 订单id
    orderStatus: 0,
    addressInfo: null, // 地址信息
    basicInfo: null, // 服务器下发的订单信息
    products: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price: options.price && parseFloat(options.price) || 0,
      from: options.from || '',
      id: options.id || 0,
      products: cart.getCartDatas(true),
    });
    address.getAddress(data => {
      data.fullAddress = address.getAddressFullFormated(data);
      this.setData({
        addressInfo: data
      });
    });
  },

  onEditAddress(event) {
    var that = this;
    wx.chooseAddress({
      success (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          fullAddress: address.getAddressFullFormated(res),
        };
        that.setData({
          addressInfo: addressInfo,
        });
        address.summitAddress(res, flag => {
          if (!flag) {
            address.showModel('操作提示', '地址信息更新失败', ()=> {
              wx.navigateTo({
                url: '/pages/my/my'
              });
            });
          }
        });
      }
    });
  },

  onAddNewAddress(event) {
    this.onEditAddress(event);
  },

  onPay(event) {
    if (!this.data.addressInfo) {
      cart.showModel('操作提示', '请填写您的收货地址');
      return;
    }
    if (this.data.orderStatus == 0) {
      this._firstTimePay(); // 还未在服务器创建订单
    } else {
      this._oneMoresTimePay();  // 已经在服务器创建订单
    }
  },

  _firstTimePay() {
    var products = this.data.products;
    var orderProducts = products.map(product => {
      return {
        product_id: product.id,
        count: product.count,
      };
    });
    Singleton.Order.createOrder(orderProducts, data => {
      if (data.pass) { // 订单创建完成
        var id = data.order_id;
        this.data.id = id;
        this.data.fromCartFlag = false;
        this._execPay(id);
      } else {
        this._orderFail(data);
      }
    });
  },

  _oneMoresTimePay() {
    this._execPay(this.data.id);
  },

  // 订单创建失败
  _orderFail(data) {
    /** @type {Array} */
    var names = data.pStatusArray.map(status => {
      if (status && status.name) {
        if (status.name.length > 15) {
          return status.name.substr(0, 12) + '...';
        } else {
          return status.name;
        }
      }
      return '';
    });
    var tips = names.slice(0, 2).join('、');
    if (names.length > 2) {
      tips += ' 等';
    }
    tips += ' 缺货';
    cart.showModel('下单失败', tips);
  },

  // 开始付款
  _execPay(id) {
    Singleton.Order.createPrepay(id, data => {
      var timeStamp = data.timeStamp;
      if (!timeStamp) { // 创建预支付失败
        // 
      } else {
        this.deleteProdcutsFromCart(); // 从购物车中删除已创建的预支付订单中的商品
        Singleton.Order.pay(data, data => {
          if (!data) { // 微信支付失败
            wx.navigateTo({
              url: `/pages/pay_result/pay_result?id=${id}&paySuccess=${data ? 1 : 0}$from=order`
            });
          }
        });
      }
    });
  },

  deleteProdcutsFromCart() {
    cart.deleteProducts(this.data.products);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var id = this.data.id;
    if (id) {
      Singleton.Order.getOrderById(id, data => {
        var addressInfo = data.snap_address;
        addressInfo.totalDetail = address.getAddressFullFormated(addressInfo);
        
        this.setData({
          orderStatus: data.status,
          products: data.snap_items,
          price: data.total_price,
          basicInfo: {
            orderTime: data.create_time,
            orderNo: data.order_no
          },
          addressInfo: addressInfo
        });
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})