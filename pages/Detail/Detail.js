// pages/Detail/Detail.js
import ajax from '../../utils/ajax.js'
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailData:{},
    detailSwiper:[],
    descContentList:[]
  },
  //加入购物车
  goCart() {
    App.goCart(this.data.detailData)
    wx.showToast({
      title: '添加到购物袋'
    })
  },
  //收藏宝贝
  handlIsSc() {
    if (this.data.detailData.isSc === false) {
      this.data.detailData.isSc = true
      this.setData({
        detailData: this.data.detailData
      })
      App.addSc(this.data.detailData)
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration: 1000
      })
    } else {
      this.data.detailData.isSc = false
      this.setData({
        detailData: this.data.detailData
      })
      App.removeSc(this.data.detailData)
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      detailData: this.data.detailData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    // http://quan.lukou.com/api/detail?id=3864934&normal=1&sa=
    ajax.get(`http://quan.lukou.com/api/detail?id=${id}&normal=1&sa=`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            detailData: {
              ...resp.data.data.detail,
              isSc: false
            },
            //轮播图
            detailSwiper: resp.data.data.detail.photo,
            descContentList: resp.data.data.detail.descContentList,
            accessoryHints: resp.data.data.detail.accessoryHints
          })
          console.log(this.data.detailData)
          //设置微信小程序头部标题
          wx.setNavigationBarTitle({
            title: this.data.detailData.title
          })
        }
      })
      .catch(err => {
        console.log(err)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})