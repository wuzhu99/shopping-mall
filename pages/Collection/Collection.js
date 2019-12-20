// pages/Collection/Collection.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['综合', '价格', '最热'],
    active: '综合',
    floorstatus: false,
    list: App.ScList,
    ScList: App.ScList,
    currentId:-1
  },
  ShowDel(e) {
    console.log(e.target.dataset.detail.id)
    this.setData({
      currentId: e.target.dataset.detail.id
    })
    setTimeout(() => {
      this.setData({
        currentId: -1
      })
    },5000)
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
  delScItem(e) {
    console.log(e.target.dataset.detail.id)
    wx.showModal({
      content: '小主请慎重,确认删除？',
      confirmColor: '#b81919',
      success: (res) => {
        if (res.confirm) {
          App.removeSc(e.target.dataset.detail)
          this.setData({
            ScList: App.ScList
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  toDetail(e) {
    let detailid = e.currentTarget.dataset.detail.id
    wx.navigateTo({ url: `/pages/Detail/Detail?id=${detailid}` })
  },
  //头部排序事件
  handlsort(e) {
    let sort = e.target.dataset.active
    this.setData({
      active: sort
    })
    if (sort == '综合') {
      //综合排序
      this.setData({
        ScList: this.data.list
      })
    } else if (sort == '价格') {
      //价格升序
      let resulet = this.data.ScList.sort(complete);
      function complete(x, y) {
        if (x.price > y.price) {
          return 1;
        } else if (x.price < y.price) {
          return -1;
        } else {
          return 0;
        }
      }
      this.setData({
        ScList: resulet
      })
    } else if (sort == '最热') {
      //最热降序
      let resulet = this.data.ScList.sort(complete);
      function complete(x, y) {
        if (x.taobaoCid > y.taobaoCid) {
          return 1;
        } else if (x.taobaoCid < y.taobaoCid) {
          return -1;
        } else {
          return 0;
        }
      }
      this.setData({
        ScList: resulet
      })
    }
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