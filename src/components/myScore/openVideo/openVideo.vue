<template>
  <div class="openVideo">
    <statusBar/>
    <video :src="audioUrl" class="audio" ref="audio" preload :class="{'fullScreen': fullScreen}"></video>
    <div class="videoBox">
      <div class="videoName" v-text="videoName"></div>
      <div class="time">
        <span class="currentTime" v-text="currentTime"> </span> /
        <span class="totalTime" v-text="totalTime"> </span>
      </div>
    </div>
    <div class="pauseLogo" :class="{'fullScreen': fullScreen}"></div>
    <div class="halfScreen" v-if="!fullScreen">
      <div class="halfMess">
        <div class="mess">文件名：<span class="fileName" v-text="fileName"></span></div>
        <div class="mess">分辨率：<span class="screenR" >1200*600</span></div>
        <div class="mess">持续时间：<span class="duration" v-text="totalTime"></span></div>
      </div>
    </div>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button) in controlButtons"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :style="{backgroundColor:'#3000',dotColor: '#fff'}"/>
        <icon-item v-for="(button,index) in textButtons"
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
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED, KEY66 } from 'vue-find'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  export default {
    data () {
      return {
        audioUrl: '',
        toolbarHidden: false,
        videoName: '汤姆家的猫',
        fileName: '汤姆家的猫.mp4',
        controlButtons: [
          {
            pianoKey: 73,
            icon: '0xe627',
            id: 200
          },
          {
            pianoKey: 75,
            icon: '0xe680',
            id: 201
          },
          {
            pianoKey: 78,
            icon: '0xe626',
            id: 202
          },
          {
            pianoKey: 80,
            icon: '0xe681',
            id: 203
        }],
        textButtons: [{
          pianoKey: 82,
          icon: '0xe60d',
          id: 204,
          text: '调音台'
        }, {
          pianoKey: 66,
          icon: '0xe625',
          id: 205,
          text: '全屏'
        }],
        currentTime: '00:00',
        totalTime: '00:00',
        isPlaying: false,
        fullScreen: true
      }
    },
    find: {
      [KEY66] () {
        this.buttonActions('changeScreen')
      },
      [KEY73] () {
        this.buttonActions('fastBackward')
      },
      [KEY75] () {
        console.log(this.$refs.audio)
        if (!this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      },
      [KEY78] () {
        this.buttonActions('fastForward')
      },
      [KEY80] () {
        this.buttonActions('restart')
      },
      [KEY82] () {
        this.buttonActions('mixer')
      },
      [BACK_PRESSED] () {
        this.$router.back()
      }
    },
    methods: {
      buttonActions (type) {
        switch (type) {
          case 'changeScreen':
            this.fullScreen = !this.fullScreen
            break
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
        console.log(this.$refs.audio.currentTime)
      },
      _durationTime: function () {
        const self = this
        self.totalTime = parseInt(self.$refs.audio.duration)
        console.log(this.$refs.audio.duration)
      }

    },
    mounted () {
      if (this.$route.query.url) {
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
    .openVideo {
        width: 100%;
        height: 100%;
        position: relative;
        video {
          width: 50%;
          height: 100%;
          &.fullScreen {
            width: 100%;
          }
        }
        .videoBox {
          position: absolute;
          top: 50px;
          left: 40px;
          .videoName {
            font-size:48px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(255,255,255,1);
          }
          .time {
            margin-top: 17px;
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
        .pauseLogo {
          width: 200px;
          height: 200px;
          position: absolute;
          top: 440px;
          left: 860px;
          background: url('../images/pauseLogo.png') no-repeat;
          background-size: cover;
          &.fullScreen {
            left: 50%;
            transform: translateX(-50%);
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
          .halfMess {
            position: absolute;
            top: 476px;
            left: 115px;
            color: #fff;
            .mess {
              font-size:28px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              margin-top: 22px;
            }
          }
        }
    }
</style>
