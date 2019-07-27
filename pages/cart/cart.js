// pages/cart/cart.js
import {Singleton, AppEvent} from '../../utils/singleton';

var cart = Singleton.Cart;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectCount: 0,
    selectPrice: 0,
    allCount: 0,
    allPrice: 0,
    cartDatas: [],
    selectCartDatas: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    cart.on(AppEvent.CHANGE, this.updateData, this);
    // 在onShow中处理，以便于每次显示时刷新
    this.updateData();
  },

  updateData: function() {
    var cartViewData = cart.getCartViewData();
    this.setData(cartViewData);
  },

  // 商品选择状态改变
  onProductSelectChange: function(event) {
    var values = event.detail.value.map(v => parseInt(v));
    cart.setSelect(values);
  },

  onProductSelectTap: function(event) {
    var id = cart.getDataFromEventDataset(event, 'id', true);
    cart.toggleSelect(id);
  },

  onSelectAllChange: function(event) {
    // var values = event.detail.value.map(v => parseInt(v));
    if (this.data.cartDatas.length) {
      if (this.data.selectCartDatas.length < this.data.cartDatas.length) { 
        cart.setAllSelect();
      } else {
        cart.setAllUnselect();
      }
    }
  },

  onProductSub: function(event) {
    var id = cart.getDataFromEventDataset(event, 'id', true);
    var count = cart.getProductCount(id);
    if (count <= 1) {
      cart.showModel('是否删除商品?', () => {
        cart.addProductCount(id, -1);
      });
    } else {
      cart.addProductCount(id, -1)
    }
  },

  onProductAdd: function(event) {
    var id = cart.getDataFromEventDataset(event, 'id', true);
    cart.addProductCount(id, 1)
  },

  onProductRemove: function(event) {
    var id = cart.getDataFromEventDataset(event, 'id', true);
    cart.showModel('是否删除商品?', () => {
      cart.removeProductCount(id)
    });
  },
  /**
   * 提交订单
   * @param {*} event 
   */
  onSummitOrder: function(event) {
    wx.navigateTo({
      url: `/pages/order/order?price=${this.data.selectPrice}&from=cart`,
    });
  },

  onGoHomeTap: function(event) {
    wx.switchTab({
      url: '/pages/home/home',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    cart.save();
    cart.off(AppEvent.CHANGE, this.updateData, this);
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