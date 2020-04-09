// components/search/index.js
import {
  keyWordModel
} from '../../models/keyword.js'
import{BookModel} from '../../models/book.js'
const keywordmodel = new keyWordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
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
    dataArray:[],
    searching:false,
    q:''

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
      this.setData({
        searching:true
      })
      let word = event.detail.value  || event.detail.text
      bookModel.search(0, word).then((res)=>{
          this.setData({
            dataArray: res.books,
            q: word
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
     console.log(this.properties.more)
    }

  }
})