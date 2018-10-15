<template>
  <div class="vidioPlay">
    <div class="backBox"></div>
    <h1 v-if="palyHidden" v-text="'正在下载中...'+progress+'%'"></h1>
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
    <toolbar :hidden="toolbarHidden1">
      <icon-item v-for="button in videoButton"
              :hidden="toolbarHidden || isPlay"
              :pianoKey="button.pianoKey"
              :key="button.icon"
              longClick="true"
              :id="button.id"
              :gradient="true"
              :style="{backgroundColor: '#6000',dotColor: '#fff'}"
              :icon="button.icon"/>
      <icon-item v-for="button in buttons"
        :hidden="toolbarHidden || isPlay"
        :pianoKey="button.pianoKey"
        :key="button.icon"
        longClick="true"
        :id="button.id"
        :style="{backgroundColor: button.backgroundColor,textColor: '#fff',fontSize:'14'}"
        :text="button.text"
        titlePosition='below'
        :icon="button.icon"/>
      <icon-item id="899"
        key="899"
        icon="0xe60d"
        text="调音台"
        pianoKey="97"
        titlePosition="below"
        :hidden="toolbarHidden"
        :style="{backgroundColor:'#4000',textColor: '#fff'}"/>
      <slider ref="slider" :hidden="toolbarHidden || isPlay" id="701" :style="{backgroundColor:'#7000', borderColor: '#52931E', barColor: '#52931E'}" :value="speedValue" :min="0.5" :max="1.5">
        <titleitem text="-" id="710" pianoKey="73"/>
        <titleitem :text="speedValue+'X'" id="712" pianoKey="74" :style="{fontSize:'14'}"/>
        <titleitem text="+" id="714" pianoKey="75"/>
      </slider>

    </toolbar>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .vidioPlay {
    width: 100%;
    height: 100%;
    .backBox {
      width: 100%;
      height: 100%;
      background: url('../images/video_bg.png') no-repeat !important;
      background-size: cover;
    }
    h1 {
      position: absolute;
      top: 524px;
      left: 1007px;
      font-size: 42px;
      font-weight: 400;
      color:rgba(51,51,51,1);
    }
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import { download, modules } from 'find-sdk'
  import { KEY80, KEY78, KEY82, KEY66, KEY68, KEY73, KEY74, KEY97, KEY75, receiveMsgFromWeex, BACK_PRESSED, PEDAL_PRESSED, TOOLBAR_PRESSED } from 'vue-find'
  import {getCurEnvs} from 'scripts/utils'
  import mixerMixin from '../../common/mixer-mixin.js'
  import toastMixin from '../../common/toast-mixin.js'
  export default {
    data () {
      return {
        progress: 0,
        palyHidden: true,
        toolbarHidden: true,
        toolbarHidden1: false,
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
            backgroundColor: '#6000',
            text: '练习'
          },
          {
            pianoKey: 68,
            icon: '0xe635',
            id: 205,
            backgroundColor: '#6000',
            text: '视频列表'
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
        index: 0,
        progressing: false,
        files: [],
        orgBpm: 120,
        curBpm: 0,
        playNow: false,
        playIndex: 0,
        interval: null,
        canClick: true,
        canOpenVideoDirectory: false,
        timer: null,
        speedValue: 1,
        clickMixer: false
      }
    },
    watch: {
      curBpm (val) {
        console.log(val, 'curBpmcurBpm')
      }
    },
    mixins: [mixerMixin, toastMixin],
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
        if (!course.correlationMusic[0]) {
          // 没有练习 提示用户
          return this.errorHandling({desc: '此课程暂无练习'})
        }
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
        // this.curBpm = this.orgBpm
        this.speedValue = 1
        this.errorHandling({speedValue: 1, desc: '速度调节 (原速1X)'})
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
      [KEY97] () {
        /**
         * @desc 打开调音台
         */
        this.clickMixer = true
        this.openMixer()
      },
      [KEY68] () {
        /**
         * @desc 打开视频列表
         */
        if (!this.canClick || !this.canOpenVideoDirectory) {
          return
        }
        this.toolbarHidden = true
        this.showWeex()
      },
      [receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      },
      [BACK_PRESSED] () {
        if (this.toolbarHidden1) {
          this.toolbarHidden1 = false
          return
        }
        if (this.isPlay) {
          // 如果在播放 暂停
          this.isPlay = false
          this.toolbarHidden = false
          clearInterval(this.interval)
          return this.$refs.player.pause()
        }
        if (!this.weexHidden) {
          if (this.toolbarHidden1) {
            this.toolbarHidden1 = false
          } else {
            this.hideWeex()
            this.toolbarHidden = false
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
        if (!this.weexHidden) {
          return
        }
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
    mounted () {
      this.registVloume()
      this.registPageLifecycle()
      let courseSetID = this.$route.query.courseSetID
      /**
       * @desc 根据courseSetID获取教程视频文件列表
       */
      this.getCoursesBySet(courseSetID)
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        this.$refs.weex.openUrl(`${weexUrl}components/videoDirectory/videoDirectory.js`, {}).then((res1) => {
          this.canOpenVideoDirectory = res1.result
        })
      })
    },
    methods: {
      registVloume () {
        // 监听音量设置
        let self = this
        window.fp.utils.volumeManager.registVolumeChange((data) => {
          console.log(data, 'volumeData')
          if (data && data.type === 1) {
            if (data.mute !== undefined && data.mute === true) {
              self.$refs.player && self.$refs.player.setVolume(0)
            } else {
              self.$refs.player && self.$refs.player.setVolume(data.realValue)
            }
          }
        })
      },
      registPageLifecycle () {
        modules.notification.regist('pageLifecycle', data => {
          console.log(data, 'pageLifecycle')
          if (data.case === 'resume') {
            // 调音台界面关闭 页面重新开始监听
            if (this.clickMixer) {
              this.clickMixer = false
              modules.notification.regist('receiveMsgFromWeex', ({method, params}) => {
                this[method] && this[method](params)
              })
            }
          }
        })
      },
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
        let newSpeed = this.speedValue + 0.25
        if (newSpeed > 1.5) {
          this.errorHandling({speedValue: 1.5, desc: '速度调节 (原速1X)'})
          return
        }
        // let newRate = newBpm / this.orgBpm
        this.$refs.player.setRate(newSpeed)
        this.speedValue = newSpeed
        this.errorHandling({speedValue: newSpeed, desc: '速度调节 (原速1X)'})
      },
      delRate () {
        /**
         * @desc 速率减
         */
        let newSpeed = this.speedValue - 0.25
        if (newSpeed < 0.5) {
          this.errorHandling({speedValue: 0.5, desc: '速度调节 (原速1X)'})
          return
        }
        // let newRate = newBpm / this.orgBpm
        this.$refs.player.setRate(newSpeed)
        this.speedValue = newSpeed
        this.errorHandling({speedValue: newSpeed, desc: '速度调节 (原速1X)'})
      },
      errorHandling (data) {
        console.log(data, 'errorData')
        let errorText = ''
        let code = ''
        if (data.message === 'Network Error') {
          code = '-100'
        } else {
          code = data.code
        }
        switch (code) {
          case '-100':
          case 20000:
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
        this.showToast({text: errorText, imgName: 'syncInfo', speedValue: data.speedValue, maxValue: data.maxValue})
      },
      initData () {
        if (this.famousPlayCoursesBySet.courseList.length > 0 && this.palyHidden && this.weexHidden) {
          this.sendMessage()
          this.download(this.famousPlayCoursesBySet.courseList[0]).then(() => {
            // this.palyHidden = false
          })
        }
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
      sendLocation () {
        modules.global.getKeyboardPosition().then((data) => {
          if (data) {
            this.$find.sendMessage({
              method: 'location',
              params: {location: [data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX]}
            })
            // this.position = [data[70].centerX - 6, data[78].centerX - 6, data[85].centerX - 6, data[92].centerX, data[99].centerX - 1]
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
        // this.playerSource = {
        //   mp4: {
        //     videoMidiUrl: '/Users/zhanxiao/Documents/Find Artist/cachedartist/87/车尔尼599钢琴初级教程01#~&FooEh3L2bmg-4Si-kpKdJ0Mf_r8q.mid',
        //     videoUrl: '/Users/zhanxiao/Documents/Find Artist/cachedartist/87/车尔尼599钢琴初级教程01#~&lpSTTvjixedZzWUq0YTwyyr8Ed3t.mp4'
        //   }
        // }
        return download.downloadAll([video, midi]).progress((process) => {
          this.progress = 0
          if (process['0']) {
            // 只取video下载的进度
            this.progress = parseInt(process['0'].progress * 100)
          }
        }).then((data) => {
          console.log(data)
          if (data['0'].code && data['0'].code !== 0 && data['0'].code !== 22002) {
            this.errorHandling(data['0'])
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
          if (data['0'].code && data['0'].code !== 0 && data['0'].code !== 22002) {
            this.errorHandling(data['0'])
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
          this.toolbarHidden = false
          this.$refs.player.reset()
          clearInterval(this.interval)
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
        console.log('打开视频列表')
        this.weexHidden = false
        this.$refs.weex.focus()
        this.controlWeex()
        this.$refs.weex.animation({
          duration: 600,
          timingFunction: 'ease',
          styles: {
            transform: 'translateX(-690px)'
          }
        }).then(() => {
        })
      },
      hideWeex () {
        console.log('隐藏视频列表')
        this.canClick = false
        this.$refs.weex.animation({
          duration: 800,
          timingFunction: 'ease',
          styles: {
            transform: 'translateX(690px)'
          }
        }).then((data) => {
          this.weexHidden = true
          this.canClick = true
          this.controlWeex()
        })
      },
      /**
       * @desc video init successful
       */
      playerInitComplete (data) {
        console.log(data)
        if (!data.result) {
          if (data.code && data.code === 30000) {
            // 文件出错 根据type类型 删除该文件 回到上一级页面
            let filePath = this.playerSource['mp4'].videoUrl
            let errText = '视频资源出错'
            if (data.type && data.type === 'mid') {
              filePath = this.playerSource['mp4'].videoMidiUrl
              errText = 'midi资源出错'
            }
            this.errorHandling({desc: errText})
            modules.file.removeFile(filePath).then(res => {
              if (res) {
                // 删除成功 回退到上个页面
                this.timer = setTimeout(() => {
                  this.$router.back()
                }, 2000)
              }
            })
          }
          // else if (data.code && data.code === 30001) {
          //   let errText = '视频资源不存在'
          //   if (data.type && data.type === 'mid') {
          //     errText = 'midi资源不存在'
          //   }
          //   // 文件不存在 根据type提示资源文件不存在
          //   this.errorHandling({desc: errText})
          // }
          return
        }
        this.palyHidden = false
        this.toolbarHidden = !this.toolbarHidden
        // 初始化速率
        this.$refs.player.info().then((data) => {
          if (data.originalBpm) {
            console.log(data)
            this.orgBpm = parseInt(data.originalBpm)
            this.speedValue = parseInt(data.curBpm) / this.orgBpm
          }
        })
        this.$refs.video.mute(false)
        // 获取时间
        this.$refs.video.getTotalTime().then((data) => {
          if (data) {
            let timeString = this.timeFilter(data)
            this.totalTime.text = timeString
            this.totalTime.temp = data
          }
        })
        this.setTime()
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
        famousPlayCoursesBySet: function (state) {
          let famousPlayCoursesBySet = state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID]
          if (famousPlayCoursesBySet) {
            // 有缓存
            this.hasLoaded = true
          }
          return famousPlayCoursesBySet || {courseList: []}
        },
        pianoType: state => state.storage.pianoType
      }),
      ...mapGetters([]),
      minBPM () {
        return parseInt(this.orgBpm * 0.5)
      },
      maxBPM () {
        return parseInt(this.orgBpm * 1.5)
      }
    },
    beforeDestroy () {
      if (this.progressing) {
        download.abortAll(this.files).then((data) => {
          this.progressing = false
          this.sendMessageAgain()
        })
      }
      clearInterval(this.interval)
      clearTimeout(this.timer)
    }
  }
</script>
