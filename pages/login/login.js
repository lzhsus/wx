// pages/login/login.js
var users=null
Page({

  /**
   * 页面的初始数据
   */

  data: {
    avatarUrl:'',
    userInfo:'',
    logged: false,
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 回调获取数据
  getuserinfo(e){
      console.log(e)
      var that=this
      var users=that.data.users
      //创建本地数组 对象 将数据储存在本地
      var userArr = wx.getStorageSync('userKey') || [];
      // 将数据存放到本地数组  用户信息
      userArr.push(e.detail.userInfo)
      try {
        // 参数 key  数据
        wx.setStorageSync('userKey', userArr)
        wx.switchTab({
          url: '/pages/main/main'
        })
        return;
      } catch (e) {
        console.log(e)
      }
  },
  onGetUserInfo: function (e) {
    var that=this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })

            }
          })
        }else{
          console.log('11')
        }
      }
    })
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