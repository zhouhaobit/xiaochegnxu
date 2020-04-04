
import{HTTP} from '../util/http.js'
class classicModel extends HTTP {
  getLatst(sCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export {classicModel}