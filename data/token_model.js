import {Base} from '../utils/base.js';

export class Token extends Base {
    /**
     * 验证token
     */
    verify() {
        var token = this.getToken();
        if (!token) {
            this.getTokenFromServer(token => {

            });
            return;
        }
        this._verifyTokenFromServer(token);
    }

    getTokenFromServer(callback) {
        wx.login({
            success: res => {
                this.request({
                    url: 'token/user',
                    method: 'POST',
                    data: {
                        code: res.code,
                    },
                    success: data => {
                        wx.setStorageSync('token', data.token);
                        callback && callback(data.token);
                    }
                })
            }
        })
    }

    _verifyTokenFromServer(token, callback) {
        this.request({
            url: 'token/verify',
            method: 'POST',
            data: {
                token: token,
            },
            success: data => {
                if (!data.isValid) {
                    this.getTokenFromServer();
                }
            },
            fail: res => {
                
            }
        })
    }
}