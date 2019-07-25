// pages/cart/cart.js

import {Cart, CartEvent} from './cart_model';

var cart = new Cart();

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
    cart.on(CartEvent.CHANGE, this.updateData, this);
    // 在onShow中处理，以便于每次显示时刷新
    this.updateData();
  },

  updateData: function() {
    this.setData({
      selectCount: cart.getAllCount(true),
      allCount: cart.getAllCount(false),
      selectPrice: cart.getAllPrice(true),
      allPrice: cart.getAllPrice(false),
      cartDatas: cart.getLocalCardDatas(),
    });
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
    if (this.data.allCount) {
      if (this.data.selectCount < this.data.allCount) { 
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

  onSummitOrder: function(event) {
    
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
    cart.off(CartEvent.CHANGE, this.updateData, this);
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