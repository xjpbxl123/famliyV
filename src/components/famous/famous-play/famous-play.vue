<template>
  <div class='vidioPlay'>
    <h1 v-if="palyHidden">{{`正在下载中:${progress}%`}}</h1>
    <fh-player ref="player" :source="playerSource" :hidden="palyHidden" :style="{width:3840,height:1080}"
               @initComplete="playerInitComplete">
      <fh-video ref="video" :style="{width:3840,height:1080}">
      </fh-video>
    </fh-player>
    <fh-div :style="labelStyle" :hidden="isPlay && !palyHidden">
      <fh-label :style="videoNameStyle">
      </fh-label>
      <fh-label :style="currentTime">
      </fh-label>
      <fh-label :style="flag">
      </fh-label>
      <fh-label :style="totalTime">
      </fh-label>
    </fh-div>
    <fh-weex :style="weexStyle" ref="weex" :hidden="weexHidden"/>
    <toolbar>
      <icon-item v-for="button in videoButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 longClick="true"
                 :id="button.id"
                 :style="{backgroundColor: '#DB652F',dotColor: '#DB652F'}"
                 :icon="button.icon"/>
      <icon-item
        pianoKey="68"
        key="0xe635"
        longClick="true"
        id="205"
        :style="{backgroundColor: '#1078cc',textColor: '#fff',fontSize:'14'}"
        text="视频列表"
        titlePosition='below'
        icon="0xe635"/>
      <slider ref="slider" id="701" :style="{backgroundColor:'#0B8290'}" :value="speedValue" min="100" max="200">
        <titleitem text="-" id="710" pianoKey="73"/>
        <titleitem text="调速" id="712" pianoKey="74" :style="{fontSize:'14'}"/>
        <titleitem text="+" id="714" pianoKey="75"/>
      </slider>

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
  import { KEY80, KEY78, KEY82, KEY68, receiveMsgFromWeex } from 'vue-find'

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
          left: 6,
          top: 27,
          width: 420,
          height: 130,
          text: '',
          backgroundColor: '#50000000',
          borderRadius: 16
        },
        videoNameStyle: {
          left: 6,
          top: 27,
          width: 420,
          height: 40,
          text: '',
          color: '#fff',
          fontSize: 48,
          textAlign: 'left'
        },
        currentTime: {
          left: 6,
          top: 70,
          width: 120,
          height: 50,
          text: '00:00',
          color: '#fff',
          fontSize: 30
        },
        flag: {
          left: 120,
          top: 70,
          width: 20,
          height: 50,
          text: '/',
          color: '#fff',
          fontSize: 30
        },
        totalTime: {
          left: 140,
          top: 70,
          width: 120,
          height: 50,
          text: '00:00',
          color: '#fff',
          fontSize: 30
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
          }
        ],
        isPlay: false,
        weexHidden: true,
        index: 0,
        progressing: false,
        files: [],
        speedValue: 100
      }
    },
    find: {
      [KEY80] () {
        /**
         * @desc 暂停或者播放
         */
        this.playOrpause()
      },
      [KEY78] () {
        /**
         * @desc 视频快退
         */
        this.$refs.player.fastBackward(10)
      },
      [KEY82] () {
        /**
         * @desc 视频快进
         */
        this.$refs.player.fastForward(10)
      },
      [KEY68] () {
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
        console.log(courseItem, index, isDownload)

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
        console.log(video, midi)

        this.files = [video, midi]
        return download.downloadAll([video, midi]).progress((process) => {
          console.log(`进度：${process.allProgress}`)
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
            this.videoNameStyle.text = courseItem.courseName
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
        if (this.isPlay) {
          this.$refs.player.pause()
        } else {
          this.$refs.player.play().then((data) => {
            this.isPlay = false
            this.$refs.player.reset()
          })
        }
        this.isPlay = !this.isPlay
        if (!this.isPlay) {
          this.$refs.video.getTotalTime().then((data) => {
            let timeString = this.timeFilter(data)
            this.totalTime.text = timeString
          })
          this.$refs.video.getCurrentTime().then((data) => {
            let timeString1 = this.timeFilter(data)
            this.currentTime.text = timeString1
          })
        }
      },
      timeFilter (time) {
        time = parseInt(time)
        let mm = parseInt(time / 60)
        if (mm < 10) {
          mm = String('0' + mm)
        }
        let ss = parseInt(time % 60)
        if (ss < 10) {
          ss = String('0' + ss)
        }
        return mm + ':' + ss
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
        this.$refs.player.info().then((data) => {
          console.log(data, 'data')
          this.speedValue = parseInt(data.curRate * data.curBpm)
        })
        this.$refs.video.getTotalTime().then((data) => {
          let timeString = this.timeFilter(data)
          this.totalTime.text = timeString
        })
        this.$refs.video.getCurrentTime().then((data) => {
          let timeString1 = this.timeFilter(data)
          this.currentTime.text = timeString1
        })
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
            this.videoNameStyle.text = val.courseList[0].courseName
            this.palyHidden = false
          })
        }
      }
    },
    beforeDestroy () {
    }
  }
</script>
