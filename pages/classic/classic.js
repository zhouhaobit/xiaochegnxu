// pages/classic/classic.js

import {
  classicModel
} from '../../models/classic.js'

import {
  likeModel
} from '../../models/like.js'
let classicm = new classicModel()
let like = new likeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    last: true,
    first: false,
    reslike:null
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicm.getLatst((res) => {
      this.setData({
        classic: res
      })
    })
   
  },


  onLike: function(event) {
    let behavier = event.detail.behavier
    like.like(behavier, this.data.classic.id, this.data.classic.type)
  },


  Previous: function(event) {
    this._updateData("/previous")
  },

  Next: function(event) {
    this._updateData("/next")
  },

  _updateData: function(nextorpre) {
    let index = this.data.classic.index
    classicm.getClassic(index, nextorpre, (res) => {
      ////点赞重写  因为缓存问题  注意写的地方
      like.getClassicLikeStatus(res.id, res.type, (reslike) => {
        this.setData({
          reslike: reslike
        })
      })
      this.setData({
        classic: res,
        first: classicm.isFirst(res.index),
        last: classicm.isLast(res.index)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})