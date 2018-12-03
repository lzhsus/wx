//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../libs/js/qqmap-wx-jssdk.js');
var bmap = require('../../libs/js/bmap-wx.js');
var key = require('../../utils/util.js')
var goodsId = null;
var goods = null
Page({
  data: {
    address: '人民广场（六合路六合大厦）',
    items: [],
    moreItem: [{
      'img': 'https://a.vpimg4.com/upload/dop/2016/12/21/0/2_omfu.jpg'
      },
      {
        'img': 'https://a.vpimg2.com/upload/dop/2016/12/21/42/3_llgc.jpg'
      },
      {
        'img': 'https://a.vpimg2.com/upload/dop/2016/12/21/43/4_bwql.jpg'
      },
      {
        'img': 'https://a.vpimg3.com/upload/dop/2016/12/21/64/5_xkip.jpg'
      },
      {
        'img': 'https://a.vpimg3.com/upload/dop/2016/12/21/148/6_hgbl.jpg'
      },
      {
        'img': 'https://a.vpimg4.com/upload/dop/2016/12/21/2/7_dbyd.jpg'
      },
      {
        'img': 'https://a.vpimg4.com/upload/dop/2016/12/21/152/8_fznl.jpg'
      },
      {
        'img': 'https://a.vpimg4.com/upload/dop/2016/12/21/2/7_dbyd.jpg'
      },
      {
        'img': 'https://a.vpimg2.com/upload/dop/2016/12/21/43/4_bwql.jpg'
      },
      {
        'img': 'https://a.vpimg4.com/upload/dop/2016/12/21/152/8_fznl.jpg'
      }
    ],
    prompts: [],
    preferentials: [],
    modelShops1: [],
    time: '00:00:00',
    text: '',
    goods: null
  },
  onLoad: function(options) {
    console.log(options)
    var that = this
    // 倒计时 1小时
    setInterval(function() {
      var data = new Date()
      var hh = 23 - data.getHours()
      var mm = (59 - data.getMinutes()) < 10 ? "0" + (59 - data.getMinutes()) : (59 - data.getMinutes())
      var ss = (59 - data.getSeconds()) < 10 ? "0" + (59 - data.getSeconds()) : (59 - data.getSeconds())
      var time = hh + ":" + mm + ":" + ss
      that.setData({
        time: time
      })
    }, 1000)
    // 获取位置
    var BMap = new bmap.BMapWX({
      ak: 'G85CK4eqg2GjhqTGOpW3axcy9mZN3xVk'
    });
    BMap.regeocoding({
      success(res) {
        that.setData({
          address: res.originalData.result.formatted_address.substring(6)
        })
      }
    });
    // 获取的组件
  },
  onShow: function(options) {
    //轮播图
    var that = this
    wx.request({
      url: 'https://100boot.cn/wxShop/home/banners',
      data: {
        key: key.key
      },
      method: 'GET',
      success(res) {
        that.setData({
          items: res.data.result
        })
      }
    })
    //天天抢购
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
      data: {
        key: key.key,
        page: '1',
        size: '12'
      },
      method: 'GET',
      success(res) {
        var arr = res.data.result.list
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i].name.substring(0, 30)
          arr[i].name = name + "..."
        }
        that.setData({
          prompts: that.data.prompts.concat(arr)
        })
      }
    })
    //优鲜惠
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
      data: {
        key: key.key,
        page: '2',
        size: '10'
      },
      method: 'GET',
      success(res) {
        var arr1 = res.data.result.list
        for (var i = 0; i < arr1.length; i++) {
          var name = arr1[i].name.substring(0, 10)
          arr1[i].name = name + "..."
        }
        that.setData({
          preferentials: arr1.concat({
            'more': '查看更多'
          }),
          prompts: that.data.prompts.concat(arr1)
        })
      }
    })
    //更多商品
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
      data: {
        key: key.key,
        page: '3',
        size: '18'
      },
      method: 'GET',
      success(res) {
        var arr2 = res.data.result.list
        for (var i = 0; i < arr2.length; i++) {
          var name = arr2[i].name.substring(0, 10)
          arr2[i].name = name + "..."
        }
        that.setData({
          modelShops1: that.data.prompts.concat(arr2)
        })
      }
    })
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getHotGoodsList',
      data: {
        key: key.key,
        page: '4',
        size: '18'
      },
      method: 'GET',
      success(res) {
        var arr2 = res.data.result.list
        for (var i = 0; i < arr2.length; i++) {
          var name = arr2[i].name.substring(0, 10)
          arr2[i].name = name + "..."
        }
        that.setData({
          modelShops1: that.data.modelShops1.concat(arr2)
        })
      }
    })

  },
  // 获取商品的详细信息
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
  // 从新获取位置
  address() {
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },
  // 添加商品到购物车
  promptAdd(e) {
    var that = this
    // 加入购物车
    // 获取单个商品的id
    goodsId = e.currentTarget.dataset.goodsid;
    // wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
    that.getGoodsInfo()
    // 通过延长来获取 goodId
    var tiem = setTimeout(function() {
      if (goodsId != null) {
        var goods = that.data.goods;
        // 将数据出存储到本地 看api
        var arr = wx.getStorageSync('cart') || [];
        // 将数据push到数据
        arr.push(goods);
        // 最后，把购物车数据，存放入缓存  
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
      }
    }, 500)
  },
  // 往数组添加信息
  getGoodsInfo: function(e) {
    var that = this
    // 通过请求获取要 添加购物车 商品的信息
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getGoodsInfo',
      data: {
        key: key.key,
        goodsId: goodsId
      },
      success(res) {
        var goodsItem = res.data.result
        // 往自定义数组里面添加数据
        goods = {
          imgUrl: goodsItem.imgUrl,
          name: goodsItem.name,
          price: goodsItem.price,
          isNew: goodsItem.isNew,
          id: goodsItem.id
        }
        // 更新数据
        that.setData({
          // 往数组里面添加
          goods: goods
        })
      }
    })
  },
  // 特惠商品 promptMore 更多
  promptMore(e) {
    console.log(11)
  },
  // 二维码
  carm(e) {
    var that = this
    wx.scanCode({
      success(res) {
        that.setData({
          text: "扫码内容:" + res.result
        })
      }
    })
  }
})