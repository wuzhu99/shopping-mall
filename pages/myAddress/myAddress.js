// pages/myAddress/myAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/assets/icons/mine (4).png",
      id: 0,
      latitude: 30.623350,
      longitude: 104.076320,
      width: 32,
      height:32
    }]
  },
  markertap(e) {
    const marke = this.data.markers.filter(marke => marke.id === e.markerId)[0]
    const {
      latitude,
      longitude
    } = marke
    wx.openLocation({
      latitude,
      longitude,
      scale: '',
      name: '',
      address: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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