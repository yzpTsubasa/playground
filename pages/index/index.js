//index.js
//获取应用实例
const app = getApp()
var baseUrl = 'http://tsubasayeung.cn/api/v1';

function showTip(title, content) {
  wx.showModal({
    title: title || '',
    content: content || '',
    showCancel: false,
  });
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReqToken: function(e) {
    wx.request({
      url: baseUrl + '/token/user',
      method: 'post',
      data: {
        code: app.globalData.code,
      },
      success: function(res) {
        console.log(res.data);
        // app.globalData.token = res.data.token;
        var key = 'token';
        var data = res.data.token;
        wx.setStorageSync(key, data);
        showTip('申请令牌成功');
      },
      fail: function(res) {
        console.error(res);
        showTip('申请令牌失败');
      }
    })
  },
  onReqUpdateAddress: function(e) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl + '/address',
      header: {
        token: token
      },
      data: {
        name: 'TsubasaYeung',
        mobile: '13235918682',
        province: '福建',
        city: '福州',
        country: '中国',
        detail: '未来区远方路无穷号',
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data);
        showTip('更新地址成功');
      },
      fail: function(res) {
        console.log(res);
        showTip('更新地址失败');
      }
    });
  },
  onReqOrder: function(e) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl + '/order',
      header: {
        token: token
      },
      data: {
        products: [
          { product_id: 1, count: 4},
          { product_id: 2, count: 2},
          { product_id: 3, count: 5},
          { product_id: 5, count: 10},
        ]
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data);
        if (res.data.pass) {
          wx.setStorageSync('order_id', res.data.order_id);
          showTip('下单成功');
        } else {
          showTip('下单失败');
        }
      },
      fail: function(res) {
        console.log(res);
        showTip('下单失败');
      }
    });
  },
  onReqPrePay() {
    var token = wx.getStorageSync('token');
    var order_id = wx.getStorageSync('order_id');
    wx.request({
      url: baseUrl + '/pay/preorder',
      header: {
        token: token
      },
      data: {
        id: order_id
      },
      method: 'POST',
      success: function (res) {
        var preData = res.data;
        console.log(preData);
        wx.setStorageSync('preorder_data', preData);
        showTip('获取预支付信息成功');
      },
      fail: function (res) {
        console.log(res);
        showTip('获取预支付信息失败');
      }
    });
  },
  onReqPay() {
    var preData = wx.getStorageSync('preorder_data');
    if (!preData) {
      showTip('无预支付信息');
      return;
    }
    wx.requestPayment({
      timeStamp: preData.timeStamp.toString(),
      nonceStr: preData.nonceStr,
      package: preData.package,
      signType: preData.signType,
      paySign: preData.paySign,
      success: function (res) {
        console.log(res.data);
        showTip('支付成功');
      },
      fail: function (res) {
        console.error(res);
        showTip('支付失败', JSON.stringify(res));
      }
    });
  }
})
