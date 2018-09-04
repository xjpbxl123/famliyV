<template>
  <div class="vidioPlay">
    <h1 v-if="palyHidden" >{{`正在下载中:${progress}%`}}</h1>
    <fh-player ref="player" :source="playerSource" :hidden="palyHidden" :style="{width:3840,height:1080}"
               @initComplete="playerInitComplete">
      <fh-video ref="video" :style="{width:3840,height:1080}">
      </fh-video>
    </fh-player>
    <fh-div :style="labelStyle" :hidden="isPlay || palyHidden">
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
    <fh-weex :style="mixerStyle" ref="mixer" :hidden="mixerHidden"/>
    <toolbar>
      <icon-item v-for="button in videoButton"
              :hidden="!mixerHidden"
              :pianoKey="button.pianoKey"
              :key="button.icon"
              longClick="true"
              :id="button.id"
              :style="{backgroundColor: '#DB652F',dotColor: '#DB652F'}"
              :icon="button.icon"/>
      <icon-item v-for="button in buttons"
              :hidden="!mixerHidden"
              :pianoKey="button.pianoKey"
              :key="button.icon"
              longClick="true"
              :id="button.id"
              :style="{backgroundColor: button.backgroundColor,textColor: '#fff',fontSize:'14'}"
              :text="button.text"
              titlePosition='below'
              :icon="button.icon"/>
      <slider ref="slider" :hidden="!mixerHidden" id="701" :style="{backgroundColor:'#0B8290'}" :value="curBpm" :min="minBPM" :max="maxBPM">
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
  import { download, volume } from 'find-sdk'
  import { KEY80, KEY78, KEY82, KEY68, KEY73, KEY74, KEY58, KEY75, receiveMsgFromWeex, BACK_PRESSED } from 'vue-find'
  import {getCurEnvs} from 'scripts/utils'
  export default {
    data () {
      return {
        progress: 0,
        palyHidden: true,
        toolbarHidden: false,
        playerSource: {
          mp4: {
            videoUrl: '',
            midiUrl: ''
          }
        },
        buttons: [
          {
            pianoKey: 68,
            icon: '0xe635',
            id: 205,
            backgroundColor: '#1078cc',
            text: '视频列表'
          },
          {
            pianoKey: 58,
            icon: '0xe635',
            id: 206,
            backgroundColor: '#1078cc',
            text: '调音台'
          }
        ],
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
        mixerStyle: {
          right: 0,
          top: 280,
          width: 3840,
          height: 800
          // backgroundColor: '#767676'
        },
        videoButton: [
          {
            pianoKey: 78,
            icon: '0xe683',
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
        mixerHidden: true,
        index: 0,
        progressing: false,
        files: [],
        orgBpm: 120,
        curBpm: 120
      }
    },
    find: {
      [KEY80] () {
        /**
         * @desc 暂停或者播放
         */
        this.playOrpause()
      },
      [KEY73] () {
        /**
         * @desc 速率减
         */
        let newBpm = this.curBpm - 20
        if (newBpm < this.minBPM) {
          return
        }
        let newRate = newBpm / this.orgBpm
        this.$refs.player.setRate(newRate)
        this.curBpm = newBpm
      },
      [KEY74] () {
        /**
         * @desc 速率加
         */
        this.$refs.player.setRate(1)
        this.curBpm = this.orgBpm
      },
      [KEY75] () {
        /**
         * @desc 速率加
         */
        let newBpm = this.curBpm + 20
        if (newBpm > this.maxBPM) {
          return
        }
        let newRate = newBpm / this.orgBpm
        this.$refs.player.setRate(newRate)
        this.curBpm = newBpm
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
      [KEY58] () {
        /**
         * @desc 打开调音台
         */
        let self = this
        if (!self.weexHidden) {
          self.$find.sendMessage({
            method: 'controlButton',
            params: {show: false}
          })
        }
        self.$refs.mixer.focus()
        self.mixerHidden = !self.mixerHidden
        self.weexHidden = !self.mixerHidden
        volume.getAllVolumeSize().then(data => {
          console.log(data, 'data')
          console.log(self.$find)
          self.$find.sendMessage({
            method: 'allVolumeSize',
            params: data
          })
        })
        self.$find.sendMessage({
          method: 'controlButtons',
          params: {show: true}
        })
      },
      [KEY68] () {
        /**
         * @desc 打开视频列表
         */
        this.$refs.weex.focus()
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
        })
      },
      [receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      },
      [BACK_PRESSED] () {
        if (!this.mixerHidden) {
          this.mixerHidden = !this.mixerHidden
          this.$find.sendMessage({
            method: 'controlButtons',
            params: {show: !this.mixerHidden}
          })
        } else {
          this.$router.back()
        }
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
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        this.$refs.mixer.openUrl(`${weexUrl}components/mixer/mixer.js`).then((res) => {
          if (res.result) {
            this.$refs.weex.openUrl(`${weexUrl}components/videoDirectory/videoDirectory.js`)
          }
        })
        console.log(`${weexUrl}components/videoDirectory/videoDirectory.js`)
      })
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
            mp4: {
              videoUrl: data[0].path,
              midiUrl: data[1].path
            }
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
              mp4: {
                videoUrl: data[0].path,
                midiUrl: data[1].path
              }
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
        console.log(this.playerSource)
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
      playerInitComplete (data) {
        let self = this
        this.$refs.player.info().then((data) => {
          self.orgBpm = data.originalBpm
          self.curBpm = data.curBpm
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
      },
      vioceControl (data) {
        switch (data.name) {
          case 'setMute':
            console.log(data, 'data')
            volume.volumeMute(data.type, data.value)
            break
          case 'volumeSet':
            volume.volumeSet(data.type, data.value, false).then(data => {
              console.log(data)
            })
            break
        }
      },
      mute (data) {
        console.log(data)
      },
      add (data) {
        console.log(data, 'data')
      }
    },
    computed: {
      ...mapState({
        'famousPlayCoursesBySet': function (state) {
          return state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID] || {courseList: []}
        }
      }),
      ...mapGetters([]),
      minBPM () {
        return this.orgBpm * 0.5
      },
      maxBPM () {
        return this.orgBpm * 1.5
      }
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
