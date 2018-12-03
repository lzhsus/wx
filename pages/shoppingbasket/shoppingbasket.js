// pages/shoppingbasket/shoppingbasket.js
var bmap = require('../../libs/js/bmap-wx.js');
var arr = null;
var arr2 = null;
var priceNum=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    address: '',
    priceNum: "00",
    checked: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取当前位置 最近门店
    var that = this
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
    // 购物才合计金钱
    var shops = this.data.shops
    var priceNum = parseFloat(this.data.priceNum)
    for (var i = 0; i < shops.length; i++) {
      priceNum += parseFloat(shops[i].new) * parseInt(shops[i].num)
    }
    var priceNum = priceNum.toFixed(2)
    this.setData({
      priceNum: priceNum
    })
  },
  reduceShop: function(e) {
    var that = this
    // 通过id index
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var value = e.currentTarget.dataset.value
    var shops = that.data.shops
   
    if(value>"1"){
      var priceNum = 0
      shops[index].isNew = parseInt(value) - 1
      for (var i = 0; i < shops.length; i++) {
        if (shops[i].checked) {
          priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
        }
      }
      that.setData({
        shops: shops,
        priceNum: parseInt(priceNum).toFixed(2)
      })
    }else{
      var priceNum = 0
      var num=0
      shops.splice(index,1)
      wx.removeStorageSync('cart')
      try{
      wx.setStorageSync("cart", shops)
      }catch(e){}
      that.setData({
        shops: shops
      })
      var shops=that.data.shops
      for (var i = 0; i < shops.length; i++) {
        if (shops[i].checked) {
          num++
          if(num==shops.length){
            that.setData({
              checked: true
            })
          }
          priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
        } else {
          that.setData({
            checked: false
          })
        }
      }
      that.setData({
        priceNum: parseInt(priceNum).toFixed(2)
      })
    }
    
  },
  addShop: function(e) {
    var that = this
    // 通过id index
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var value=e.currentTarget.dataset.value
    var shops=that.data.shops
    var priceNum=0
    var num=0
    // 商品数量增加
    shops[index].isNew=parseInt(value)+1
    for (var i = 0; i < shops.length; i++) {
      if (shops[i].checked) {
        priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
      }
    }
    that.setData({
      shops:shops,
      priceNum: parseInt(priceNum).toFixed(2)
    })
    // 判断商品是否全部选中
    // for(var i=0;i<shops.length;i++){
    //   if(shops[i].checked){
    //       num++;
    //       if(num==shops.length){
    //         that.setData({
    //           checked:true
    //         })
    //       }else{
    //         that.setData({
    //           checked: false
    //         })
    //         return
    //       }
    //   }
    // }
  },
  shopchange: function(e) {
    var that = this
    // 通过id index
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var value = e.currentTarget.dataset.value
    var shops = that.data.shops
    var priceNum = 0
    var num = 0
    // console.log(e.detail.value)
    if (e.detail.value<=0){
      e.detail.value=1
    }
    shops[index].isNew = e.detail.value
    //计算选中商品的总价钱
    for (var i = 0; i < shops.length; i++) {
      if (shops[i].checked) {
        priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
      }
    }
    that.setData({
      shops: shops,
      priceNum: parseInt(priceNum).toFixed(2)
    })
  },
  // 购物车商品是否选中改变
  checkboxBtn: function(e) {
    var that = this
    // 通过id index
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var priceNum = 0
    // 通过点击下标改变 选中的状态
    var shops = this.data.shops
    for (var i = 0; i < shops.length; i++) {
      // 点击的变为未选中的状态
      if (i == index) {
        shops[i].checked = !shops[i].checked
      }
      // 计算选中的商品总价钱
      if (shops[i].checked) {
        priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
      }
    }
    that.setData({
      priceNum: parseInt(priceNum).toFixed(2)
    })
    // 判断 是否全部是true
    var num = 0;
    for (var i = 0; i < shops.length; i++) {
      if (shops[i].checked) {
        num++;
        if (num == shops.length) {
          this.setData({
            checked: true
          })
        }
      } else {
        this.setData({
          checked: false
        })
        return;
      }
    }
  },
  // 按下选中的商品 是否全部 全不选
  gropshop: function(e) {
    var that = this
    var shops = that.data.shops
    var priceNum = 0
    var num = 0;
    for (var i = 0; i < shops.length; i++) {
      // 通过判断商品才checked是否 都是true，
      // 是：现在是全选状态，点击全部不选
      // 否：现在不是全部选中，全部选中
      if (shops[i].checked) {
        num++;
        if (num == shops.length) {
          for (var j = 0; j < shops.length; j++) {
            shops[j].checked = false
          }
          that.setData({
            checked: false,
            priceNum: parseInt(priceNum).toFixed(2),
            shops: that.data.shops
          })
        }
      } else {
        var that = this
        var shops = that.data.shops
        for (var i = 0; i < shops.length; i++) {
          priceNum = priceNum + parseInt(shops[i].price) * parseInt(shops[i].isNew)
          shops[i].checked = true
        }
        that.setData({
          checked: true,
          priceNum: priceNum.toFixed(2),
          shops: that.data.shops
        })
        return;
      }
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
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  
    arr = wx.getStorageSync('cart') || [];
    // console.info("缓存数据：", arr);
    arr2 = [];
    // 设置数组是属性
    arr.map(((item, index) => {
      arr2.push(Object.assign({}, item, {
        checked: true
      }))
    }))
    var that = this
    that.setData({
      shops: arr2
    })
    // 判断是否可以全部选中
    var num = 0;
    var sum = 0;
    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i].checked) {
        sum = parseFloat(arr2[i].price + sum)
        this.setData({
          priceNum: sum.toFixed(2)
        })
        num++;
        if (num == that.data.shops.length) {
          this.setData({
            checked: true
          })
        }
      }
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