// pages/product.js
import {Product} from './product_model';

var prodcut = new Product();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    product: {},
    select_range: [],
    select_index: 0,
    select_count: 1,
    detail_tabs: ['商品详情', '产品参数', '售后保障'],
    tab_index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = +options.id;
    var select_range = [];
    for (var i = 0; i < 10; ++i) {
      select_range.push(i + 1);
    }
    this.setData({
      select_range: select_range
    });
    this._loadData();
  },

  _loadData() {
    var id = this.data.id;
    prodcut.getProductDetail(id, ret => {
      this.setData({
        product: ret
      });
    });
  },

  onCountChange(event) {
    this.setData({
      select_index: event.detail.value,
      select_count: this.data.select_range[event.detail.value],
    });
  },

  onTabTap(event) {
    this.setData({
      tab_index: prodcut.getEventData(event, 'index'),
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