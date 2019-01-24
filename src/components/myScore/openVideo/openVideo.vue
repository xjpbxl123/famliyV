<template>
  <div class="openVideo">
    <statusBar/>
    <!--<video :src="videoUrl" class="video" ref="video" preload :class="screenType"></video>-->
    <!--<fh-video ref="video"></fh-video>-->
    <fh-video ref="video" :source="videoUrl" :style="videoStyle" @initComplete="videoInitComplete"/>
    <fh-label ref="nameLabel" :style="labelStyle"/>
    <!--<fh-label :style="labelStyle2"/>-->
    <!--<div class="videoBox" v-if="!isPlaying">-->
    <!--<div class="videoName" v-text="videoName"></div>-->
    <!--<div class="time">-->
    <!--<span class="currentTime"> {{currentTime | timer}}111</span> /-->
    <!--<span class="totalTime"> {{totalTime | timer}}111</span>-->
    <!--</div>-->
    <!--</div>-->
    <div class="halfScreen" v-if="screenIndex !== 0" :class="screenType">
      <div class="halfMess">
        <div class="mess">文件名：<span class="fileName" v-text="fileName"></span></div>
        <div class="mess">分辨率：<span class="screenR">{{screenDPR}}</span></div>
        <div class="mess">持续时间：<span class="duration">{{totalTime | timer}}</span></div>
      </div>
    </div>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
      <icon-item v-for="(button) in controlButtons"
                 :id="button.id"
                 :key="button.id"
                 :hidden="toolbarHidden || isPlaying"
                 :icon="button.icon"
                 :pianoKey="button.pianoKey"
                 :style="{backgroundColor:'#4000',dotColor: '#fff'}"/>
      <icon-item id="899"
                 key="899"
                 icon="0xe60d"
                 text="调音台"
                 pianoKey="97"
                 titlePosition="below"
                 :style="{backgroundColor:'#4000',textColor: '#fff'}"/>
      <icon-item v-for="(button,index) in textButtons"
                 :key="index"
                 :id="button.id"
                 :icon="button.icon"
                 :hidden="toolbarHidden || isPlaying"
                 :text="button.text"
                 :pianoKey="button.pianoKey"
                 titlePosition="below"
                 :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import {
    KEY54,
    KEY56,
    KEY58,
    KEY61,
    KEY97,
    BACK_PRESSED,
    KEY42,
    PEDAL_PRESSED,
    receiveMsgFromWeex,
    TOOLBAR_PRESSED
  } from 'vue-find'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  import { timeFilter } from '../../../scripts/utils'
  import mixerMixin from '../../common/mixer-mixin.js'

  export default {
    data () {
      return {
        labelStyle: {
          left: 50,
          top: 50,
          width: 1000,
          height: 60,
          text: '未知',
          textColor: '#ffffff',
          fontSize: 30,
          alignment: 'left'
        },
        labelStyle2: {
          left: 50,
          top: 100,
          width: 1000,
          height: 150,
          textColor: '#ffffff',
          fontSize: 25
        },
        videoStyle: {
          width: 3840,
          height: 1080
        },
        videoFrameStyle: {
          width: 3840,
          height: 1080
        },
        screenDPR: '未知',
        videoUrl: '',
        toolbarHidden: false,
        videoName: '',
        fileName: '',
        controlButtons: [{
          pianoKey: 54,
          icon: '0xe627',
          id: 200
        }, {
          pianoKey: 56,
          icon: '0xe680',
          id: 201
        }, {
          pianoKey: 58,
          icon: '0xe626',
          id: 202
        }, {
          pianoKey: 61,
          icon: '0xe681',
          id: 203
        }],
        textButtons: [{
          pianoKey: 42,
          icon: '0xe6e2',
          id: 205,
          text: '全屏',
          backgroundColor: '#4000'
        }],
        currentTime: '0',
        totalTime: '0',
        isPlaying: false,
        screenType: 'full',
        screenIndex: 0
      }
    },
    mixins: [mixerMixin],
    filters: {
      timer (value) {
        return timeFilter(value)
      }
    },
    watch: {
      screenType (val) {
        switch (val) {
          case 'full':
            this.textButtons[0].icon = '0xe6e2'
            this.textButtons[0].text = '全屏'
            break
          case 'half-left':
            this.textButtons[0].icon = '0xe6e4'
            this.textButtons[0].text = '左半屏'
            break
          case 'half-right':
          //   this.textButtons[1].icon = '0xe6e4'
          //   this.textButtons[1].text = '右半屏'
          //   break
        }
      }
    },
    find: {
      [KEY42] () {
        this.buttonActions('changeScreen')
      },
      [KEY54] () {
        this.buttonActions('fastBackward')
      },
      [KEY56] () {
        this.buttonActions('play')
      },
      [KEY58] () {
        this.buttonActions('fastForward')
      },
      [KEY61] () {
        this.buttonActions('restart')
      },
      [KEY97] () {
        this.buttonActions('mixer')
      },
      [receiveMsgFromWeex] ({ method, params }) {
        this[method] && this[method](params)
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键 快退
            return this.buttonActions('fastBackward')
          case 117:
            // 踏板2号键 快进
            return this.buttonActions('fastForward')
        }
      },
      [TOOLBAR_PRESSED] ({ hidden }) {
        this.toolbarHidden = hidden
      },
      [BACK_PRESSED] () {
        if (this.toolbarHidden) {
          this.toolbarHidden = false
          return
        }
        if (this.isPlaying) {
          this.$refs.video.pause()
          this.isPlaying = !this.isPlaying
          this.toolbarHidden = false
        } else {
          this.buttonActions('back')
        }
      }
    },
    methods: {
      videoInitComplete (data) {
        // init fh-player volume
        // const self = this
        // this.$volume.getAllVolumeSize().then((data) => {
        //   self.$refs.video.setVolume(data.media.mute ? 0 : (data.media.realValue ? data.media.realValue / 100 : 0))
        // })
        console.log(data, '加载完成')
        this.$refs.video.getTotalTime().then((data) => {
          this.totalTime = data
        })
        this.$refs.video.getVideoSize().then((data) => {
          this.screenDPR = `${data.width} * ${data.height}`
        })
        this.labelStyle.text = this.fileName
        this.hasLoaded = data
        this.$refs.video.setProgressViewHidden(false)
        this.$refs.video.setProgressViewStyle(this.labelStyle2)
        // if (data.result) {
        //   window.fp.uis.video.info().then(data => {
        //     if (data) {
        //       console.log(77777, data)
        //       this.singer = data.artist || '未知'
        //       this.album = data.albumName || '未知'
        //       if (data.title) {
        //         this.songName = data.title
        //       }
        //     }
        //   })
        // }
      },
      buttonActions (type) {
        switch (type) {
          case 'play':
            this.$refs.video.play().then(() => {
              this.$refs.video.reset()
              this.isPlaying = false
            })
            this.isPlaying = true
            break
          case 'changeScreen':
            // 切换屏幕
            let screen = ['full', 'half-left', 'half-right']
            let videoStyles = [{
              width: 3840,
              height: 1080
            }, {
              width: 1920,
              height: 1080
            }, {
              width: 1920,
              height: 1080,
              left: 1920
            }]
            let videoFrameStyles = [{
              width: 3840,
              height: 1080
            }, {
              width: 1920,
              height: 1080
            }, {
              width: 1920,
              height: 1080
            }]
            let screenIndex = this.screenIndex
            screenIndex = screenIndex + 1
            if (screenIndex > 1) screenIndex = 0
            this.screenIndex = screenIndex
            this.screenType = screen[screenIndex]
            this.videoStyle = videoStyles[screenIndex]
            this.videoFrameStyle = videoFrameStyles[screenIndex]
            this.$refs.video.setVideoFrame(Object.assign({ x: 0, y: 0 }, this.videoFrameStyle))
            break
          case 'fastBackward':
            // 快退
            this.$refs.video.fastBackward(10)
            // this.currentTime = Math.max(this.currentTime - 10, 0)
            // this.$refs.video.currentTime = this.currentTime
            break
          case 'fastForward':
            // 快进
            this.$refs.video.fastForward(10)
            // this.currentTime = Math.min(this.currentTime + 10, this.totalTime)
            // if (this.currentTime === this.totalTime) {
            //   this.isPlaying = false
            // }
            // this.$refs.video.currentTime = this.currentTime
            break
          case 'restart':
            // 回到最初
            this.$refs.video.currentTime = 0
            break
          case 'mixer':
            console.log('打开调音台')
            this.openMixer()
            break
          case 'back':
            this.$router.back()
        }
      },
      addEventListeners: function () {
        const self = this
        self.$refs.video.addEventListener('timeupdate', self._currentTime)
        self.$refs.video.addEventListener('canplay', self._durationTime)
      },
      removeEventListeners: function () {
        const self = this
        self.$refs.video.removeEventListener('timeupdate', self._currentTime)
        self.$refs.video.removeEventListener('canplay', self._durationTime)
      },
      _currentTime: function () {
        const self = this
        self.currentTime = parseInt(self.$refs.video.currentTime)
        if (self.currentTime === self.totalTime) {
          this.isPlaying = false
          this.toolbarHidden = false
        }
      },
      _durationTime: function () {
        const self = this
        self.totalTime = parseInt(self.$refs.video.duration)
      },
      filterUrl (fileName) {
        this.fileName = fileName || ''
        let nameArr = fileName.split('.')
        this.videoName = nameArr[0].split('_')[0].split('#~')[0] || ''
      },
      registVloume () {
        // 监听音量设置
        // let self = this
        // 监听方法 volumeWatcher
        // this.$volume.volumeWatcher((data) => {
        //   switch (data.type) {
        //     case 'media': {
        //       self.$refs.video.setVolume(data.mute ? 0 : (data.realValue ? data.realValue / 100 : 0))
        //       break
        //     }
        //     case 'autoPlay': {
        //       self.$refs.video.setAutoPlayOn(!data.mute)
        //       break
        //     }
        //     case 'electronic': {
        //       self.$refs.video.setElectronicOn(!data.mute)
        //       break
        //     }
        //     default: {
        //       console.log('no data.type')
        //     }
        //   }
        // })
        // window.fp.utils.volumeManager.registVolumeChange((data) => {
        //   console.log(data, 'volumeData')
        //   if (data && data.type === 1) {
        //     if (data.mute !== undefined && data.mute === true) {
        //       self.$refs.video.volume = 0
        //     } else {
        //       self.$refs.video.volume = data.realValue
        //     }
        //   }
        // })
      }
    },
    mounted () {
      this.registVloume()
      if (this.$route.query.url) {
        this.filterUrl(this.$route.query.fileName)
        this.videoUrl = this.$route.query.url
      }
      this.$refs.video.setVideoFrame(Object.assign({ x: 0, y: 0 }, this.videoFrameStyle))
      // if (this.$route.query.url) {
      //   this.filterUrl(this.$route.query.fileName)
      //   this.videoUrl = this.$route.query.url
      //   this.addEventListeners()
      // }
    },
    beforeDestroyed () {
      this.removeEventListeners()
    },
    components: {
      statusBar
    }
  }
</script>
<style lang="scss" scoped>
  .openVideo {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: relative;

    video {
      height: 100%;
      position: absolute;

      &.full {
        width: 100%;
      }

      &.half-left {
        width: 50%;
        left: 0;
      }

      &.half-right {
        width: 50%;
        left: 50%;
      }
    }

    .videoBox {
      position: absolute;
      top: 50px;
      left: 40px;

      .videoName {
        font-size: 48px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }

      .time {
        margin-top: 17px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .halfScreen {
      width: 50%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 0;
      background: url('../images/halfScreen_bg.png') no-repeat;
      background-size: cover;

      &.half-right {
        left: 0;
      }

      .halfMess {
        position: absolute;
        top: 476px;
        left: 115px;
        color: #fff;

        .mess {
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          margin-top: 22px;
        }
      }
    }
  }
</style>
