
import { Tool } from './tool.js';
import { Config } from './config.js';
import Decimal from './decimal.js';
import {Singleton} from './singleton';

export class AppEvent {
  static CHANGE = 'change';
}

export class Base {
  eventMap = {};
  baseURL = Config.BASE_URL;
  Decimal = Decimal;

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
     return this._request(param, 1);
  }

  /**
   * 
   * @param {RequestParam} param
   * @param {*} retryTimes 重试次数
   */
  _request(param, retryTimes) {
    var url = Tool.formatParams(this.baseURL + param.url, param.urlFormatParams);
    var data = param.data;
    var method = param.method || 'GET';
    var header = param.header || {};
    header['content-type'] = 'application/json';
    header['token'] = this.getToken();
    var success = param.success;
    var fail = param.fail;
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: ret => {
        if (ret.statusCode - ret.statusCode % 100 == 200) {
          success && success(ret.data);
        } else {
          switch (ret.statusCode) {
            case 401: // 未授权
              console.log('Token失效');
              // Singleton.Token.getTokenFromServer();
              if (retryTimes > 0) {
                  Singleton.Token.getTokenFromServer(token => {
                    this._request(param, --retryTimes);
                  });
              }
              
              break;
            default:
              fail && fail(ret);
              break;
          }
        }
      },
      fail: function (ret) {
        console.log(ret);
        fail && fail(ret);
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