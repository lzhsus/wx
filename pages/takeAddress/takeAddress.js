// pages/takeAddress/takeAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //添加收货地址
  addAddress(e) {
    var that=this
    var addarr=wx.getStorageSync("address")||[]
    wx.chooseAddress({
      success(res) {
        var arr=[]
        arr={
          userName:res.userName,
          telNumber: res.telNumber,
          address:res.provinceName+res.cityName+res.countyName+res.detailInfo,
          sel:"false"
        }
       that.setData({
         arr:that.data.arr.concat(arr)
       })
      }
    })
  },
  // 设置为默认地址
  bindCheckbox(e){
    var index=e.currentTarget.dataset.index
    var that=this
    var arr=that.data.arr
    for(var i=0;i<arr.length;i++){
      if(index==i){
        arr[index].sel = !arr[index].sel
      }else{
        arr[index].sel = false
      }
    }
    that.setData({
      arr:arr
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