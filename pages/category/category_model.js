import {Base} from '../../utils/base.js';

export class Category extends Base{
  getCategoryType(callback) {
    this.request({
      url: 'category/all', 
      success: function(ret){
        callback && callback(ret);
      }
    });
  }

  getCategoryProducts(id, callback) {
    this.request({
      url: 'product/by_category?id={0}', 
      urlFormatParams: [id],
      success: function(ret){
        callback && callback(ret);
      }
    });
  }
}