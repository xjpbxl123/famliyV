<template>
  <div class="openAudio">
    <statusBar/>
    <!-- <audio :src="audioUrl" class="audio" ref="audio" preload></audio> -->
    <fh-audio ref="audio" :style="{top: 0, widht: 0, height: 0}" />
    <div class="audioBox">
        <div class="audioMenu">
            <span class="audioName" v-text="songName"></span>
            <div class="time"><span class="currentTime">{{currentTime | timer}}</span> / <span classs="totalTime" >{{totalTime | timer}}</span></div>
            <div class="audioMess">
              <div class="mess">文件名：<span class="fileName" v-text="fileName"></span></div>
              <div class="mess">歌曲名：<span class="songName" v-text="songName || '未知'"></span></div>
              <div class="mess">艺人：<span class="singer" v-text="singer || '未知'"></span></div>
              <div class="mess">专辑：<span class="album" v-text="album || '未知'"></span></div>
            </div>
        </div>
        <div class="songSpan">
          <span class="iconfont icon-song songIcon"></span>
        </div>
    </div>
    <toolbar :darkBgHidden="true" >
        <icon-item v-for="(button) in controlButtons"
            :hidden="toolbarHidden"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :longClick="button.longClick"
            :style="{backgroundColor:'#4000',dotColor: '#fff'}"/>
        <icon-item v-for="(button,index) in textButtons"
            :hidden="toolbarHidden"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { KEY54, KEY56, KEY58, KEY61, KEY97, BACK_PRESSED, PEDAL_PRESSED, receiveMsgFromWeex } from 'vue-find'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  import {timeFilter} from '../../../scripts/utils'
  import mixerMixin from '../../common/mixer-mixin.js'
  export default {
    data () {
      return {
        audioUrl: '',
        toolbarHidden: false,
        fileName: '',
        songName: '',
        singer: '',
        album: '',
        playerHidden: true,
        audioSource: {
          mp3: {
            accompanyUrl: ''
          },
          options: {
            countDownEnable: false
          }
        },
        controlButtons: [
          {
            pianoKey: 54,
            icon: '0xe627',
            id: 200
          },
          {
            pianoKey: 56,
            icon: '0xe680',
            id: 201
          },
          {
            pianoKey: 58,
            icon: '0xe626',
            id: 202
          },
          {
            pianoKey: 61,
            icon: '0xe681',
            id: 203
        }],
        textButtons: [ {
          pianoKey: 97,
          icon: '0xe60d',
          id: 204,
          text: '调音台',
          backgroundColor: '#4000'
        }],
        currentTime: '0',
        totalTime: '0',
        isPlaying: false,
        interval: null,
        hasLoaded: false,
        interval1: null
      }
    },
    mixins: [mixerMixin],
    filters: {
      timer (value) {
        return timeFilter(value)
      }
    },
    watch: {
      isPlaying (val) {
        if (val) {
          this.controlButtons[1].icon = '0xe673'
        } else {
          this.controlButtons[1].icon = '0xe680'
        }
      }
    },
    find: {
      [KEY54] () {
        this.buttonActions('fastBackward')
      },
      [KEY56] () {
        this.buttonActions('playOrPause')
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
      [BACK_PRESSED] () {
        this.buttonActions('back')
      },
      [receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      }
    },
    methods: {
      buttonActions (type) {
        switch (type) {
          case 'playOrPause':
            if (!this.hasLoaded) {
              return
            }
            if (this.isPlaying) {
              window.fp.uis.audio.pause().then(data => {
                console.log('播放完成', data)
              })
            } else {
              this.play()
            }
            this.isPlaying = !this.isPlaying
            break
          case 'fastBackward':
            // 快退
            let currentTime = this.currentTime
            currentTime = Math.max(this.currentTime - 10, 0)
            window.fp.uis.audio.seekTo(currentTime)
            this.getCurrentTime()
            break
          case 'fastForward':
            // 快进
            let currentTime1 = this.currentTime
            currentTime1 = Math.min(this.currentTime + 10, this.totalTime)
            console.log(currentTime1)
            window.fp.uis.audio.seekTo(currentTime1)
            this.getCurrentTime()
            break
          case 'restart':
            // 回到最初
            window.fp.uis.audio.reset()
            this.getCurrentTime()
            if (this.isPlaying) {
              this.play()
            }
            break
          case 'mixer':
            console.log('打开调音台')
            this.openMixer()
            break
          case 'back':
            this.$router.back()
        }
      },
      play () {
        this.$refs.audio.play().then(data => {
          console.log('播放完成', data)
          this.isPlaying = false
          window.fp.uis.audio.reset()
          this.getCurrentTime()
          clearInterval(this.interval)
        })
        this.interval = setInterval(() => {
          this.getCurrentTime()
        }, 200)
      },
      getCurrentTime: function () {
        const self = this
        window.fp.uis.audio.getCurrentTime().then(data => {
          self.currentTime = parseInt(data)
        })
        if (self.currentTime === self.totalTime && self.currentTime !== 0) {
          self.isPlaying = false
        }
      },
      getTotalTime: function () {
        const self = this
        this.interval1 = setInterval(() => {
          window.fp.uis.audio.getTotalTime().then(data => {
            if (data !== undefined) {
              self.totalTime = parseInt(data)
              clearInterval(this.interval1)
            }
          })
        }, 200)
      },
      filterUrl (fileName) {
        this.fileName = fileName || ''
        let nameArr = fileName.split('.')
        this.songName = nameArr[0].split('_')[0]
      },
      registVloume () {
        // 监听音量设置
        let self = this
        // 监听方法 volumeWatcher
        this.$volume.volumeWatcher((data) => {
          switch (data.type) {
            case 'media': {
              self.$refs.player.setVolume(data.realValue ? data.realValue / 100 : 0)
              break
            }
            case 'autoPlay': {
              self.$refs.player.setAutoPlayOn(!data.mute)
              break
            }
            case 'electronic': {
              self.$refs.player.setElectronicOn(!data.mute)
              break
            }
            default: {
              console.log('no data.type')
            }
          }
        })
        // window.fp.utils.volumeManager.registVolumeChange((data) => {
        //   console.log(data, 'volumeData')
        //   if (data && data.type === 1) {
        //     if (data.mute !== undefined && data.mute === true) {
        //       self.$refs.audio && self.$refs.audio.setVolume(0)
        //     } else {
        //       self.$refs.audio && self.$refs.audio.setVolume(data.realValue)
        //     }
        //   }
        // })
      }
    },
    mounted () {
      this.registVloume()
      if (this.$route.query.url) {
        this.filterUrl(this.$route.query.fileName)
        this.$refs.audio.loadUrl(this.$route.query.url).then(data => {
          console.log(data, '加载完成')
          this.hasLoaded = data
          if (data.result) {
            this.getTotalTime()
            window.fp.uis.audio.info().then(data => {
              if (data) {
                this.singer = data.artist || '未知'
                this.album = data.albumName || '未知'
                if (data.title) {
                  this.songName = data.title
                }
              }
            })
          }
        })
      }
    },
    beforeDestroyed () {
      clearInterval(this.interval)
      clearInterval(this.interval1)
    },
    components: {
      statusBar
    }
  }
</script>
<style lang="scss" scoped>
    .openAudio {
        width: 100%;
        height: 100%;
        position: relative;
        .audioBox {
            width: 1200px;
            height: 600px;
            position: absolute;
            top: 241px;
            left: 605px;
            background:rgba(0,0,0,0.2);
            border-radius:10px;
            padding: 0 100px;
            color:#fff;
            .audioName {
              font-size:48px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              display: block;
              margin-top: 49px;
              width: 460px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .time {
              font-size:20px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              margin-top: 17px;
              font-family:PingFangSC-Regular;
              font-weight:400;
            }
            .audioMess {
              margin-top: 51px;
              font-size:28px;
              .mess {
                margin-top: 22px;
                width: 460px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
            .songSpan {
              position: absolute;
              top: 49px;
              right: 100px;
              width: 500px;
              height: 500px;
              background:rgba(245,245,245,1);
              box-shadow:0px 10px 20px 0px rgba(0,0,0,0.5);
              border-radius:16px;
              border:1px solid rgba(155,155,155,1);
              .songIcon {
                font-size: 200px;
                color: #9B9B9B;
                opacity: 0.5;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
              }
            }
        }
    }
</style>
