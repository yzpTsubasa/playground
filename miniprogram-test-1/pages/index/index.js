//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: app.globalData.name
  },
  onUploadBtnClick() {
    app.globalData.name = "Beginner";
    this.setData({
      name: app.globalData.name
    });

    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.dir(res);
		app.globalData.uploadImgPath = res.tempFilePaths[0];

        wx.navigateTo({
          url: '/pages/scene/scene',
        })
      },
      fail: function(res) {
        console.log(res.errMsg);
      },
      complete: function(res) {
        console.log(res.errMsg);
      }
    })
  },
  onNavigateBtnClick() {
    wx.navigateTo({
      url: '/pages/second/second',
    });
    // wx.redirectTo({
    //   url: '/pages/second/second',
    // });
  }
})
