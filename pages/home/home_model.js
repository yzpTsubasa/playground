import {Base} from '../../utils/base.js';

export class Home extends Base{
  getBannerData(id, callback) {
    this.request({url: 'banner/{0}', urlFormatParams: [id], data: null, callback: function(data){
      callback && callback(data.items);
    }});
  }
}