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
    drawCfg: {
      x: 0,
      y: 0,
      scale: 0.5,
    },
    canvasTouch: {
      isTouching: false,
      beginPos: {x: 0, y: 0},
      endPos: {x: 0, y: 0},
    },
    readyFlag: 0,
    ReadyFlagType: {
      OriginalPhoto: 1,
      SelectCover: 2,
      ReadyForDraw: 4,
    }
  },

  onLoad() {
    this.resetReadyFlag();
    this.data.uploadImgPath = app.globalData.uploadImgPath;
    
    this.drawScene();
    this.doReadyForOriginalPhoto();
  },

  doReadyForSelectCover() {
    var coverData = this.data.covers[this.data.currSceneIndex];
    if (!coverData) {
      return;
    }
    if (coverData.width && coverData.height) {
      this.setReadyFlag(this.data.ReadyFlagType.SelectCover);
      return;
    }
    var that = this;
    wx.getImageInfo({
      src: coverData.path,
      success: function(imgInfo) {
        coverData.width = imgInfo.width;
        coverData.height = imgInfo.height;
        that.setReadyFlag(that.data.ReadyFlagType.SelectCover);
      }
    });
  },

  doReadyForOriginalPhoto() {
    var cfg = this.data.cfg;
    var uploadImgPath = this.data.uploadImgPath;
    var that = this;
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
            cfg.canvasHeight = cfg.canvasWrapper.width * originalHeight / originalWidth; 
          } else {
            cfg.canvasHeight = cfg.canvasWrapper.height;
            cfg.canvasWidth = cfg.canvasWrapper.height * originalWidth / originalHeight; 
          }
          console.log(cfg);
          that.setData({
            cfg: cfg
          });
          that.setReadyFlag(that.data.ReadyFlagType.OriginalPhoto);
        }
      });
    }).exec();
    
  },

  onSaveClick() {
    
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.cfg.canvasWidth,
      height: this.data.cfg.canvasHeight,
      destWidth: this.data.cfg.canvasWidth,
      destHeight: this.data.cfg.canvasHeight,
      canvasId: 'scene',
      success(res) {
        console.log(res.tempFilePath)
        // wx.saveFile({
        //   tempFilePath: res.tempFilePath,
        //   success(res) {
        //     const savedFilePath = res.savedFilePath;
        //     console.log("Save successfully", savedFilePath);
        //   }
        // })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
  },

  setReadyFlag(flag, value) {
    if (value == void 0) value = true;
    if (value) {
      this.data.readyFlag |= flag;
      this.__checkForReadyFlag();
    } else {
      this.data.readyFlag &= ~flag;
    }
  },

  resetReadyFlag() {
    this.data.readyFlag = 0;
  },

  drawScene(index) {
    if (index == void 0) index = this.data.currSceneIndex;
    this.setData({
      currSceneIndex: index
    });
    this.setReadyFlag(this.data.ReadyFlagType.ReadyForDraw);
  },

  __checkForReadyFlag() {
    var ReadyFlagType = this.data.ReadyFlagType;
    for (var flag in ReadyFlagType) {
      var checkFlag = ReadyFlagType[flag];
      if (!(checkFlag & this.data.readyFlag)) {
        console.warn("Not ready for " + flag);
        switch (checkFlag) {
          case ReadyFlagType.ReadyForDraw:
          break;
          case ReadyFlagType.OriginalPhoto:
            this.doReadyForOriginalPhoto();
          break;
          case ReadyFlagType.SelectCover:
            this.doReadyForSelectCover();
          break;
        }
        return;
      }
    }

    var ctx = wx.createCanvasContext("scene", this);
    var coverData = this.data.covers[this.data.currSceneIndex];
    var imgPath = coverData.path;
    ctx.drawImage(this.data.uploadImgPath, 0, 0, this.data.cfg.canvasWidth, this.data.cfg.canvasHeight);
    var scale = this.data.drawCfg.scale;
    var offx = this.data.canvasTouch.endPos.x - this.data.canvasTouch.beginPos.x;
    var offy = this.data.canvasTouch.endPos.y - this.data.canvasTouch.beginPos.y;
	  ctx.drawImage(imgPath, this.data.drawCfg.x + offx, this.data.drawCfg.y + offy, coverData.width * scale, coverData.height * scale);
	  ctx.draw();

  },

  onTapSceneItem(event) {
    var selectedIndex = event.currentTarget.dataset.index;
    console.dir(event);
    console.log("onTapSceneItem", selectedIndex);
    this.setReadyFlag(this.data.ReadyFlagType.SelectCover, false);
    this.drawScene(selectedIndex);
  },

  onTouchStart(event) {
    this.data.canvasTouch.isTouching = true;
    this.data.canvasTouch.beginPos.x = event.touches[0].x;
    this.data.canvasTouch.beginPos.y = event.touches[0].y;

    this.data.canvasTouch.endPos.x = event.touches[0].x;
    this.data.canvasTouch.endPos.y = event.touches[0].y;

    console.log(event);

    this.drawScene();
  },

  onTouchMove(event) {
    if (!this.data.canvasTouch.isTouching) {
      return;
    }
    this.data.canvasTouch.endPos.x = event.touches[0].x;
    this.data.canvasTouch.endPos.y = event.touches[0].y;

    this.drawScene();
  },

  onTouchEnd(event) {
    this.data.canvasTouch.isTouching = false;

    var offx = this.data.canvasTouch.endPos.x - this.data.canvasTouch.beginPos.x;
    var offy = this.data.canvasTouch.endPos.y - this.data.canvasTouch.beginPos.y;
    this.data.drawCfg.x += offx;
    this.data.drawCfg.y += offy;
    this.data.canvasTouch.beginPos.x = this.data.canvasTouch.endPos.x;
    this.data.canvasTouch.beginPos.y = this.data.canvasTouch.endPos.y;
  },

  onTouchCancel(event) {
    this.data.canvasTouch.isTouching = false;

  }
})