import {
  config
} from '../config.js'
class HTTP {
  //statusCode
  request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,

      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          //params.success && params.success(res.data)
          resolve(res.data)
        } else {
          reject()
          wx.showToast({
            title: '有个错误',
            duration: 2000
          })
        }
      },
      fail: (err) => {
        reject()
      }
    })
  }
}

export {
  HTTP
}