// pages/main/main.js
var key=require('../../utils/util.js')
var pageNum=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comprehensiveIs:true,
    id:'',
    filtrates: [],
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that=this
    var pageNum = that.data.pageNum
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
      data:{
        key:key.key,
        page:pageNum,
        size:'12'
      },
      success(res){
        that.setData({
          filtrates: that.data.filtrates.concat(res.data.result.list)
        })
      }
    })
    
  },
  // 筛选按钮
  comprehensiveBtn:function(e){
   
  },
  // 获取商品的详情页
  productsMsg(e) {
    var goodsId = e.currentTarget.dataset.goodsid
    // 删除本地缓存
    wx.removeStorage({
      key: 'goodsMsg',
      success(res) {
        console.log('removeStorage', res)
      }
    })
    try {
      wx.removeStorageSync('goodsMsg')
    } catch (e) {
      // Do something when catch error
    }
    //  通过id 获取对应数据的详细信息
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getGoodsInfo',
      data: {
        key: key.key,
        goodsId: goodsId
      },
      success(res) {
        // 将数据出存储到本地 看api
        var arrGoodsMsg = wx.getStorageSync('goodsMsg') || [];
        // 将数据push到数据
        arrGoodsMsg.push(res.data.result);
        // 最后，把购物车数据，存放入缓存  
        try {
          wx.setStorageSync('goodsMsg', arrGoodsMsg)
          wx.navigateTo({
            url: '/pages/products/products',
          })
          return;
        } catch (e) {
          console.log(e)
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
    var that = this
    var pageNum = that.data.pageNum
    if (pageNum < 5) {
      setTimeout(function () {
        pageNum = parseInt(pageNum) + 1
        wx.request({
          url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
          data: {
            key: key.key,
            page: pageNum,
            size: '12'
          },
          success(res) {
            that.setData({
              pageNum: pageNum,
              filtrates: that.data.filtrates.concat(res.data.result.list)
            })
          }
        })
      }, 1000)
    } else if (pageNum == 5) {
      pageNum = parseInt(pageNum) + 1
      that.setData({
        pageNum: pageNum,
        filtrates: that.data.filtrates.concat({ 'notData': '--客观数据已经全部加载了--' })
      })
    } else {
      console.log('数据不在添加')
    }
  },
  onPullDownRefresh: function () {
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})