import {Base} from '../utils/base.js';

export class Token extends Base {
    code;
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
        if (!this.code) {
            wx.login({
                success: res => {
                    this.code = res.code;
                    this._getTokenByCode(this.code);
                },
                fail: res => {
                    console.log(res.errMsg);
                }
            })
        } else {
            this._getTokenByCode(this.code);
        }
    }

    _getTokenByCode(code, callback) {
        this.request({
            url: 'token/user',
            method: 'POST',
            data: {
                code: code,
            },
            success: data => {
                if (!data.error_code) {
                    wx.setStorageSync('token', data.token);
                    callback && callback(data.token);
                } else {
                    this.showModel('登录信息失效，请尝试重进页面');
                }
            },
            fail: res => {
                this.showModel('登录信息失效，请尝试重进页面');
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