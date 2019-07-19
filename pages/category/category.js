// pages/category/category.js

import {Category} from './category_model';

var category = new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_index: 0,
    select_id: null,
    categoryTypes: [],
    categoryProducts: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData() {
    var that = this;
    category.getCategoryType(ret => {
      that.setData({
        categoryTypes: ret,
        select_id: ret[that.data.select_index].id,
      })
      that._loadCategoryProducts(this.data.select_id);
    });
  },

  _loadCategoryProducts(id) {
    var that = this;
    category.getCategoryProducts(id, ret => {
      that.data.categoryProducts[id] = ret;
      that.setData({
        categoryProducts: that.data.categoryProducts
      });
    });
  },

  onCategoryTypeTap(event) {
    var id = category.getEventData(event, 'id');
    var index = category.getEventData(event, 'index');
    this.setData({
      select_id: id,
      select_index: index,
    });
    this._loadCategoryProducts(id);
  },

  onProductsItemTap(event) {
    var id = category.getEventData(event, 'id');
    wx.navigateTo({
      url: `/pages/product/product?id=${id}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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