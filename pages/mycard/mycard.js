// pages/oderForm/oderForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  mycard(e) {
    console.log(e)
    var that = this
    that.setData({
      title: e.currentTarget.dataset.title,
      sel: false
    })
  },
  newcard(e) {
    console.log(e)
    var that = this
    that.setData({
      title: e.currentTarget.dataset.title,
      sel: true,
    })
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
    var that = this
    var cardMsg = wx.getStorageSync('card') || [];
    if (cardMsg[0] == "newcard") {
      that.setData({
        sel: true
      })
    } else {
      that.setData({
        sel: false
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