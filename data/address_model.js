import {Base} from '../utils/base.js';

export class Address extends Base{
  getAddressFullFormated(res) {
      let province = res.province || res.provinceName;
      let city = res.city || res.cityName;
      let county = res.county || res.countyName || res.country;
      let detail = res.detail || res.detailInfo;
      
      let fullAddress = city + county + detail;
      if (province && province.indexOf('市') != province.length - 1) {
          fullAddress = province + fullAddress;
      }
      return fullAddress;
  }

  summitAddress(data, callback) {
    var dataParams = {
      name: data.userName,
      province: data.provinceName,
      city: data.cityName,
      country: data.countyName,
      mobile: data.telNumber,
      detail: data.detailInfo,
    };
    this.request({
      url: 'address',
      method: 'POST',
      data: dataParams,
      success: function(res) {
        callback && callback(true, res);
      },
      fail: function(res) {
        callback && callback(false, res);
      }
    })
  }

  getAddress(callback) {
    this.request({
      url: 'address',
      method: 'GET',
      success: function(res) {
        callback && callback(res);
      },
      fail: function(res) {
        
      }
    })
  }
}