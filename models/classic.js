
import { HTTP } from '../util/http.js'
class classicModel extends HTTP {
  getLatst(sCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        this._setstorage(res.index)
        let key =this._getKey(res.index)
        wx.setStorageSync(key, res)
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
  //先看缓存  缓存没有则加载  加载的数据存入缓存
   
    let index2 = nextorpre == '/next' ? index + 1:index-1
    let key =this._getKey(index2)
    let classic =wx.getStorageSync(key)
    if (!classic){
      this.request({
        //改写成模板字符串
        url:`/classic/${index}${nextorpre}`,
      //  url: "/classic/" + index + nextorpre,
        success: (res) => {
         let key = this._getKey(res.index)
          wx.setStorageSync(key, res)
          sCallback(res)
        }
      })
    }
    else
    {
      sCallback(classic)
    }

    
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

  _getKey(index){
      let key = 'classic-'+index
      return key
  }


}

export { classicModel }