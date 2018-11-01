<template>
  <div class="openAudio">
    <statusBar/>
    <audio :src="audioUrl" class="audio" ref="audio" preload></audio>
    <div class="audioBox">
        <div class="audioMenu">
            <span class="audioName" v-text="songName"></span>
            <div class="time"><span class="currentTime">{{currentTime | timer}}</span> / <span classs="totalTime" >{{totalTime | timer}}</span></div>
            <div class="audioMess">
              <div class="mess">文件名：<span class="fileName" v-text="fileName"></span></div>
              <div class="mess">歌曲名：<span class="songName" v-text="songName"></span></div>
              <div class="mess">艺人：<span class="singer" v-text="singer"></span></div>
              <div class="mess">专辑：<span class="album" v-text="album"></span></div>
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
        isPlaying: false
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
            this.isPlaying ? this.$refs.audio.pause() : this.$refs.audio.play()
            this.isPlaying = !this.isPlaying
            break
          case 'fastBackward':
            // 快退
            this.currentTime = Math.max(this.currentTime - 10, 0)
            this.$refs.audio.currentTime = this.currentTime
            break
          case 'fastForward':
            // 快进
            this.currentTime = Math.min(this.currentTime + 10, this.totalTime)
            if (this.currentTime === this.totalTime) {
              this.isPlaying = false
            }
            this.$refs.audio.currentTime = this.currentTime
            break
          case 'restart':
            // 回到最初
            this.$refs.audio.currentTime = 0
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
        self.$refs.audio.addEventListener('timeupdate', self._currentTime)
        self.$refs.audio.addEventListener('canplay', self._durationTime)
      },
      removeEventListeners: function () {
        const self = this
        self.$refs.audio.removeEventListener('timeupdate', self._currentTime)
        self.$refs.audio.removeEventListener('canplay', self._durationTime)
      },
      _currentTime: function () {
        const self = this
        self.currentTime = parseInt(self.$refs.audio.currentTime)
        if (self.currentTime === self.totalTime) {
          this.isPlaying = false
        }
      },
      _durationTime: function () {
        const self = this
        self.totalTime = parseInt(self.$refs.audio.duration)
      },
      filterUrl (fileName) {
        this.fileName = fileName || ''
        let nameArr = fileName.split('.')
        this.songName = nameArr[0].split('_')[0]
      }
    },
    mounted () {
      if (this.$route.query.url) {
        this.filterUrl(this.$route.query.fileName)
        this.audioUrl = this.$route.query.url
        this.addEventListeners()
      }
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
