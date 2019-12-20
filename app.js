//app.js
App({
  cartList: wx.getStorageSync('cartList') || [],
  ScList: wx.getStorageSync('ScList') || [],
  Adress:{},
  //加入收藏夹
  addSc(scItem) {
    let has = this.ScList.some(item => item.id === cartItem.id)
    if (has) {
      return;
    }
    this.ScList.push(scItem)
    console.log('加入收藏夹',this.ScList)
    wx.setStorageSync('ScList', this.ScList)
  },
  //移出收藏夹
  removeSc(scItem) {
    this.ScList = this.ScList.filter(item => item.id !== scItem.id)
    console.log('移出收藏夹',this.ScList)
    wx.setStorageSync('ScList', this.ScList)
  },
  //加入购物车
  goCart(cartItem) {
    let has = this.cartList.some(item => item.id === cartItem.id)
    if(has) {
      this.cartList.map(item => {
        if (item.id === cartItem.id){
          item.count++
        }
      })
    } else {
      this.cartList.push({
        ...cartItem,
        count:1,
        isChecked:false,
      })
    }
    this.showBadeg()
    wx.setStorageSync('cartList',this.cartList)
  },
  //数量++
  addCount(id) {
    this.cartList.map(item => {
      if (item.id === id) {
        item.count++
      }
    })
    this.showBadeg()
    wx.setStorageSync('cartList', this.cartList)
  },
  //数量--
  reduceCount(id) {
    this.cartList.map(item => {
      if (item.id === id) {
        item.count--
        if (item.count < 1){
          item.count = 1
          this.deleteItem(item.id)
        }
      }
    })
    this.showBadeg()
    wx.setStorageSync('cartList', this.cartList)
  },
  //删除商品
  deleteItem(id) {
    this.cartList = this.cartList.filter(item => item.id !== id)
    wx.setStorageSync('cartList', this.cartList)
    this.showBadeg()
  },
  //单选
  tabChecked(id) {
    this.cartList.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
      }
    })
    wx.setStorageSync('cartList', this.cartList)
  },
  //全选
  AllChecked(){
    return this.cartList.length === this.cartList.reduce((result,item) => {
      if(item.isChecked === true) {
        result++
      }
      return result;
    },0);
  },
  //取消全选
  tabAllChecked() {
    if(this.AllChecked() === true){
      this.cartList.map(item => item.isChecked = false)
    } else {
      this.cartList.map(item => item.isChecked = true)
    }
    wx.setStorageSync('cartList', this.cartList)
  },
  //选中的总价
  totalPrice() {
    return this.cartList.reduce((result, item) => {
      if (item.isChecked === true) {
        result += item.price * item.count
      }
      return result;
    }, 0).toFixed(2);
  },
  //删除选中的
  deleteChecked() {
    this.cartList = this.cartList.filter(item => item.isChecked === false)
    this.showBadeg()
    wx.setStorageSync('cartList', this.cartList)
  },
  showBadeg() {
    if (this.cartList.length===0){
      wx.removeTabBarBadge({ index: 2})
      return;
    }
    let text = this.cartList.reduce((result, item) => {
      result += item.count
      return result
    }, 0).toString();
    wx.setTabBarBadge({
      index: 2,
      text
    })
  }
})