// pages/address/address.js
var bmap = require('../../libs/js/bmap-wx.js');
var BMap;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '上海市黄浦区六合路六合大厦',
    indexaddress: [],
    animationData: {},
    current:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    BMap = new bmap.BMapWX({
      ak: 'G85CK4eqg2GjhqTGOpW3axcy9mZN3xVk'
    });
    BMap.regeocoding({
      success(res) {
        console.log(res)
        that.setData({
          address: res.originalData.result.formatted_address.substring(6),
          indexaddress: res.wxMarkerData
        })
      }
    });
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
    // 从新加载当前位置
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
      delay: 100
    })
    this.animation = animation
  },
  // 重新获取新地址
  changeAddress(e) {
    this.data.indexaddress = ['']
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        BMap.regeocoding({
          success(res) {
            that.setData({
              address: res.originalData.result.formatted_address.substring(6),
              indexaddress: res.wxMarkerData
            })
          }
        });
      }
    })
    var num = Math.random()
    this.animation.rotate(num * 720 - 360).step()
    that.setData({
      animationData: this.animation.export(),
      current: !this.data.current
    })
    var current=this.data.currrent
    setTimeout(function(){
      that.setData({
        current: !current
      })
    },2000)
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