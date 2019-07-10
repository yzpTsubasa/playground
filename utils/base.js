
import { Tool } from './tool.js';
import { Config } from './config.js';

export class Base {
  baseURL = Config.BASE_URL;

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

  getEventData(event, key) {
    return event && event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset[key];
  }
}