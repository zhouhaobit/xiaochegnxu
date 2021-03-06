// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: '',
      observer: function () {

      }

    },
    count: {
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
 
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      let count = this.properties.count
      let like = this.properties.like
      count = like? count-1:count+1
      this.setData({
        count:count,
        like:!like
      })

      //获取
      let behavier =this.properties.like
      //激活事件
      this.triggerEvent('like',{
        behavier: behavier
      },{})
    }
  }
})
