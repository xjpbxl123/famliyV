<template>
  <div class="vidioPlay">
    <h1 v-if="palyHidden" v-text="'正在下载中:'+progress+'%'"></h1>
    <fh-player  ref="player" :source="playerSource" :hidden="palyHidden" :style="{width:3840,height:1080}"
               @initComplete="playerInitComplete">
      <fh-video ref="video" :style="{width:3840,height:1080}">
      </fh-video>
    </fh-player>
    <fh-div :style="labelStyle" :hidden="palyHidden">
      <fh-label :style="currentTime">
      </fh-label>
      <fh-label :style="flag">
      </fh-label>
      <fh-label :style="totalTime">
      </fh-label>
    </fh-div>
    <fh-weex :style="weexStyle" ref="weex" />
    <fh-weex :style="mixerStyle" ref="mixer" :hidden="mixerHidden"/>
    <fh-weex :style="toastStyle" ref="toast" :hidden="toastHidden" />
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden1">
      <icon-item v-for="button in videoButton"
              :hidden="toolbarHidden"
              :pianoKey="button.pianoKey"
              :key="button.icon"
              longClick="true"
              :id="button.id"
              :style="{backgroundColor: '#DB652F',dotColor: '#DB652F'}"
              :icon="button.icon"/>
      <icon-item v-for="button in buttons"
              :hidden="toolbarHidden"
              :pianoKey="button.pianoKey"
              :key="button.icon"
              longClick="true"
              :id="button.id"
              :style="{backgroundColor: button.backgroundColor,textColor: '#fff',fontSize:'14'}"
              :text="button.text"
              titlePosition='below'
              :icon="button.icon"/>
      <slider ref="slider" :hidden="toolbarHidden" id="701" :style="{backgroundColor:'#0B8290'}" :value="curBpm" :min="minBPM" :max="maxBPM">
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
      left: 32%;
      font-size: 40px;
    }
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import { download } from 'find-sdk'
  import { KEY80, KEY78, KEY82, KEY66, KEY68, KEY73, KEY74, KEY58, KEY75, receiveMsgFromWeex, BACK_PRESSED, PEDAL_PRESSED, TOOLBAR_PRESSED } from 'vue-find'
  import {getCurEnvs} from 'scripts/utils'
  import mixerMixin from '../../common/mixer-mixin.js'
  export default {
    data () {
      return {
        progress: 0,
        palyHidden: true,
        toolbarHidden: true,
        toolbarHidden1: false,
        toastHidden: true,
        playerSource: {
          mp4: {
            videoUrl: '',
            videoMidiUrl: ''
          }
        },
        buttons: [
          {
            pianoKey: 66,
            icon: '0xe623',
            id: 207,
            backgroundColor: '#1078cc',
            text: '练习'
          },
          {
            pianoKey: 68,
            icon: '0xe635',
            id: 205,
            backgroundColor: '#1078cc',
            text: '视频列表'
          },
          {
            pianoKey: 58,
            icon: '0xe60d',
            id: 206,
            backgroundColor: '#1078cc',
            text: '调音台'
          }
        ],
        labelStyle: {
          left: 6,
          top: 4,
          width: 420,
          height: 50,
          text: '',
          borderRadius: 16
        },
        toastStyle: {
          color: '#fff',
          fontSize: 36,
          width: 640,
          height: 360,
          top: 500,
          left: 2043,
          borderRadius: 16
        },
        currentTime: {
          left: 6,
          top: 0,
          width: 110,
          height: 50,
          text: '00:00',
          color: '#fff',
          fontSize: 30,
          temp: 0
        },
        flag: {
          left: 110,
          top: 0,
          width: 20,
          height: 50,
          text: '/',
          color: '#fff',
          fontSize: 30
        },
        totalTime: {
          left: 120,
          top: 0,
          width: 120,
          height: 50,
          text: '00:00',
          color: '#fff',
          fontSize: 30,
          temp: 0
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
        curBpm: 120,
        inter: null,
        playNow: false,
        playIndex: 0,
        interval: null
      }
    },
    mixins: [mixerMixin],
    find: {
      [TOOLBAR_PRESSED] ({hidden}) {
        this.toolbarHidden1 = hidden
      },
      [KEY66] () {
        /**
         * @desc 练习
         */
        if (!this.famousPlayCoursesBySet) {
          return
        }
        let course = this.famousPlayCoursesBySet.courseList[this.index]
        let scoreData = {}
        if (!course) {
          return
        }
        let {courseSetName, courseName} = course
        let authorName = this.$route.query.authorName
        let id = course.correlationMusic[0].bookId
        let coverSmall = course.correlationMusic[0].coverSmall
        Object.assign(scoreData, {courseSetName, courseName, id, coverSmall, authorName})
        console.log(scoreData)
        this.$router.push({
          path: '/scoreList',
          query: {famous: JSON.stringify(scoreData)}
        })
      },
      [KEY80] () {
        /**
         * @desc 暂停或者播放
         */
        this.play()
      },
      [KEY73] () {
        this.delRate()
      },
      [KEY74] () {
        this.$refs.player.setRate(1)
        this.curBpm = this.orgBpm
      },
      [KEY75] () {
        this.addRate()
      },
      [KEY78] () {
        this.fastBackward()
      },
      [KEY82] () {
        this.fastForward()
      },
      [KEY58] () {
        /**
         * @desc 打开调音台
         */
        let self = this
        self.mixerHidden = !self.mixerHidden
        self.toolbarHidden = !self.toolbarHidden
        self.weexHidden = !self.mixerHidden
        self.initMixerData()
      },
      [KEY68] () {
        /**
         * @desc 打开视频列表
         */
        this.$refs.weex.focus()
        this.toolbarHidden = true
        this.showWeex()
      },
      [receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      },
      [BACK_PRESSED] () {
        if (this.isPlay) {
          // 如果在播放 暂停
          this.isPlay = false
          this.toolbarHidden = false
          clearInterval(this.interval)
          return this.$refs.player.pause()
        }
        if (!this.mixerHidden) {
          if (this.toolbarHidden1) {
            this.toolbarHidden1 = false
          } else {
            this.mixerHidden = !this.mixerHidden
            this.toolbarHidden = !this.toolbarHidden
            this.closeMixer()
          }
        } else {
          if (this.toolbarHidden1) {
            this.toolbarHidden1 = false
          } else {
            if (!this.weexHidden) {
              this.hideWeex()
              this.toolbarHidden = false
            } else {
              this.$router.back()
            }
          }
        }
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键
            return this.fastBackward()
          case 117:
            // 踏板2号键
            return this.fastForward()
          case 118:
            return this.delRate()
          case 119:
            return this.addRate()
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
        this.$refs.weex.openUrl(`${weexUrl}components/videoDirectory/videoDirectory.js`, {}).then((res) => {
          console.log(res, 'res1')
          if (res.result) {
            this.$refs.mixer.openUrl(`${weexUrl}components/mixer/mixer.js`, {}).then(res => {
              console.log(res, 'res2')
              if (res.result) {
                this.$refs.toast.openUrl(`${weexUrl}components/toast/toast.js`, {})
              }
            })
          }
        })
        console.log(`${weexUrl}components/toast/toast.js`)
      })
    },
    methods: {
      fastForward () {
        /**
         * @desc 视频快进
         */
        let rate = 10
        if (this.currentTime.temp + 10 >= parseInt(this.totalTime.temp)) {
          rate = parseInt(this.totalTime.temp) - this.currentTime.temp
        }
        this.$refs.player.fastForward(rate).then(() => {
          this.setTime()
        })
      },
      fastBackward () {
        /**
         * @desc 视频快退
         */
        let rate = 10
        if (this.currentTime.temp - 10 <= 0) {
          rate = this.currentTime.temp
        }
        this.$refs.player.fastBackward(rate).then(() => {
          this.setTime()
        })
      },
      setTime () {
        this.$refs.video.getCurrentTime().then((data) => {
          console.log(data)
          if (data !== undefined) {
            let timeString1 = this.timeFilter(data)
            this.currentTime.text = timeString1
            this.currentTime.temp = data
          }
        })
      },
      addRate () {
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
      delRate () {
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
      errorHandling (data) {
        let self = this
        let errorText = ''
        let code = ''
        if (data.message === 'Network Error') {
          code = '-100'
        } else {
          code = data.code
        }
        switch (code) {
          case '-100':
            // 网络错误
            errorText = '网络连接出错，请检查网络'
            break
          case 'ECONNABORTED':
            // 网络超时
            errorText = '网络超时'
            break
          default:
            errorText = data.desc || data.message || ''
        }
        self.toastHidden = false
        self.$refs.toast.focus()
        self.$find.sendMessage({
          method: 'toastMess',
          params: {text: errorText, imgName: 'syncInfo'}
        })
        this.inter = setTimeout(() => {
          self.toastHidden = true
          clearInterval(this.inter)
        }, 2000)
      },
      initData () {
        if (this.famousPlayCoursesBySet.courseList.length > 0 && this.palyHidden && this.weexHidden) {
          this.sendMessage()
          this.download(this.famousPlayCoursesBySet.courseList[0]).then(() => {
            this.palyHidden = false
          })
        }
      },
      getCoursesBySet (courseSetID) {
        console.log(this.famousPlayCoursesBySet)
        return this.$store.dispatch('famous/getCoursesBySet', {courseSetID}).then(data => {
          if (!this.hasLoaded && !data.famousPlayCoursesBySet) {
            // 无缓存并且接口没返回数据 弹提示框
            this.errorHandling(data)
            console.log(data, 'getCoursesBySet')
          } else {
            this.initData()
          }
        })
      },
      /**
       * @desc 一进入页面就下载第一个
       **/
      download (videolist) {
        console.log('download')
        let video = videolist.data.videoHighBitRate
        let midi = videolist.data.midiHighBitRate
        return download.downloadAll([video, midi]).progress((process) => {
          this.progress = 0
          if (process['0']) {
            // 只取video下载的进度
            this.progress = parseInt(process['0'].progress * 100)
          }
        }).then((data) => {
          if (data.code && data.code !== 0) {
            this.errorHandling(data)
            return
          }
          this.playerSource = {
            mp4: {
              videoUrl: data[0].path,
              videoMidiUrl: data[1].path
            }
          }
          console.log(this.playerSource)
          this.sendMessageAgain()
        })
      },
      /**
       * weex通知下载
       **/
      weexDownload ({courseItem, index, isDownload}) {
        console.log(courseItem, index, isDownload)
        this.index = index
        if (index === this.playIndex && isDownload) {
          // 如果选中的是当前视频 直接播放就行了
          this.hideWeex()
          return this.play()
        }
        if (isDownload) {
          // 已经下载过了 直接播放
          this.playerSource = {
            mp4: {
              videoUrl: courseItem.videoDownload,
              videoMidiUrl: courseItem.midiDownload
            }
          }
          this.$find.sendMessage({
            method: 'weexPlayIndex',
            params: {playIndex: index}
          })
          this.playNow = true
          this.playIndex = index
          return this.hideWeex()
        }
        if (this.progressing && !isDownload) {
          download.abortAll(this.files).then((data) => {
            this.progressing = false
            this.sendMessageAgain()
          })
        } else {
          this.continueDownload(courseItem, index, isDownload)
        }
      },
      continueDownload (courseItem, index, isDownload) {
        console.log('weex通知开始下载')
        let video = courseItem.data.videoHighBitRate
        let midi = courseItem.data.midiHighBitRate
        console.log(video, midi)
        this.files = [video, midi]
        this.progressing = true
        this.$find.sendMessage({
          method: 'weexProgress',
          params: {progress: 0, index}
        })
        return download.downloadAll([video, midi]).progress((process) => {
          let progress = 0
          if (process['0']) {
            // 只取video下载的进度
            progress = parseInt(process['0'].progress * 100)
          }
          this.$find.sendMessage({
            method: 'weexProgress',
            params: {progress: progress, index}
          })
        }).then((data) => {
          console.log(data)
          if (data.code && data.code !== 0 && data.code !== 22002) {
            this.errorHandling(data)
            return
          }
          this.progressing = false
          if (!isDownload) {
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
      play () {
        console.log(this.playerSource)
        this.toolbarHidden = true
        this.$refs.player.play().then((data) => {
          clearInterval(this.interval)
          this.isPlay = false
          this.$refs.player.reset()
        })
        this.interval = setInterval(() => {
          this.setTime()
        }, 100)
        this.isPlay = true
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
      controlWeex () {
        if (!this.palyHidden) {
          // 视频下载完成
          this.$find.sendMessage({
            method: 'controlButton',
            params: {show: !this.weexHidden}
          })
        }
      },
      showWeex () {
        this.$refs.weex.focus()
        this.weexHidden = false
        this.$refs.weex.animation({
          duration: 800,
          timingFunction: 'ease',
          styles: {
            transform: 'translateX(-690px)'
          }
        }).then((data) => {
          this.controlWeex()
        })
      },
      hideWeex () {
        this.$refs.weex.animation({
          duration: 800,
          timingFunction: 'ease',
          styles: {
            transform: 'translateX(690px)'
          }
        }).then((data) => {
          this.weexHidden = true
          this.controlWeex()
        })
      },
      /**
       * @desc video init successful
       */
      playerInitComplete (data) {
        if (!data.result) {
          return
        }
        this.toolbarHidden = !this.toolbarHidden
        // 初始化速率 获取时间
        this.$refs.player.info().then((data) => {
          if (data.originalBpm) {
            self.orgBpm = data.originalBpm
            self.curBpm = data.curBpm
          }
        })
        this.$refs.video.mute(false)
        this.$refs.video.getTotalTime().then((data) => {
          if (data) {
            let timeString = this.timeFilter(data)
            this.totalTime.text = timeString
            this.totalTime.temp = data
          }
        })
        if (this.playNow) {
          // 立即开始播放
          this.play()
        }
      },
      sendMessage () {
        if (this.$refs.weex) this.$refs.weex.focus()
        this.$find.sendMessage({method: 'getVideoList', params: {videoList: this.famousPlayCoursesBySet}})
      }
    },
    computed: {
      ...mapState({
        'famousPlayCoursesBySet': function (state) {
          let famousPlayCoursesBySet = state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID]
          if (famousPlayCoursesBySet) {
            // 有缓存
            this.hasLoaded = true
          }
          return famousPlayCoursesBySet || {courseList: []}
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
    beforeDestroy () {
      clearInterval(this.inter)
    }
  }
</script>
