
import { Tool } from './tool.js';
import { Config } from './config.js';


export class Base {
  eventMap = {};
  baseURL = Config.BASE_URL;

  on(eventType, handler, thisArg) {
    var handlerObjs = this.eventMap[eventType];
    if (!handlerObjs) {
      handlerObjs = [];
      this.eventMap[eventType] = handlerObjs;
    }
    handlerObjs.push({
      eventType: eventType,
      handler: handler,
      thisArg: thisArg,
    });
  }

  off(eventType, handler, thisArg) {
    var handlerObjs = this.eventMap[eventType];
    if (!handlerObjs) {
      handlerObjs = [];
      this.eventMap[eventType] = handlerObjs;
    }
    for (var i = handlerObjs.length - 1; i >= 0; --i) {
      var handlerObj = handlerObjs[i];
      if (handlerObj.eventType == eventType && handlerObj.handler == handlerObj.handler && handlerObj.thisArg == thisArg) {
        handlerObjs.splice(i, 1);
      }
    }
  }

  emit(eventType, data) {
    var handlerObjs = this.eventMap[eventType];
    if (!handlerObjs) {
      handlerObjs = [];
      this.eventMap[eventType] = handlerObjs;
    }
    for (var i = 0; i < handlerObjs.length; ++i) {
      var handlerObj = handlerObjs[i];
      if (handlerObj.eventType == eventType) {
        handlerObj.handler.call(handlerObj.thisArg, data);        
      }
    }
  }

  /**
   * @param {RequestParam} param
   */
  request(param) {
     return this._request(param.url, param.data, param.header, param.header, param.callback, param.urlFormatParams);
  }

  _request(url, data, method, header, callback, urlFormatParams) {
    url = Tool.formatParams(this.baseURL + url, urlFormatParams);
    data;
    method = method || 'GET';
    header = header || {};
    header['content-type'] = 'application/json';
    header['token'] = this.getToken();
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (ret) {
        callback && callback(ret.data);
      },
      fail: function (ret) {
        console.log(ret);
      }
    })
  }

  getToken() {
    return wx.getStorageSync("token");
  }

  getDataFromEventDataset(event, key, isDigital) {
    var result = event && event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset[key];
    if (isDigital) {
      result = parseFloat(result);
    }
    return result;
  }

  showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      image: '',
      duration: 800,
      mask: false,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  }

  showModel(title, okHandler) {
    wx.showModal({
      title: title,
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          okHandler();
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
}