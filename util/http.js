
import {config} from '../config.js'
class HTTP{
  //statusCode
  request(params){
      if(!params.method){
        params.method= 'GET'
      }
      wx.request({
        url: config.api_base_url+params.url,
        method:params.method,
        data:params.data,

        header:{
          'content-type':'application/json',
          'appkey':config.appkey,
        },
        success:(res)=>{
          let code =res.statusCode.toString()
          if(code.startsWith('2') ){
            params.success&&params.success(res.data)
          }else{

            wx.showToast({
              title:'有个错误',
              duration:2000
            })

          }
        },
        fail:(err)=>{

        }
      })
  }
}

export {HTTP}