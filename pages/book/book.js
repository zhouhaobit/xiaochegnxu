// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*第一步：创建一个对象*/
    const promise = new Promise((resolve, reject) => {
      /**第二步：异步代码  凝固状态**/
      wx.getSystemInfo({
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
     
      /**第三步 两个函数的顺序不能变，一个成功  一个失败!  注意在外部！**/
      promise.then((res) => {
        console.log(res)
      }, (error) => {
        console.log(error)
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