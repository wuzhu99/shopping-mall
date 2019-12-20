// pages/Cart/Cart.js
import ajax from '../../utils/ajax.js'
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  x:0,
  distance:0,
  data: {
    floorstatus: false,
    isEdit:true,
    cartList: [],
    currentId:-1,
    left:0,
    totalPrice:0,
    list:[],
    isEnd:false,
    nextIndex:30
  },
  //跳到详情页
  toDetail(e) {
    let detailid = e.currentTarget.dataset.detail.id
    wx.navigateTo({ url: `/pages/Detail/Detail?id=${detailid}` })
  },
  //删除选中的
  deleteChecked() {
    wx.showModal({
      content: '小主请慎重,确认删除？',
      confirmColor: '#b81919',
      success: (res) => {
        if (res.confirm) {
          App.deleteChecked()
          this.setData({
            isEdit:true,
            cartList: App.cartList,
            totalPrice: App.totalPrice()
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
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
  //切换选中
  tabAllChecked() {
    App.tabAllChecked()
    this.setData({
      cartList: App.cartList,
      AllChecked: App.AllChecked(),
      totalPrice: App.totalPrice()
    })
  },
  //单选
  tabChecked(e) {
    App.tabChecked(e.currentTarget.dataset.id)
    this.setData({
      cartList: App.cartList,
      AllChecked: App.AllChecked(),
      totalPrice: App.totalPrice()
    })
  },
  //删除
  deleteItem(e) {
    wx.showModal({
      content: '小主请慎重,确认删除？',
      confirmColor:'#b81919',
      success: (res) => {
        if (res.confirm) {
          App.deleteItem(e.currentTarget.dataset.item.id)
          this.setData({
            isEdit: true,
            cartList: App.cartList,
            totalPrice: App.totalPrice()
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  //滑动删除 获取id 
  onItemTouchStart(e) {
    this.x = e.touches[0].clientX
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
  },
  //滑动删除 获取distance
  onItemTouchMove(e){
    const currentX = e.touches[0].clientX
    this.distance = currentX - this.x
    if (this.distance < -200) {
      this.distance = -200
    } else if (this.distance > 0) {
      this.distance = 0
    }
    this.setData({
      left:this.distance
    })
  },
  //滑动删除的边界
  onItemTouchEnd(e){
    if (this.distance < -100){
      this.distance = -200;
    } else if (this.distance >-100) {
      this.distance = 0;
    }
    this.setData({
      left: this.distance
    })
  },
  //编辑切换
  TabStatus() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  //--
  reduceCount(e){
    if (e.currentTarget.dataset.item.count <= 1){
      this.deleteItem(e)
    } else{
      App.reduceCount(e.currentTarget.dataset.item.id)
      this.setData({
        cartList: App.cartList,
        totalPrice: App.totalPrice()
      })
    }
  },
  //++
  addCount(e) {
    App.addCount(e.currentTarget.dataset.item.id)
    this.setData({
      cartList: App.cartList,
      totalPrice: App.totalPrice()
    })
  },
  //猜你喜欢
  getData() {
    if(this.data.isEnd === true){
      return;
    }
    ajax.get(`http://www.xiongmaoyouxuan.com/api/tab/1?start=${this.data.nextIndex}`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            list: this.data.list.concat(resp.data.data.items.list),
            isEnd: resp.data.data.items.isEnd,
            nextIndex: resp.data.data.items.nextIndex
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartList:App.cartList,
      totalPrice: App.totalPrice()
    })
    this.getData()
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
    this.setData({
      cartList: App.cartList,
      AllChecked: App.AllChecked(),
      totalPrice: App.totalPrice()
    })
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
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})