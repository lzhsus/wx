Page({
  data:{
      text:'扫码得到的信息'
  },
  onLoad(){
    console.log()
  },
  scancode(e){
    var that=this
    wx.scanCode({
      success(res) {
        var str=res.result
        that.setData({
          text:res
        })
      }
    })

  }
})