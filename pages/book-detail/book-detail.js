// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { likeModel } from '../../models/like.js'
const bookModel = new BookModel()
const LikeModel = new likeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    likeCount: 0,
    comments: null,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    })
    const id = options.bid
    const bookinfo = bookModel.getBookDetail(id)
    const likeStatus = bookModel.getLikeStatus(id)
    const comment = bookModel.getComment(id)

  //会以那个最长的时间为标准  race  以最短的为触发
    Promise.all([bookinfo, likeStatus, comment]).then((res)=>{
      this.setData({
        book: res[0],
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums,
        comments: res[2].comments
      })

      wx.hideLoading()
    })

  /*
    comment.then((res) => {
      console.log(res)
      this.setData({
        comments: res.comments
      })
    })

    bookinfo.then((res) => {
      console.log(res)
      this.setData({
        book: res
      })
    })

    likeStatus.then((res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  */

  },

  onLike: function (event) {
    let like_or_cancel = event.detail.behavier
    LikeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost: function (event) {
    this.setData({
      posting: true
    })
  },

  onCancel: function (event) {
    this.setData({
      posting: false
    })
  },

  onPost: function (event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '最多12个字',
        icon: "none"
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment).then((res) => {
      wx.showToast({
        title: '+1',
        icon: "none"
      })
      //把短评加入进去
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      //更新数组
      this.setData({
        comments: this.data.comments,
        posting: false
      })
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