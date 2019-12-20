// pages/Products/Products.js
import ajax from '../../utils/ajax.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    products:[],
    isEnd:false,
    nextIndex:0,
    productsid:0,
    tab:['综合','价格','新品','最热'],
    active:'综合',
    floorstatus:false
  },
  //跳到详情页
  toDetail(e){
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
        products: this.data.list
      })
    } else if (sort == '价格'){
      //价格升序
      let resulet = this.data.products.sort(complete);
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
        products: resulet
      })
    } else if (sort == '新品') {
      //新品降序
      let resulet = this.data.products.sort(complete);
      function complete(x, y) {
        if (x.itemId > y.itemId) {
          return 1;
        } else if (x.itemId < y.itemId) {
          return -1;
        } else {
          return 0;
        }
      }
      this.setData({
        products: resulet
      })
    } else if (sort == '最热') {
      //最热降序
      let resulet = this.data.products.sort(complete);
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
        products: resulet
      })
    }
  },
  //商品列表
  getdata() {
    //判断数据是否为最后的了
    if (this.data.isEnd === true){
      return;
    }
    ajax.get(`http://www.xiongmaoyouxuan.com/api/category/${this.data.productsid}/items?start=${this.data.nextIndex}`)
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            products: this.data.products.concat(resp.data.data.items.list),
            list: resp.data.data.items.list,
            isEnd: resp.data.data.items.isEnd,
            nextIndex: resp.data.data.items.nextIndex
          })
          //设置微信小程序头部标题
          wx.setNavigationBarTitle({
            title: resp.data.data.categoryName
          })
        }
      })
      .catch(err => {
        console.log(err)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productsid:this.options.id
    })
    this.getdata()
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
    this.getdata()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})