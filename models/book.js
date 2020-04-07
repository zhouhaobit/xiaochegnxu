import { HTTP} from '../util/http-p.js'
class BookModel extends HTTP{
  getHotBooks(){
   return this.request({
     url: "/book/hot_list"
    })
  }

  getMyBookCount(){
    return this.request({
      url:"/book/favor/count"
    })
  }
}
export {BookModel}