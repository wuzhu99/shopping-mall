// pages/Mine/Mine.js
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  login() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation', 'scope.writePhotosAlbum','scope.camera']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.userLocation()
            }
          })
        }
      }
    })
  },
  goCart() {
    wx.switchTab({
      url: "/pages/Cart/Cart",
    })
  },
  goSC() {
    wx.navigateTo({
      url: "/pages/Collection/Collection",
    })
  },
  goCall() {
    wx.makePhoneCall({
      phoneNumber: '10086'
    })
  },
  goScan() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  goAdress() {
   wx.navigateTo({
     url: '/pages/myAddress/myAddress',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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