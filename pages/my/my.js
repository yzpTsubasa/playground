
import {Singleton} from '../../utils/singleton';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    orders: [],
    page: 0,
    size: 5,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function() {
    Singleton.My.getUserInfo(data => {
      this.setData({
        userInfo: data
      });
    });

    Singleton.Address.getAddress(data => {
      this.setData({
        addressInfo: data,
        loadingHidden: true,
      });
    });

    this._loadOrders();
  },

  _loadOrders() {
    if (this.data.hasMore) {
      ++this.data.page;
      Singleton.Order.getOrderSummary(this.data.page, this.data.size, data => {
        if (data.data.length == 0) {
          this.data.hasMore = false;
          Singleton.Base.showToast('没有更多订单了');
          return;
        }
        var datas = this.data.orders.concat(data.data);
        this.setData({
          orders: datas
        });
      });
    } else {
      Singleton.Base.showToast('没有更多订单了');
    }
  },

  onAddressEditTap: function() {
    Singleton.Address.chooseAndSummit(addressInfo => {
      this.setData({
        addressInfo: addressInfo,
      })
    });
  },

  showOrderDetailInfo: function(event) {
    var id = Singleton.Base.getDataFromEventDataset(event, 'id', true);
    wx.navigateTo({
      url: `/pages/order/order?id=${id}&from=my`
    });
  },

  onPay: function(event) {
    var id = Singleton.Base.getDataFromEventDataset(event, 'id', true);
    Singleton.Order.createPrepay(id, data => {
      var timeStamp = data.timeStamp;
      if (!timeStamp) { // 创建预支付失败
        // 
      } else {
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
    this._loadOrders();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})