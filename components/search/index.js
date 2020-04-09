// components/search/index.js
import {
  keyWordModel
} from '../../models/keyword.js'
import{BookModel} from '../../models/book.js'
import{pagenationBev} from '../behaviors/pagenation.js'
const keywordmodel = new keyWordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pagenationBev],
  properties: {
    more:{
      type:String,
      observer:"_load_more"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    keywordsHistory: [],
    hotwords: [],
    searching:false,
    q:'',
    loading:false,
    loadingCenter:false

  },

  attached: function() {
    console.log(this.properties.more)
    this.setData({
      keywordsHistory: keywordmodel.gethistory()
    })

    keywordmodel.getHot().then((res) => {
      this.setData({
        hotwords: res.hot
      })
    })

   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm: function(event) {
      
      this.initData()
      this.setData({
        searching:true,
        loadingCenter:true
      })
      let word = event.detail.value  || event.detail.text
      bookModel.search(0, word).then((res)=>{
          this.setData({
            dataArray: res.books,
            q: word,
            loadingCenter:false
          })
      })
      keywordmodel.addToHistory(word)
    },

    onDelete: function (event) {
      this.setData({
        searching: false
      })
    },

    _load_more: function () {
     
     if(!this.data.q){
        return
     }
     if(this.data.loading){
        return
     }

     console.log(123123)
     this.data.loading= true  //防止连续加载
     bookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
       this.setTotal(res.total)  //设置总数
       this.setMoreData(res.books)  // 合并 且设置
     })
     if(this.hasMore()){
        this.data.loading=false
     }

    }

  }
})