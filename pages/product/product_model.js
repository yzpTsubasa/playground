import {Base} from '../../utils/base.js';

export class Product extends Base {

    getProductDetail(id, callback) {
        this.request({
            url: `product/${id}`,
            method: 'GET',
            callback: ret => {
                callback && callback(ret);
            }
        })
    }

}