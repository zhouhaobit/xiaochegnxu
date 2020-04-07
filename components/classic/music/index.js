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
    pauseSrc: "images/play.png",
    palySrc: "images/pause.png"
   
  },

  attached:function(){
    this._resoverStatus()
    this._sysSwitch()
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

    },

    _resoverStatus:function(){

      if(mMgr.paused){
        this.setData({
          palying:false
        })
        return
      }

      if(mMgr.src == this.properties.src){
        this.setData({
          palying:true
        })
      }
    },

    _sysSwitch:function(){
      mMgr.onPlay(()=>{
        this._resoverStatus()
      })
      mMgr.onStop(()=>{
        this._resoverStatus()
      })
      mMgr.onEnded(()=>{
        this._resoverStatus()
      })
      mMgr.onPause(()=>{
        this._resoverStatus()
      })

    }

  }
})