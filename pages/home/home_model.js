import {Base} from '../../utils/base.js';

export class Home extends Base{

  getBannerData(id, callback) {
    this.request({
      url: 'banner/{0}', 
      urlFormatParams: [id], 
      success: function(data){
        callback && callback(data.items);
      }
    });
  }

  getThemeData(callback) {
    this.request({
      url: 'theme', 
      data: {
        ids: "1,2,3"
      }, 
      success: function(ret){
        callback && callback(ret);
      }
    });
  }

  getProductData(count, callback) {
    this.request({
      url: 'product/recent',
      data: {
        count: count || 3
      },
      success: function(ret) {
        callback && callback(ret);
      }
    });
  }
}