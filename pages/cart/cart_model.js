import {Base} from '../../utils/base.js';

export class Cart extends Base {
  storageKeyName = "cart1";
  
  /**
   * 添加到购物车
   * 
   * @param {object} item 
   * @param {number} count 
   */
  add(item, count) {
    var cartData = this.getLocalCardData();
    var itemData = this.getItemData(item, cartData);
    itemData.count += count;
    wx.setStorageSync(this.storageKeyName, cartData);
  }

  getLocalCardData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  }

  getItemData(target, arr) {
    for (var i = 0, len = arr && arr.length; i < len; ++i) {
      var item = arr[i];
      if (item && item.id == target.id) {
        return item;
      }
    }
    var result = target;
    result.count = 0;
    arr.push(result);
    return result;
  }

  getProductCount() {
    var datas = this.getLocalCardData();
    return datas.reduce((a, b) => a + b.count, 0);
  }

}