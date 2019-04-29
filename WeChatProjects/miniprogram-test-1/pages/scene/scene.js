// pages/second/second.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    covers: [
      {path: "../../assets/emoji1.png", id: 1},
      {path: "../../assets/emoji2.png", id: 2},
      {path: "../../assets/emoji3.png", id: 3},
      {path: "../../assets/emoji4.png", id: 4},
      {path: "../../assets/emoji5.png", id: 5},
      {path: "../../assets/emoji6.png", id: 6},
      {path: "../../assets/emoji7.png", id: 7},
    ]
  },
  onLoad() {
	  this.data.uploadImgPath = app.globalData.uploadImgPath;
	  var ctx = wx.createCanvasContext("scene", this);
	  ctx.drawImage(this.data.uploadImgPath, 0, 0, 200, 200);
	  ctx.draw();
  },
  onSaveClick() {
    
  },
  onTapSceneItem(event) {
    console.dir(event);
    console.log("onTapSceneItem", event.currentTarget.dataset.id);
  }
})