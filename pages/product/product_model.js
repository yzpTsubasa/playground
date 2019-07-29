import {Base} from '../../utils/base.js';

export class Product extends Base {

    getProductDetail(id, callback) {
        this.request({
            url: `product/${id}`,
            method: 'GET',
            success: ret => {
                callback && callback(ret);
            }
        })
    }

}