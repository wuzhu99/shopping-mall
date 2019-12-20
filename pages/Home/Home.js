// pages/Home/Home.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const App = getApp()
import ajax from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    banners:[],
    hots: [],
    news: [],
    Jinx:{},
    tabs: ["热卖", "新品"],
    activeIndex: 0,
    sliderOffset: 11,
    sliderLeft: 0,
    floorstatus: false
  },
  // 获取滚动条当前位置
  onPageScroll(e) {
    if (e.scrollTop > 800) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  // 一键回到顶部
  goTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //跳到详情页
  toDetail(e) {
    let detailid = e.currentTarget.dataset.detail.id
    wx.navigateTo({ url: `/pages/Detail/Detail?id=${detailid}` })
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //首页数据请求
  getData() {
   ajax.get('http://www.xiongmaoyouxuan.com/api/tab/1?start=0')
    .then(resp => {
      if(resp.data.code === 200){
        this.setData({
          //banner图
          banners: resp.data.data.banners,
          //每日精选
          Jinx: resp.data.data.items.list.filter(item => item.expiring === false)
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  //新品商品请求
  getNewData() {
    if (this.data.newsisEnd === true) {
      return;
    }
    ajax.get(`http://www.xiongmaoyouxuan.com/api/search?word=新品&start=${this.data.newsnextIndex}&sort=0`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            news: this.data.news.concat(resp.data.data.list),
            newsisEnd: resp.data.data.isEnd,
            newsnextIndex: resp.data.data.nextIndex
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 热卖
  getHotData() {
    if (this.data.hotsisEnd === true){
      return;
    }
    ajax.get(`http://www.xiongmaoyouxuan.com/api/search?word=热卖&start=${this.data.hotsnextIndex}&sort=0`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            hots: this.data.hots.concat(resp.data.data.list),
            hotsisEnd: resp.data.data.isEnd,
            hotsnextIndex: resp.data.data.nextIndex
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  toSearch() {
    wx.navigateTo({
      url: "/pages/Search/Search"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getHotData()
    this.getNewData()
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
    this.getHotData()
    this.getNewData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})