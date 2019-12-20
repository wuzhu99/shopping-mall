// pages/Mall/Mall.js
import ajax from '../../utils/ajax.js'
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["品类", "品牌"],
    activeIndex: 0,
    sliderOffset: 110,
    sliderLeft: 0,
    sidList:[],
    content: [],
    active:'女装'
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  //侧边栏数据请求
  getData() {
    ajax.get('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            // list
            sidList: resp.data.data.list.filter(item => item.categoryId !== 0)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //侧边栏点击事件
  toggle(e) {
    this.setData({
      active: e.currentTarget.dataset.classify.name
    })
    let id = e.currentTarget.dataset.classify.id
    ajax.get(`http://www.xiongmaoyouxuan.com/api/tab/${id}?start=0`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            // content
            content: resp.data.data.categories
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //列表点击事件
  toProducts(e) {
    let productsid = e.currentTarget.dataset.productsid.url.split('=')[1]
    wx.navigateTo({ url: `/pages/Products/Products?id=${productsid}`})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    //首次进入加载第一个列表项
    ajax.get(`http://www.xiongmaoyouxuan.com/api/tab/2?start=0`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            content: resp.data.data.categories
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    App.showBadeg()
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
    App.showBadeg()
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