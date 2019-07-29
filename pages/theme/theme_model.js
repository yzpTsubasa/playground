import {Base} from '../../utils/base.js';

export class Theme extends Base {

    getThemeDetail(id, callback) {
        this.request({
            url: `theme/${id}`,
            method: 'GET',
            success: ret => {
                callback && callback(ret);
            }
        })
    }

}