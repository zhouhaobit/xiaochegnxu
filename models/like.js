import {HTTP} from '../util/http.js'
class likeModel extends HTTP {
    like(behavier,artId,categray){
      let url = behavier? '/like' :'/like/cancel'
      this.request({
          url:url,
          method:'POST',
          data:{
            art_id: artId,
            type: categray,
          }
      })
    }
}

export {likeModel}