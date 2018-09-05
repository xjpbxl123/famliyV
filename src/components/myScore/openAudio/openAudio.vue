<template>
  <div class="openAudio">
    <statusBar/>
    <video :src="audioUrl" class="audio" ref="audio" preload></video>
    <div class="audioBox">
        <div class="audioMenu">
            <span class="audioName" v-text="name"></span>
            <div class="time"><span class="currentTime" v-text="currentTime"></span> / <span classs="totalTime" v-text="totalTime"></span></div>
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
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button) in controlButtons"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :longClick="button.longClick"
            :style="{backgroundColor:'#3000',dotColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED } from 'vue-find'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  export default {
    data () {
      return {
        audioUrl: '',
        toolbarHidden: false,
        name: '汤姆家的猫',
        fileName: '汤姆家的猫',
        songName: '汤姆家的猫',
        singer: '毛阿敏',
        album: '汤姆家的猫',
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
          }, {
            pianoKey: 82,
            icon: '0xe60d',
            id: 204
        }],
        currentTime: '00:00',
        totalTime: '00:00',
        isPlaying: false
      }
    },
    find: {
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
