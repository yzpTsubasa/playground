// pages/product.js
import {Singleton} from '../../utils/singleton';

var prodcut = Singleton.Product;
var cart = Singleton.Cart;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    product: {},
    select_range: [],
    select_index: 0,
    select_count: 1,
    cart_product_count: 0,
    detail_tabs: ['商品详情', '产品参数', '售后保障'],
    tab_index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = +options.id;
    var select_range = [];
    for (var i = 0; i < 10; ++i) {
      select_range.push(i + 1);
    }
    this.setData({
      select_range: select_range
    });
    this._loadData();
  },

  _loadData() {
    var id = this.data.id;
    prodcut.getProductDetail(id, ret => {
      this.setData({
        product: ret
      });
      if (!this.data.product.stock) {
        cart.showToast('暂时缺货');
      }
    });

    this.setData({
      cart_product_count: cart.getAllCount(),
    });
  },

  onCountChange(event) {
    this.setData({
      select_index: event.detail.value,
      select_count: this.data.select_range[event.detail.value],
    });
  },

  onTabTap(event) {
    this.setData({
      tab_index: prodcut.getDataFromEventDataset(event, 'index'),
    });
  },

  onCartTap(event) {
    wx.switchTab({
      url: '/pages/cart/cart',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  onAddCartBtnTap(event) {
    var tempObj = {};
    var product = this.data.product;
    tempObj.id = product.id;
    tempObj.name = product.name;
    tempObj.price = product.price;
    tempObj.main_img_url = product.main_img_url;
    cart.add(tempObj, this.data.select_count);
    cart.showToast('成功加入购物车');
    
    this.setData({
      cart_product_count: cart.getAllCount(),
    });

    this._flyToCartEffect(event);
  },

  /*加入购物车动效*/
  _flyToCartEffect:function(events){
    //获得当前点击的位置，距离可视区域左上角
    var touches=events.touches[0];
    var diff={
            x:'25px',
            y:25-touches.clientY+'px'
        },
        style='display: block;-webkit-transform:translate('+diff.x+','+diff.y+') rotate(350deg) scale(0)';  //移动距离
    this.setData({
        isFly:true,
        translateStyle:style
    });
    var that=this;
    setTimeout(()=>{
        that.setData({
            isFly:false,
            translateStyle:'-webkit-transform: none;',  //恢复到最初状态
            isShake:true,
        });
        setTimeout(()=>{
            var counts=that.data.cartTotalCounts+that.data.productCounts;
            that.setData({
                isShake:false,
                cartTotalCounts:counts
            });
        },200);
    },1000);
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})