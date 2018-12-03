// pages/main/main.js
var loginTrueFalse = false
var userArr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainModels: [{
        imgUrl1: '../../public/icon/order.png',
        name: '到家订单',
        imgUrl2: '../../public/icon/arrows-null.png'
      },
      {
        imgUrl1: '../../public/icon/qrcode-order.png',
        name: '扫码购订单',
        imgUrl2: '../../public/icon/arrows-null.png'
      },
      {
        imgUrl1: '../../public/icon/address-main.png',
        name: '地址管理',
        imgUrl2: '../../public/icon/arrows-null.png'
      },
      {
        imgUrl1: '../../public/icon/download.png',
        name: '下载美妆达人APP',
        imgUrl2: '../../public/icon/arrows-null.png'
      }
    ],
    loginTrueFalse: false,
    addressUrl: '../../public/icon/main.png',
    userName: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: '15239371927' //仅为示例，并非真实的电话号码
    })
  },
  // 登录
  loginBtn(e) {
    var that = this
    that.loginTrueFalse(e)
  },
  // 判断用户是否已经登录
  loginTrueFalse(e) {
    var that = this
    if (that.data.loginTrueFalse) {
      return that.data.loginTrueFalse
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  // 会员名
  memberBtn: function(e) {
    var that = this
    // 判断用户是否登录 登录成功返回 true
    if (that.loginTrueFalse(e)) {
      // 获取会员码
      console.log("登录成功了，获取会员码")
    }
  },
  //订单 地址
  mainModelsBtn(e) {
    var that = this
    //获取点击的元素 的id 判断要请求的内容
    var id = e.currentTarget.dataset.id
    //去除点击下载app 都要判断是否一定登录
    if (id.substring(4) != 3) {
      //判断用户是否登录 登录成功返回 true
      if (that.loginTrueFalse(e)) {
        switch (id) {
          case "main0":
          case "main1":
          // 删除指定的本地缓存
            wx.removeStorage({key: 'oder'})
            try {wx.removeStorageSync('oder')} catch (e) {}
            // 创建本地缓存
            var oderMsg = wx.getStorageSync('oder') || [];
            // 将数据push到数据
            oderMsg.push(id);
            // 最后，把购物车数据，存放入缓存  
            try {
              wx.setStorageSync('oder', oderMsg)
              wx.navigateTo({
                url: '/pages/oderForm/oderForm',
              })
              return;
            } catch (e) {
              console.log(e)
            }
            wx.navigateTo({
              url: '../oderForm/oderForm',
            })
            break;
          case "main2":
            wx.navigateTo({
              url: '../takeAddress/takeAddress',
            })
        }
      }
    } else {
      console.log("进入下载界面，点击的id是：" + id)
    }
  },
  //我的卡卷
  myCardBtn(e) {
    var that = this
    //获取点击的元素 的id 判断要请求的内容
    var id = e.currentTarget.dataset.id
    //判断用户是否登录 登录成功返回 true
    if (that.loginTrueFalse(e)) {
          // 删除指定的本地缓存
          wx.removeStorage({ key: 'card' })
          try { wx.removeStorageSync('card') } catch (e) { }
          // 创建本地缓存
          var cardMsg = wx.getStorageSync('acrd') || [];
          // 将数据push到数据
          cardMsg.push(id);
          // 最后，把购物车数据，存放入缓存  
          try {
            wx.setStorageSync('card', cardMsg)
            wx.navigateTo({
              url: '/pages/mycard/mycard',
            })
            return;
          } catch (e) {
            console.log(e)
          }
          wx.navigateTo({
            url: '../oderForm/oderForm',
          })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取缓存在本地的数据 
    var that = this
    userArr = wx.getStorageSync('userKey') || [];
    if (userArr.length != 0) {
      that.setData({
        addressUrl: userArr[0].avatarUrl,
        userName: userArr[0].nickName,
        loginTrueFalse: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})