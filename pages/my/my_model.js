import {Base} from '../../utils/base.js';

export class My extends Base{
  getUserInfo(callback) {
    // wx.login({
    //   success: data => {
        // 无效
        // wx.getUserInfo({
        //   success: data => {
        //     callback && callback(data.userInfo);
        //   },
        //   fail: data => {
        //     callback && callback({
        //       avatarUrl: '../../imgs/icon/user@default.png',
        //       nickName: '零售小贩',
        //     })
        //   }
        // });
    //   }
    // });
  }
}