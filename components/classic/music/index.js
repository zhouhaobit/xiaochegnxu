// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    palying: false,
    palySrc: "images/play.png",
    pauseSrc: "images/pause.png"
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){

      if(!this.data.palying){
        this.setData({
          palying: true
        })
        mMgr.title = "哈尔滨黑桃科技"
        mMgr.src = this.properties.src
      }else{
        this.setData({
          palying:false
        })
        mMgr.pause()
      }
      
      console.log(this.data.palying)
    }
  }
})