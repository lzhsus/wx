// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {


  },
  // 删除最近搜索
  delbtn: function(e) {
    var that = this
    that.setData({
      searchs: []
    })
  },
  // 搜索商品 添加到最近搜索
  inputblur: function(e) {
    var that = this
    wx.removeStorageSync("value")
    var value=e.detail.value
    if (that.data.searchs.indexOf(value) == -1 && value != "") {
      var newArr = that.data.searchs.concat(e.detail.value)
      that.setData({
        searchs: newArr
      })
      try {
        wx.setStorageSync("value", that.data.searchs)
      } catch (e) { }
    }
    wx.navigateTo({
      url: '../fruits/fruits',
    })
  },
  clearvalue:function(e){
    console.log("取消搜索")
  },
  // 筛选按钮
  comprehensiveBtn: function(e) {

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
    var arr = wx.getStorageSync("value") || []
    console.log(arr)
    this.setData({
      searchs: arr
    })
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
  onPullDownRefresh: function() {
    console.log("下拉")
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})