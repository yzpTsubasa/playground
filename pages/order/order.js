// pages/order/order.js
import {Singleton, AppEvent} from '../../utils/singleton';

var cart = Singleton.Cart;
var address = Singleton.Address;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 0,
    from: '',
    orderStatus: 0,
    addressInfo: null, // 地址信息
    basicInfo: null, // 服务器下发的订单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price: parseFloat(options.price),
      from: options.from,
      products: cart.getCartDatas(true),
    });
  },

  onEditAddress(event) {
    var that = this;
    wx.chooseAddress({
      success (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          detailInfo: address.getFullAddress(res),
        };
        that.setData({
          addressInfo: addressInfo,
        });
      }
    });
  },

  onAddNewAddress(event) {
    this.onEditAddress(event);
  },

  onPay(event) {

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