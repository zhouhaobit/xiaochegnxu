
import { HTTP } from '../util/http.js'
class classicModel extends HTTP {
  getLatst(sCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        this._setstorage(res.index)
        sCallback(res)

      }
    })
  }

/*  这两个函数被优化 合并了！
  onPrevious(index, sCallback) {
    this.request({
      url: "/classic/" + index + "/previous",
      success: (res) => {
        sCallback(res)
      }
    })
  }

  onNext(index,sCallback){
    this.request({
      url: "/classic/"+index+"/next",
      success: (res) => {
        sCallback(res)
      }
    })
  }
*/

  getClassic(index,nextorpre,sCallback){
    this.request({
      url: "/classic/"+index+nextorpre,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  isFirst(index) {
    let last = this._getstorage()
    return index>=1 && index<last  ? true : false
  }

  isLast(index) {
    let last = this._getstorage()
    return index <= last && index>1 ? true : false
  }

 

  _setstorage(index) {
    wx.setStorageSync('last', index)
  }

  _getstorage() {
    let index = wx.getStorageSync('last')
    return index
  }


}

export { classicModel }