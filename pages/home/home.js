import {Singleton} from '../../utils/singleton';

var home = Singleton.Home;

Page({

    /**
     * 页面的初始数据
     */
    data: {
      banner_datas: [],
      theme_datas: [],
      product_datas: [],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this._loadData();
    },

    _loadData: function() {
      var id = 1;
      var that = this;
      home.getBannerData(id, ret => {
        that.setData({banner_datas: ret});
      });
      home.getThemeData(ret => {
        that.setData({
          theme_datas: ret
        })
      });
      home.getProductData(10, ret => {
        that.setData({
          product_datas: ret
        });
      });
    },

    onThemesItemTap(event) {
      var id = home.getDataFromEventDataset(event, 'id');
      var name = home.getDataFromEventDataset(event, 'name');
      wx.navigateTo({
        url: `/pages/theme/theme?id=${id}&name=${name}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },

    onProductsItemTap(event) {
      var id = home.getDataFromEventDataset(event, 'id');
      wx.navigateTo({
        url: `/pages/product/product?id=${id}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },

    onBannerItemTap(event) {
      var id = home.getDataFromEventDataset(event, 'id');
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