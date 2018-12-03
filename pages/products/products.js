// pages/products/products.js
var arrMsg=[]
var priceNum=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrMsg:[],
    length:0,
    shopMsg:[],
    priceNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
// 添加购物车
  addShopMsg(e){
    var that=this
    var goods=that.data.shopMsg
    var arr = wx.getStorageSync('cart') || [];
    for (var i = 0; i < arr.length; i++) {
      priceNum = priceNum + parseInt(arr[i].price)
    }
    // 将数据push到数据
    arr.push(goods);
    // 最后，把购物车数据，存放入缓存  
    that.setData({
      length: arr.length,
      priceNum: parseInt(priceNum) + parseInt(goods.price)
    })
    try {
      wx.setStorageSync('cart', arr)
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      return;
    } catch (e) {
      console.log(e)
    }
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
    // 获取购物车长度 数量
    var that = this
    var arr = wx.getStorageSync('cart') || [];
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
        priceNum = priceNum + parseInt(arr[i].price)
    }
    // 获取要展示的数据信息
    arrMsg = wx.getStorageSync('goodsMsg') || [];
    console.log(arrMsg)
    var shopMsg={
      id:arrMsg[0].id,
      imgUrl:arrMsg[0].imgUrl,
      name: arrMsg[0].name,
      price: arrMsg[0].price
    }
    var that=this

    that.setData({
      arrMsg: arrMsg,
      shopMsg: shopMsg,
      length: arr.length,
      priceNum: priceNum
    })
    
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