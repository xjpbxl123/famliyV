<template>
  <div class='vidioPlay'>
    <h1 v-if="palyHidden">{{`正在下载中:${progress}%`}}</h1>
    <fh-player ref="player" :source="playerSource" :hidden="palyHidden" :style="{width:3840,height:1080}"
               @initComplete="playerInitComplete">
      <fh-video :style="{width:3840,height:1080}">
        <fh-label></fh-label>
      </fh-video>
    </fh-player>
    <fh-weex  :style="weexStyle" ref="weex" :hidden="weexHidden"/>
    <toolbar>
      <icon-item v-for="button in videoButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 longClick="true"
                 :id="button.id"
                 :style="{backgroundColor:'#DB652F',dotColor:'#FFD194'}"
                 :icon="button.icon"/>
    </toolbar>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .vidioPlay {
    background: url(../video_bg.png) no-repeat !important;
    background-size: cover;
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
    }
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import { download } from 'find-sdk'
  import { KEY80, KEY70, receiveMsgFromWeex } from 'vue-find'

  export default {
    data () {
      return {
        progress: 0,
        palyHidden: true,
        playerSource: {
          videoUrl: '',
          midiUrl: ''
        },
        labelStyle: {
          left: 100,
          top: 100,
          width: 150,
          height: 150,
          text: 'test',
          color: '#ef0000',
          fontSize: 30,
          borderWidth: 3,
          borderColor: '#ff00ee'
        },
        weexStyle: {
          right: -690,
          bottom: 0,
          width: 690,
          height: 1080,
          borderWidth: 3
        },
        videoButton: [
          {
            pianoKey: 78,
            icon: '0e683',
            id: 201
          },
          {
            pianoKey: 80,
            icon: '0xe657',
            id: 202
          },
          {
            pianoKey: 82,
            icon: '0xe682',
            id: 203
          },
          {
            pianoKey: 70,
            icon: '0xe635'
          }
        ],
        isPlay: false,
        weexHidden: true,
        index: 0,
        progressing: false,
        files: []
      }
    },
    find: {
      [KEY80] () {
        /**
         * @desc 暂停或者播放
         */
        this.playOrpause()
      },
      [KEY70] () {
        /**
         * @desc 打开视频列表
         */

        let flag = false
        if (this.weexHidden) {
          this.showWeex()
          flag = true
        }
        this.$refs.weex.animation({
          duration: 800,
          timingFunction: 'ease',
          styles: {
            transform: !flag ? 'translateX(690px)' : 'translateX(-690px)'
          }
        }).then((data) => {
          if (flag) {
            return
          }
          if (!this.weexHidden) {
            this.showWeex()
          }
          console.log(data)
        })
      },
      [receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      }
    },
    created () {
      let courseSetID = this.$route.query.courseSetID
      /**
       * @desc 根据courseSetID获取教程视频文件列表
       */
      this.getCoursesBySet(courseSetID)
    },
    mounted () {
      let weexUrl = process.env[process.env.NODE_ENV].WEEX_URL
      this.$refs.weex.openUrl(`${weexUrl}components/videoDirectory/videoDirectory.js`)
    },
    methods: {
      getCoursesBySet (courseSetID) {
        this.$store.dispatch('famous/getCoursesBySet', {courseSetID})
      },
      /**
       * @desc 一进入页面就下载第一个
       **/
      download (videolist) {
        let video = videolist.data.videoHighBitRate
        let midi = videolist.data.midiHighBitRate
        return download.downloadAll([video, midi]).progress((process) => {
          this.progress = parseInt(process.allProgress * 100)
        }).then((data) => {
          this.playerSource = {
            videoUrl: data[0].path,
            midiUrl: data[1].path
          }
          this.sendMessageAgain()
        })
      },
      /**
       * weex通知下载
       **/
      weexDownload ({courseItem, index, isDownload}) {
        if (this.progressing && !isDownload) {
          download.abortAll(this.files).then((data) => {
            console.log(data)
          })
        } else {
          this.continueDownload(courseItem, index, isDownload)
        }
      },
      continueDownload (courseItem, index, isDownload) {
        let video = courseItem.data.videoHighBitRate
        let midi = courseItem.data.midiHighBitRate
        this.files = [video, midi]
        return download.downloadAll([video, midi]).progress((process) => {
          this.progressing = true
          this.$find.sendMessage({
            method: 'weexProgress',
            params: {progress: parseInt(process.allProgress * 100), index}
          })
        }).then((data) => {
          this.progressing = false
          if (isDownload) {
            this.isPlay && this.playOrpause()
            this.playerSource = {
              videoUrl: data[0].path,
              midiUrl: data[1].path
            }
          } else {
            this.sendMessageAgain()
          }
        })
      },
      sendMessageAgain () {
        this.$store.dispatch('famous/videoHasDownload', {
          courseSetID: this.$route.query.courseSetID,
          body: this.famousPlayCoursesBySet
        }).then(() => {
          this.sendMessage()
        })
      },
      playOrpause () {
        this.isPlay ? this.$refs.player.pause() : this.$refs.player.play()
        this.isPlay = !this.isPlay
      },
      showWeex () {
        if (!this.palyHidden) {
          // 视频下载完成
          this.weexHidden = !this.weexHidden
          this.$find.sendMessage({
            method: 'controlButton',
            params: {show: !this.weexHidden}
          })
        }
      },
      /**
       * @desc video init successful
       */
      playerInitComplete () {
        // this.$refs.player.play()
      },
      sendMessage () {
        this.$find.sendMessage({method: 'getVideoList', params: {videoList: this.famousPlayCoursesBySet}})
      }
    },
    computed: {
      ...mapState({
        'famousPlayCoursesBySet': function (state) {
          return state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID] || {courseList: []}
        }
      }),
      ...mapGetters([])
    },
    watch: {
      isPlay (val) {
        this.videoButton[1].icon = val ? '0xe673' : '0xe657'
      },
      famousPlayCoursesBySet (val) {
        if (val.courseList.length > 0 && this.palyHidden && this.weexHidden) {
          this.download(val.courseList[0]).then(() => {
            this.palyHidden = false
          })
        }
      }
    },
    beforeDestroy () {
    }
  }
</script>
