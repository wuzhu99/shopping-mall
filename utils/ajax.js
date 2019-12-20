const get = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '小主耐心等待呀',
    })
    wx.request({
      url,
      data,
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        wx.showToast({
          title: '小主我来了'
        })
        resolve(res);
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}
export default {
  get
}