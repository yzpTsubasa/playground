import {Base} from '../../utils/base.js';

export class Cart extends Base {
  storageKeyName = "cart";
  
  /**
   * 添加到购物车
   * 
   * @param {object} item 
   * @param {number} counts 
   */
  add(item, counts) {
    var cartData = this.getLocalCardData();
    var itemData = this.getItemData(item.id, cartData);
    itemData.counts += counts;
    wx.setStorageSync(this.storageKeyName, cartData);
  }

  getLocalCardData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  }

  getItemData(id, arr) {
    for (var i = 0, len = arr && arr.length; i < len; ++i) {
      var item = arr[i];
      if (item && item.id == id) {
        return item;
      }
    }
    var result;
    result = {id: id, counts: 0, selectStatus: true}; // 默认选中
    arr.push(result);
    return result;
  }

}