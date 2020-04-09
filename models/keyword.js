import {HTTP} from '../util/http-p.js'
class keyWordModel extends HTTP {
  keyword = 'q'
  maxlength =10

  gethistory() {
    let words = wx.getStorageSync(this.keyword)
    if (!words) {
      return []
    }
    return words
  }

  getHot() {
   return this.request({
      url:"/book/hot_keyword"
    })
  }

  addToHistory(keyword) {
    let word = this.gethistory()
    let has = word.includes(keyword)
    if (!has) {
      const length = word.length
      if (length >= this.maxlength){
        word.pop()
      }
      word.unshift(keyword)
      wx.setStorageSync(this.keyword, word)
    }
  }

}

export { keyWordModel}