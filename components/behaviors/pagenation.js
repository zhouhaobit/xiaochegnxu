const pagenationBev= Behavior({
  data: {
    dataArray: [],
    total:0
  },

  methods:{
    setMoreData:function(array){
      const conpleteArray =this.data.dataArray.concat(array)
      this.setData({
        dataArray:conpleteArray
      })
    },

    getCurrentStart:function(){
      return this.data.dataArray.length;
    },

    setTotal:function(total){
      this.setData({
        total:total
      })
    },

    hasMore:function(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    },

    initData:function(){
      this.data.dataArray=[]
      this.data.total= null
    }
  }
})
export{pagenationBev}