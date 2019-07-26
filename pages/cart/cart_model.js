import {Base} from '../../utils/base.js';

export class CartEvent {
  static CHANGE = 'change';
}

export class Cart extends Base {
  storageKeyName = "cart1";
  _cartDatas = this._getLocalCardDatas();
  
  /**
   * 添加到购物车
   * 
   * @param {object} item 
   * @param {number} count 
   */
  add(item, count) {
    var cartDatas = this.getCartDatas();
    var itemData = this.getItemData(item, cartDatas);
    itemData.count += count;
    this.onCartDataChange();
  }

  save() {
    wx.setStorageSync(this.storageKeyName, this.getCartDatas());
  }

  onCartDataChange() {
    this.emit(CartEvent.CHANGE, this.getCartDatas());
  }

  /**
   * @returns {Array}
   */
  _getLocalCardDatas() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = [];
    }
    return res;
  }

  /**
   * @returns {Array}
   */
  getCartDatas(isSelected) {
    return this._cartDatas.filter((data) => {
      return !isSelected || data.selected;
    });
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
      selectCartDatas: [],
      cartDatas: [],
    };
    var datas = this.getCartDatas();
    datas.forEach(data => {
      if (data.selected) {
        result.selectCount += data.count;
        result.selectPrice = this.Decimal.add(result.selectPrice, this.Decimal.mul(data.count, data.price)).toNumber();
        result.selectCartDatas.push(data);
      }
      result.allPrice = this.Decimal.add(result.allPrice, this.Decimal.mul(data.count, data.price)).toNumber();
      result.allCount += data.count;
      result.cartDatas.push(data);
    });
    return result;
  }

  /**
   * 
   * @param {*} isSelected 是否只选择选中的
   */
  getAllCount(isSelected) {
    var datas = this.getCartDatas();
    return datas.reduce((a, b) => this.Decimal.add(a, (!isSelected || b.selected ? b.count : 0)).toNumber(), 0);
  }

  getAllPrice(isSelected) {
    var datas = this.getCartDatas();
    return datas.reduce((a, b) => this.Decimal.add(a, (!isSelected || b.selected ? b.count * b.price : 0)).toNumber(), 0);
  }

  toggleSelect(id) {
    var datas = this.getCartDatas();
    datas.forEach(data => {
      if (id == data.id) {
        data.selected = !data.selected;
      }
    });
    this.onCartDataChange();
  }

  /**
   * 设置选中状态
   * @param {*} ids 
   */
  setSelect(ids) {
    var datas = this.getCartDatas();
    datas.forEach(data => {
      data.selected = ids && ids.indexOf(data.id) != -1;
    });
    this.onCartDataChange();
  }

  setAllSelect() {
    var datas = this.getCartDatas();
    datas.forEach(data => {
      data.selected = true;
    });
    this.onCartDataChange();
  }

  setAllUnselect() {
    var datas = this.getCartDatas();
    datas.forEach(data => {
      data.selected = false;
    });
    this.onCartDataChange();
  }

  addProductCount(id, delta) {
    var datas = this.getCartDatas();
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
    this.onCartDataChange();
  }

  removeProductCount(id) {
    var datas = this.getCartDatas();
    datas.every((data, index) => {
      if (data.id == id) {
        datas.splice(index, 1);
        return false;
      }
      return true;
    });
    this.onCartDataChange();
  }

  getProductCount(id) {
    var datas = this.getCartDatas();
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