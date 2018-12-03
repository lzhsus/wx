// pages/classify/classify.js
var classifyId=1
var goods=null
var goodsId = null;
var key = require('../../utils/util.js')
var windowHeight=1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'六合路（六合大厦）',
    isSelect:"0",
    classifysort: [],
    classifyList:[],
    classifyId:'',
    goods:null,
    windowHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取手机设备信息
    wx.getSystemInfo({
      success(res){
        var windowHeight = parseInt(res.windowHeight)*2-99
        that.setData({
          windowHeight: windowHeight
        })
      }
    })

    // 获取商品列表
    wx.request({
      url: 'https://100boot.cn/wxShop/classify/getShopClassifyList',
      data: {
        key: key.key,
        page: '1',
        size: '14'
      },
      method: 'GET',
      success(res) {
        var arr2 = res.data.result
        console.log(res)
        for (var i = 0; i < arr2.length; i++) {
            if(i==0){
              arr2[i].ishaveChild=true
            }else{
              arr2[i].ishaveChild = false
            }
        }
        that.setData({
          isSelect: res.data.result[0].shopClassifyDtoList[0].id,
          classifyId: that.data.isSelect,
          classifysort: res.data.result
        })
      }
    })
    //获取具体商品信息
    wx.request({
      url:'https://100boot.cn/wxShop/classify/getClassifyGoodList',
      data: {
        key: key.key,
        classifyId: "3",
        page: '1',
        size: '10'
      },
      method: 'GET',
      success(res) {
        var arr=res.data.result.list
        console.log()
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i].name.substring(0, 20)
          arr[i].name = name + "..."
        }
        that.setData({
          classifyList:arr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 点击切换 商品 模块
  classifyShopChange(e){
    console.log("这是父类")
    var that=this
    var id=e.currentTarget.dataset.id
    var ishavechild = e.currentTarget.dataset.ishavechild
    var classifysort = that.data.classifysort
    var isSelect = that.data.isSelect
    console.log(isSelect)
    for (var i = 0; i < classifysort.length;i++){
      if(id==classifysort[i].id){
        classifysort[i].ishaveChild=true
      }else{
        classifysort[i].ishaveChild = false
      }
      that.setData({
        isSelect: parseInt(id)+1,
        classifysort: classifysort
      })
    }
    classifyId = parseInt(id) + 1,
    wx.request({
      url: 'https://100boot.cn/wxShop/classify/getClassifyGoodList',
      data: {
        key: key.key,
        classifyId: classifyId,
        page: '1',
        size: '10'
      },
      method: 'GET',
      success(res) {
        var arr = res.data.result.list
        console.log()
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i].name.substring(0, 20)
          arr[i].name = name + "..."
        }
        that.setData({
          classifyList: arr
        })
      }
    })
  },
  // 点击切换 分类下 免的类别
  classifyShopChangeList(e){
    var that=this
    var id = e.currentTarget.dataset.id
    var ishavechild = e.currentTarget.dataset.ishavechild
    var classifysort = that.data.classifysort
    var isSelect = that.data.isSelect
    classifyId = id,
      wx.request({
        url: 'https://100boot.cn/wxShop/classify/getClassifyGoodList',
        data: {
          key: key.key,
          classifyId: classifyId,
          page: '1',
          size: '10'
        },
        method: 'GET',
        success(res) {
          var arr = res.data.result.list
          for (var i = 0; i < arr.length; i++) {
            var name = arr[i].name.substring(0, 20)
            arr[i].name = name + "..."
          }
          that.setData({
            classifyList: arr,
            isSelect:id
          })
        }
      })
  },
  // 添加到购物车
  promptAdd(e){
    var that=this
    var goodsId = e.currentTarget.dataset.goodsid
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getGoodsInfo',
      data:{
        key: key.key,
        goodsId:goodsId
      },
      success(res){
        var goodsItem = res.data.result
        // 往自定义数组里面添加数据
        goods = {
          imgUrl: goodsItem.imgUrl,
          name: goodsItem.name,
          price: goodsItem.price,
          isNew: goodsItem.isNew,
          id: goodsItem.id
        }
        // 将数据出存储到本地 看api
        var arr = wx.getStorageSync('cart') || [];
        // 把数据添加到数组
        arr.push(goods);
        try {
          wx.setStorageSync('cart', arr)
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
        } catch (e) {
        }
      }
    })

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