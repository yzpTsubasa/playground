import {Base} from '../../utils/base.js';

export class Address extends Base{
  getFullAddress(res) {
      let province = res.province || res.provinceName;
      let city = res.city || res.cityName;
      let county = res.county || res.countyName;
      let detail = res.detail || res.detailInfo;
      
      let fullAddress = city + county + detail;
      if (province && province.indexOf('市') != province.length - 1) {
          fullAddress = province + fullAddress;
      }
      return fullAddress;
  }
}