import {Base} from '../../utils/base.js';

export class CartEvent {
  static CHANGE = 'change';
}

export class Cart extends Base {
  storageKeyName = "cart1";
  
  /**
   * 添加到购物车
   * 
   * @param {object} item 
   * @param {number} count 
   */
  add(item, count) {
    var cartDatas = this.getLocalCardDatas();
    var itemData = this.getItemData(item, cartDatas);
    itemData.count += count;
    this.setLocalCartDatas(cartDatas);
  }

  setLocalCartDatas(cartDatas) {
    wx.setStorageSync(this.storageKeyName, cartDatas);
    this.emit(CartEvent.CHANGE, cartDatas);
  }

  /**
   * @returns {Array}
   */
  getLocalCardDatas() {
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
    result.selected = true; // 默认为选中
    arr.push(result);
    return result;
  }

  /**
   * @returns {CartViewData}
   */
  getCartViewData() {
    var result = {
      selectCount: 0,
      allCount: 0,
      selectPrice: 0,
      allPrice: 0,
      cartDatas: null,
    };
    var datas = this.getLocalCardDatas();
    datas.forEach(data => {
      if (data.selected) {
        result.selectCount += data.count;
        result.selectPrice = this.Decimal.add(result.selectPrice, this.Decimal.mul(data.count, data.price)).toNumber();
      }
      result.allPrice = this.Decimal.add(result.allPrice, this.Decimal.mul(data.count, data.price)).toNumber();
      result.allCount += data.count;
    });
    result.cartDatas = datas;
    return result;
  }

  /**
   * 
   * @param {*} isSelected 是否只选择选中的
   */
  getAllCount(isSelected) {
    var datas = this.getLocalCardDatas();
    return datas.reduce((a, b) => this.Decimal.add(a, (!isSelected || b.selected ? b.count : 0)).toNumber(), 0);
  }

  getAllPrice(isSelected) {
    var datas = this.getLocalCardDatas();
    return datas.reduce((a, b) => this.Decimal.add(a, (!isSelected || b.selected ? b.count * b.price : 0)).toNumber(), 0);
  }

  toggleSelect(id) {
    var datas = this.getLocalCardDatas();
    datas.forEach(data => {
      if (id == data.id) {
        data.selected = !data.selected;
      }
    });
    this.setLocalCartDatas(datas);
  }

  /**
   * 设置选中状态
   * @param {*} ids 
   */
  setSelect(ids) {
    var datas = this.getLocalCardDatas();
    datas.forEach(data => {
      data.selected = ids && ids.indexOf(data.id) != -1;
    });
    this.setLocalCartDatas(datas);
  }

  setAllSelect() {
    var datas = this.getLocalCardDatas();
    datas.forEach(data => {
      data.selected = true;
    });
    this.setLocalCartDatas(datas);
  }

  setAllUnselect() {
    var datas = this.getLocalCardDatas();
    datas.forEach(data => {
      data.selected = false;
    });
    this.setLocalCartDatas(datas);
  }

  addProductCount(id, delta) {
    var datas = this.getLocalCardDatas();
    datas.every((data, index) => {
      if (data.id == id) {
        data.count += delta;
        if (data.count <= 0) {
          datas.splice(index, 1);
        }
        return false;
      }
      return true;
    });
    this.setLocalCartDatas(datas);
  }

  removeProductCount(id) {
    var datas = this.getLocalCardDatas();
    datas.every((data, index) => {
      if (data.id == id) {
        datas.splice(index, 1);
        return false;
      }
      return true;
    });
    this.setLocalCartDatas(datas);
  }

  getProductCount(id) {
    var datas = this.getLocalCardDatas();
    var result = 0;
    datas.every(data => {
      if (data.id == id) {
        result = data.count || 0;
        return false;
      }
      return true;
    });
    return result;
  }
}