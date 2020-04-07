import {HTTP} from '../util/http-p.js'
class BookModel extends HTTP{
  getHotBooks(){
   return this.request({
     url: "/book/hot_list"
    })
  }

  //获取书籍点赞
  getMyBookCount(){
    return this.request({
      url:"/book/favor/count"
    })
  }

  //获取书籍详细信息
  getBookDetail(bid){
    return this.request({
      url:"/book/"+bid+"/detail"
    })
  }

  getLikeStatus(bid){
    return this.request({
      url:`/book/${bid}/favor`
    })
  }

  //获取书籍短评
  getBookshortComment(bid){
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }

}
export {BookModel}