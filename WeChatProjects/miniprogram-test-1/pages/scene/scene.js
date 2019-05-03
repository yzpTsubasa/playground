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
    ],
    currSceneIndex: 0,
    cfg: {
      canvasWrapper: null,
      photo: {

      }
    },
  },

  onLoad() {
    this.data.uploadImgPath = app.globalData.uploadImgPath;
    
    this.setCanvasSize();
	  // var ctx = wx.createCanvasContext("scene", this);
	  // ctx.drawImage(this.data.uploadImgPath, 0, 0);
    // ctx.draw();
    this.drawScene(this.data.currSceneIndex);
  },

  setCanvasSize() {
    var cfg = this.data.cfg;
    var uploadImgPath = this.data.uploadImgPath;
    wx.createSelectorQuery().select(".scene-editor").boundingClientRect(function(canvas){
      console.log(canvas);
      cfg.canvasWrapper = canvas;
      wx.getImageInfo({
        src: uploadImgPath,
        success: function(imgInfo) {
          console.log(imgInfo);
          cfg.photo.path = imgInfo.path;
          var originalHeight = cfg.photo.originalHeight = imgInfo.height;
          var originalWidth = cfg.photo.originalWidth = imgInfo.width;
          // 图片更宽，则，画布宽度与容器宽度相等
        if (originalWidth / originalHeight >= cfg.canvasWrapper.width / cfg.canvasWrapper.height) {
          cfg.canvasWidth = cfg.canvasWrapper.width;
          cfg.canvasHeight = cfg.canvasWrapper.height * originalWidth / originalHeight; 
          console.log(cfg);
        }

        }
      });
    }).exec();
    
  },

  onSaveClick() {
    
  },

  drawScene(index) {
    this.setData({
      currSceneIndex: index
    });
    var ctx = wx.createCanvasContext("scene", this);
    var imgPath = this.data.covers[index].path;
    ctx.drawImage(this.data.uploadImgPath, 0, 0);
	  ctx.drawImage(imgPath, 0, 0);
	  ctx.draw();
  },

  onTapSceneItem(event) {
    var selectedIndex = event.currentTarget.dataset.index;
    console.dir(event);
    console.log("onTapSceneItem", selectedIndex);
    this.drawScene(selectedIndex);
  }
})