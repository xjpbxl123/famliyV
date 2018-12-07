<template>
  <div class="banner-wrapper">
    <statusBar/>
    <div class="banner-content">
      <banner-left
        :isSynced="isSynced"
        :isLogin="isLogin"
        :userInfo="userInfo"
        :sessionId="sessionId"
        :usedTime="usedTime"
        :setCalendarData="setCalendarData"
        :getUserInfo="getUserInfo"
        :isActivation="isActivation"
        :isCalendar="isCalendar"
        :pianoInfo="pianoInfo"
      />
      <content-center
        :setCenterSelect="setCenterSelect"
        :selectedIndex="selectedIndex"/>
      <bannerRight
        :recentOpenList="isLogin?recentOpenList:localRecent"
        :rightSelectedIndex="rightSelectedIndex"
        :collectList="isLogin?collectList:localCollect"
        :rightType="rightType"
        :isPlaying="isPlaying"
        :setRightSelect="setRightSelect"
        :isPlayingMusicId="isPlayingMusicId"
        :isPlayingType="isPlayingType"/>
    </div>
    <find-cover :activeNamespace="namespace">
      <banner-help
        v-if="showHelpBanner"
        class="help-banner"
        :showHelpBanner="showHelpBanner"
        :helpImg="helpImg"
        :helpIndex="helpIndex"
        :buttonActions="buttonActions"
      />
    </find-cover>
    <fh-player ref="player" :source="playerSource" :hidden="playerHidden" :style="{width:0,height:0}"
        @initComplete="playerInitComplete">
    </fh-player>
    <toolbar :hidden="toolbarHidden" :darkBgHidden="true">
        <icon-item v-for="(button,index) in userActionButtons"
            :hidden="hideOtherButtons || !logoutCover || appLoading"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:'#0000',color: '#fff',textColor: '#fff'}"/>

        <text-icon-item v-for="(button) in bigBUtton"
            :hidden="hideOtherButtons || !logoutCover || appLoading"
            :key="button.id"
            :id="button.id"
            :text="button.text"
            :pianoKey="button.pianoKey"
            :positionPixels="button.positionPixels"
            :style="button.style"
            :icon="button.icon"/>
        <group id="501" :hidden="hideOtherButtons || !logoutCover || appLoading">
          <icon-item id="400" pianoKey="66" titlePosition="below" icon="0xe62b"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',textColor:'#fff',dotColor: '#52931E'}"/>
          <icon-item id="401" pianoKey="67" text="" icon="0xe601"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff'}"/>
          <icon-item id="402" pianoKey="68" titlePosition="in" :text="speed"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18}"/>
          <icon-item id="403" pianoKey="69" text="" icon="0xe605"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff'}"/>
          <icon-item id="404" pianoKey="70" titlePosition="in" :text="metre+'拍'"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18}"/>
        </group>
        <icon-item v-for="(button,index) in controlButtons"
          :longClick="button.longClick"
          :key="index"
          :id="button.id"
          :icon="button.icon"
          :pianoKey="button.pianoKey"
          :selected="button.selected"
          :hidden="button.hidden || hideOtherButtons || !logoutCover || appLoading"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: button.dotColor}"/>

        <icon-item id="899"
            key="899"
            icon="0xe60d"
            text="调音台"
            pianoKey="87"
            titlePosition="below"
            :hidden="!logoutCover || appLoading"
            :style="{backgroundColor:'#4000',textColor: '#fff'}"/>
        <icon-item v-for="(button,index) in playButtons"
          :longClick="button.longClick"
          :key="index"
          :id="button.id"
          :icon="button.icon"
          :pianoKey="button.pianoKey"
          :selected="button.selected"
          :hidden="button.hidden || !logoutCover || appLoading"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: '#fff'}"/>
        <icon-item
          key="201"
          id="201"
          icon="0xe625"
          pianoKey="90"
          :hidden="!hideOtherButtons || !logoutCover"
          :style="{backgroundColor:'#4000',textColor: '#fff',dotColor: '#fff'}"/>

         <icon-item v-for="(button,index) in logoutButtons"
            :hidden="logoutCover || appLoading"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            v-if="button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
         <icon-item v-for="(button,index) in gameButtons"
            :hidden="!appLoading || !button.show"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            v-if="button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import findButtonBanner from '../common/find-button-banner/find-button-banner'
  import bannerHelp from './index-banner-help'
  import * as keys from 'vue-find'
  import BannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import { modules, download } from 'find-sdk'
  import initData from './initData.js'
  import {formatDate, errorHandling} from '../../scripts/utils'
  import eventsHub from 'scripts/eventsHub'
  import mixerMixin from '../common/mixer-mixin.js'
  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        closeScreen: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png'), require('./images/help-3.jpg')],
        endIndex: -1,
        clickInterval: null,
        timer: 0,
        playerHidden: false,
        enterPlay: false,
        openMusicScore: false,
        compel: false,
        playerSource: {
          mid: {
            midiUrl: ''
          },
          options: {
            countDownEnable: false
          }
        },
        isPlaying: false,
        isPlayingMusicId: 0,
        interval: null,
        appLoading: false,
        logoutCover: true,
        isOpeningScore: false,
        isDownloadingPeilian: false,
        mixerIsOpen: false,
        userActionButtons: [
          {
            pianoKey: 30,
            text: '帮助',
            icon: '0xe69c',
            id: 1
          },
          {
            pianoKey: 32,
            text: '登录',
            icon: '0xe651',
            id: 2
          },
          {
            pianoKey: 34,
            text: '设置',
            icon: '0xe638',
            id: 3
          }
        ],
        bigBUtton: [
          {id: 7, pianoKey: 39, text: '我的资源', icon: '0xe763', positionPixels: -10, style: {backgroundColor: '#FD7778,#EB3256', dotColor: '#EB3256'}},
          {id: 8, pianoKey: 42, text: '弹奏录制', icon: '0xe615', positionPixels: 0, style: {backgroundColor: '#D84575,#8E2F45', dotColor: '#8E2F45'}},
          {id: 6, pianoKey: 46, text: '乐理&技巧', icon: '0xe71e', positionPixels: -40, style: {backgroundColor: '#F2C82D,#B47119', dotColor: '#B47119'}},
          {id: 5, pianoKey: 49, text: '最新&最热', icon: '0xe761', positionPixels: -40, style: {backgroundColor: '#C499FF,#9B4BED', dotColor: '#9B4BED'}},
          {id: 9, pianoKey: 51, text: '名师课程', icon: '0xe69d', positionPixels: 0, style: {backgroundColor: '#5F89FC,#4E59E1', dotColor: '#4E59E1'}},
          {id: 10, pianoKey: 54, text: '游戏管理', icon: '0xe69d', positionPixels: 0, style: {backgroundColor: '#FB9664,#F4462F', dotColor: '#F4462F'}}
        ],
        controlButtons: [
          {
            pianoKey: 27,
            text: '',
            icon: '0xe71f',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 20,
            checkable: true,
            checked: true,
            hidden: true
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe609',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 100
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe660',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 12,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 15
          },
          {
            pianoKey: 73,
            text: '',
            icon: '0xe64d',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 102
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe762',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 101
          }
        ],
        playButtons: [
          {
            pianoKey: 102,
            text: '',
            icon: '0xe6da',
            backgroundColor: '#2fff',
            id: 19
          },
          {
            pianoKey: 92,
            text: '',
            longClick: true,
            icon: '0xe63c',
            backgroundColor: '#2fff',
            id: 16
          },
          {
            pianoKey: 94,
            longClick: true,
            text: '',
            icon: '0xe654',
            backgroundColor: '#2fff',
            id: 17
          },
          {
            pianoKey: 97,
            longClick: false,
            text: '',
            icon: '0xe657',
            backgroundColor: '#2fff',
            id: 18
          },
          {
            pianoKey: 99,
            text: '',
            icon: '0xe73d',
            backgroundColor: '#2fff',
            id: 190
          }
        ],
        logoutButtons: [
          {
            pianoKey: 78,
            text: '取消',
            icon: '0xe60a',
            id: 288,
            backgroundColor: '#4000',
            show: true
          },
          {
            pianoKey: 75,
            text: '注销',
            icon: '0xe651',
            id: 289,
            backgroundColor: '#4000',
            show: true
          }
        ],
        gameButtons: [
          {
            pianoKey: 75,
            text: '取消',
            icon: '0xe60a',
            id: 388,
            backgroundColor: '#2fff',
            show: false
          },
          {
            pianoKey: 78,
            text: '直接进入',
            icon: '0xe60a',
            id: 389,
            backgroundColor: '#2fff',
            show: false
          },
          {
            pianoKey: 80,
            text: '更新',
            icon: '0xe651',
            id: 390,
            backgroundColor: '#2fff',
            show: false
          }
        ],
        metronome: false,
        speed: 120,
        metre: '3',
        toolbarHidden: false,
        clickedMusicId: 0,
        clickeType: '',
        hideOtherButtons: false,
        autoPlay: false,
        canEnterModule: true,
        skipTime: 0,
        isSupportMutePedal: false,
        isPlayingIndex: 0,
        isPlayingType: '',
        loading: false,
        instance: '',
        downloadInfo: {},
        openPeilian: false
      }
    },
    mixins: [initData, mixerMixin],
    find: {
      [keys.TOOLBAR_PRESSED] ({hidden}) {
        this.toolbarHidden = hidden
        if (hidden && this.metronome) {
          return
        }
        this.buttonActions('closeMetro')
      },
      [keys.KEY22] () {
        this.buttonActions('closeMetro')
      },
      [keys.KEY27] () {
        if (+new Date() - this.skipTime <= 5000) {
          //   5秒之内不做处理
          console.log('return')
          return
        }
        this.skipTime = +new Date()
        this.buttonActions('keyBoardMute')
      },
      [keys.KEY30] () {
        this.buttonActions('help')
      },
      [keys.KEY32] () {
        if (!this.logoutCover) {
          return
        }
        this.buttonActions('login')
      },
      [keys.KEY34] () {
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('set')
      },
      [keys.KEY39] () {
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('myScore')
      },
      [keys.KEY42] () {
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('playRecord')
      },
      [keys.KEY46] () {
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('skill')
      },
      [keys.KEY49] () {
        // 最新最热
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('indexMore')
      },
      [keys.KEY51] () {
        // 名师课程
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        // return modules.nativeRouter.openArtistCourseView()
        return this.go('/famous')
      },
      [keys.KEY54] () {
        return this.go('/game')
      },
      [keys.KEY66] () {
        // 打开节拍器
        this.buttonActions('openMetro')
      },
      [keys.KEY67] () {
        // 节拍器减速
        this.buttonActions('speedDown')
      },
      [keys.KEY68] () {
        // 节拍器恢复120
        this.buttonActions('speedRecover')
      },
      [keys.KEY69] () {
        // 节拍器加速
        this.buttonActions('speedUp')
      },
      [keys.KEY70] () {
        // 节拍器换拍子
        this.buttonActions('metroTip')
      },
      [keys.receiveMsgFromWeex] ({method, params}) {
        this[method] && this[method](params)
      },
      [keys.KEY87] () {
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.mixerIsOpen = true
        console.log('打开调音台')
        this.openMixer()
      },
      [keys.KEY90] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        if (this.hideOtherButtons) {
          // 熄屏
          this.buttonActions('closeScreen', true)
        } else {
          // 关机
          this.buttonActions('shutdown')
        }
      },
      [keys.KEY75] () {
        if (this.appLoading) {
          return this.buttonActions('canceldownload')
        }
        if (!this.logoutCover) {
          this.buttonActions('login')
        } else {
          this.go('/timbre')
        }
      },
      [keys.KEY78] () {
        if (this.appLoading) {
          // 直接进入
          console.log('直接进入')
          if (this.selectedIndex === 2) {
            return this.openApp('findPartner')
          } else if (this.selectedIndex === 3) {
            return this.openApp('kingdom2')
          }
        }
        if (!this.logoutCover) {
          eventsHub.$emit('closeToast', true)
          this.logoutCover = !this.logoutCover
        } else {
          this.buttonActions('left')
        }
      },
      [keys.LONG_KEY78] () {
        this.buttonActions('left')
      },
      [keys.KEY80] () {
        if (this.appLoading) {
          // 去下载
          if (this.selectedIndex === 2) {
            return this.downloadApp('findPartner')
          } else if (this.selectedIndex === 3) {
            return this.downloadApp('kingdom2')
          }
        }
        this.buttonActions('right')
      },
      [keys.LONG_KEY80] () {
        this.buttonActions('right')
      },
      [keys.KEY82] () {
        this.buttonActions('ok')
      },
      [keys.KEY73] () {
        this.buttonActions('search')
      },
      [keys.KEY102] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('changeRightData')
      },
      [keys.LONG_KEY92] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('right-up')
      },
      [keys.KEY92] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('right-up')
      },
      [keys.LONG_KEY94] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('right-down')
      },
      [keys.KEY94] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        console.log('down')
        this.buttonActions('right-down')
      },
      [keys.KEY97] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('right-play')
      },
      [keys.KEY99] () {
        if (this.openMusicScore || this.loading) {
          // 进入曲谱过程中不可点
          return
        }
        this.buttonActions('openMusicScore')
      },
      [keys.PEDAL_PRESSED] (key) {
        if (this.isPlaying || this.loading) {
          // 播放的时候禁用踏板
          return
        }
        switch (key.id) {
          case 114:
            if (+new Date() - this.skipTime <= 5000) {
              // 5秒之内不做处理
              console.log('return')
              return
            }
            this.skipTime = +new Date()
            if (this.isSupportMutePedal) {
              this.buttonActions('keyBoardMute')
            }
            break
          case 116:
            // 踏板1号键
            return this.metronome ? this.buttonActions('speedDown') : this.buttonActions('left')
          case 117:
            // 踏板2号键
            return this.metronome ? this.buttonActions('speedUp') : this.buttonActions('right')
          case 118:
            if (!this.metronome) {
              this.buttonActions('ok')
            }
            break
          case 119:
            return this.goBack()
        }
      },
      [keys.BACK_PRESSED] () {
        if (this.loading || !this.canEnterModule) {
          console.log('108rerurn')
          return
        }
        this.goBack()
      },
      banner: {
        [keys.INTERCEPT_DOWN] (keys) {
          if (this.showHelpBanner) {
            this.clickHelp(keys)
          } else {
            // 亮屏
            this.buttonActions('closeScreen', false)
          }
        }
      }
    },
    computed: {
      ...mapState({
        sessionId: state => state.storage.sessionId,
        isSynced: state => state.storage.isSynced,
        isActivation: state => state.storage.isActivation,
        isCalendar: state => state.storage.isCalendar,
        pianoInfo: state => state.storage.pianoInfo,
        pianoType: state => state.storage.pianoType,
        isLogin (state) {
          let {storage} = state
          if (storage.isLogin) {
            this.userActionButtons[1].text = '注销'
          }
          return storage.isLogin
        },
        userInfo: state => state.storage.userInfo,
        localCollect: state => state.storage.localCollect,
        localRecent: state => state.storage.localRecent,
        selectedIndex: state => state.index.selectedIndex,
        rightSelectedIndex: state => state.index.rightSelectedIndex,
        usedTime: state => state.index.usedTime,
        rightType: state => state.index.rightType,
        scoreList: function (state) {
          return state.storage.cache.renderCache.scoreList
        },
        partner: state => state.storage.cache.renderCache.partner,
        parnerLocal: state => state.storage.cache.renderCache.parnerLocal
      }),
      ...mapGetters(['recentOpenList', 'collectList', 'musicInfo', 'musicList']),
      namespace () {
        return this.showHelpBanner || this.closeScreen ? 'banner' : ''
      }
    },
    watch: {
      /**
       * @desc 是否已经从原生storage同步完成
       * */
      isSynced (val) {
        if (val) {
          if (!this.isLogin) {
            this.createSession()
          }
          this.getUserStatus()
        }
      },
      isLogin (val) {
        this.$store.dispatch('myScore/setCopyArr', [])
        if (this.isPlaying) {
          this.$refs.player.pause()
          this.$refs.player.reset()
          this.isPlaying = false
          this.hideOtherButtons = false
        }
        this.$store.dispatch('index/setRightSelect', 0)
        if (val) {
          this.userActionButtons[1].text = '注销'
          this.getRecentOpenList()
          this.getCollectList()
        } else {
          this.userActionButtons[1].text = '登录'
        }
      }
    },
    methods: {
      /**
       * @desc 创建会话ID
       * */
      createSession () {
        if (!this.isLogin) {
          return this.$store.dispatch('setSession')
        }
      },
      /**
       * @desc 获取节拍器状态
       * */
      getMetronomeStatus () {
        modules.metronome.getCurrentTempo().then((data) => {
          this.speed = data.tempoSpeed
          this.metre = data.metre
        })
      },
      /**
       * @desc 设置练琴数据
       * @param {object} playCalendar - 练琴数据
       * */
      setCalendarData (playCalendar) {
        this.$store.dispatch('setNativeStorage', {
          playCalendar
        })
      },
      /**
       * @desc 获取是否支持静音踏板
       * */
      getIsSupportMutePedal () {
        modules.settings.getProperty('isSupportMutePedal').then((data) => {
          this.isSupportMutePedal = true
          if (data) {
            // 支持
            this.helpImg[0] = require('./images/help-1-s.png')
            this.controlButtons[0].hidden = false
            modules.settings.getProperty('isPedalMuteOn').then((data) => {
              this.controlButtons[0].checked = data
            })
          }
        })
      },
      /**
       * @desc 监听静音踏板的设置
       * */
      checkPedalMute () {
        modules.notification.regist('CheckPedalMute', () => {
          console.log('CheckPedalMute')
          if (this.isSupportMutePedal) {
            modules.settings.getProperty('isPedalMuteOn').then((data) => {
              this.controlButtons[0].checked = data
            })
          }
        })
      },
      /**
       * @desc 获取钢琴类型
       * */
      playSet () {
        if (this.pianoType === 'real') {
          // 真钢默认开启自动演奏
          modules.settings.setProperty('isAutoPlayOn', true)
          modules.settings.setProperty('isSpeakerOn', false)
        } else if (this.pianoType === 'electric') {
          // 电钢默认开启电子音源
          modules.settings.setProperty('isSpeakerOn', true)
        }
      },
      /**
       * @desc 监听清空缓存/恢复出厂设置
       * */
      clearCache () {
        modules.notification.regist('ClearCache', data => {
          // 监听原生清缓存/恢复出厂设置的操作
          if (data.isClearCache) {
            // 清空缓存
            this.$store.dispatch('clearCache', false)
          } else {
            // 恢复出厂设置
            this.$store.dispatch('restoreFactorySettings')
          }
        })
      },
      /**
       * @desc 书籍列表鼠标选中
       * */
      setCenterSelect (index) {
        if (this.appLoading) {
          // 正在打开陪练
          return
        }
        this.$store.dispatch('index/setSelected', index).then(() => {
          this.buttonActions('ok')
        })
      },
      /**
       * @desc 右侧列表鼠标选中
       * */
      setRightSelect (index) {
        if (this.loading || this.appLoading) {
          // loading过程中不可点
          return
        }
        this.$store.dispatch('index/setRightSelect', index).then(() => {
          this.buttonActions('right-play')
        })
      },
      /**
       * @desc 帮助页点击事件
       * */
      clickHelp (key) {
        if (this.showHelpBanner) {
          if (key === 108) {
            this.showHelpBanner = false
            this.toolbarHidden = false
            this.helpIndex = 0
            return
          }
          if (this.helpIndex < this.helpImg.length - 1) {
            this.helpIndex = this.helpIndex + 1
            this.toolbarHidden = true
          } else {
            this.helpIndex = 0
            this.showHelpBanner = false
            this.toolbarHidden = false
          }
        }
      },
      go (params) {
        console.log('去h5模块')
        return this.$router.push(params)
      },
      goBack () {
        if (this.appLoading) {
          // 打开了陪练项目 关闭即可
          this.appLoading = !this.appLoading
          eventsHub.$emit('closeToast')
          if (this.isDownloadingPeilian) {
            // 如果在下载 停止下载
            this.canceldownload()
          }
          return
        }
        if (this.isPlaying) {
          this.$refs.player.pause()
          this.$refs.player.reset()
          this.isPlaying = false
          this.isPlayingMusicId = 0
          this.hideOtherButtons = false
          return
        }
        if (this.metronome) {
          // 节拍器开着 关闭节拍器
          this.buttonActions('closeMetro')
          return
        }
        if (!this.logoutCover) {
          eventsHub.$emit('closeToast', true)
          this.logoutCover = true
          this.toolbarHidden = false
          return
        }
        modules.global.toggleFullScreen()
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type, bool) {
        let activeIndex = this.selectedIndex
        let recentOpenList = this.isLogin ? this.recentOpenList : this.localRecent
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let rightActiveIndex = this.rightSelectedIndex
        // 如果是帮助页
        switch (type) {
          case 'help' :
            this.showHelpBanner = true
            break
          case 'login':
            if (!this.isLogin) {
              // 未登录进入登录页
              return this.go('/login')
            } else {
              // 弹出提示框
              if (this.logoutCover) {
                eventsHub.$emit('toast', {text: '确认注销吗？', icon: 'icon-sync-info', iconLoading: false, allExit: true, noClose: true})
                this.logoutCover = !this.logoutCover
              } else {
                this.$store.dispatch('logout', {root: true}).then(() => {
                  this.createSession()
                  this.logoutCover = !this.logoutCover
                  eventsHub.$emit('closeToast', true)
                  this.$store.dispatch('index/setRightSelect', 0)
                })
              }
              return
            }
          case 'set':
            modules.nativeRouter.openSettingView()
            break
          case 'search':
            return this.go('/search')
          case 'settings':
            return false
          case 'skill':
            return modules.nativeRouter.openAppsView()
          case 'playRecord':
            return modules.nativeRouter.openMidiRecordView()
          case 'shutdown':
            return this.go('/shutdown')
          case 'myScore':
            return this.go('/myScore')
          case 'indexMore':
            return this.go('/indexMore')
          case 'closeMetro':
            console.log('close')
            if (this.metronome) {
              this.toolbarHidden = false
              modules.metronome.stop(true)
              this.metronome = false
            }
            break
          case 'openMetro':
            if (!this.metronome) {
              this.toolbarHidden = true
              modules.metronome.start(true)
              this.metronome = true
            }
            break
          case 'speedDown':
            modules.metronome.changeTempoSpeed(false).then(() => {
              this.getMetronomeStatus()
            })
            break
          case 'speedUp':
            modules.metronome.changeTempoSpeed(true).then(() => {
              this.getMetronomeStatus()
            })
            break
          case 'speedRecover':
            // 恢复节拍器数值到120
            let time = Math.abs(this.speed - 120) / 10
            for (let i = 0; i < time; i++) {
              modules.metronome.changeTempoSpeed(this.speed < 120).then(() => {
              })
            }
            this.getMetronomeStatus()
            break
          case 'metroTip':
            modules.metronome.changeTempo().then(() => {
              this.getMetronomeStatus()
            })
            break
          case 'left':
            this.$store.dispatch('index/setSelected', Math.max(activeIndex - 1, 0))
            break
          case 'right':
            this.$store.dispatch('index/setSelected', Math.min(activeIndex + 1, 3))
            break
          case 'tone':
            return modules.nativeRouter.openTimbreView()
          case 'ok':
            if (!this.canEnterModule) {
              console.log('return')
              return
            }
            switch (activeIndex) {
              case 0:
                return this.go('/popular')
              case 1:
                return this.go('/material')
              case 2:
                // return modules.nativeRouter.openArtistCourseView()
                // return this.go('/famous')
                return this.buttonActions('peilian')
              case 3:
                if (!this.isLogin) {
                  return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                }
                if (this.isLogin) {
                  return this.$store.dispatch({type: 'getUserInfo'}).then((data) => {
                    if (!data.userInfo.userId) {
                      modules.user.logOut()
                      return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                    }
                    return this.checkApp('kingdom2')
                  })
                }
                // return modules.game.openKingdom().then((data) => {
                //   if (!data) {
                //     this.canEnterModule = true
                //     // 做登录验证
                //     if (this.isLogin) {
                //       return this.$store.dispatch('getUserInfo').then(data => {
                //         if (!data.userInfo.userId) {
                //           modules.user.logOut()
                //         }
                //       })
                //     }
                //   }
                // })
            }
            break
          case 'right-up':
            // 右侧列表up事件
            rightActiveIndex--
            rightActiveIndex = Math.max(rightActiveIndex, 0)
            this.$store.dispatch('index/setRightSelect', rightActiveIndex)
            break
          case 'right-down':
            // 右侧列表down事件
            rightActiveIndex++
            let data = []
            if (this.rightType === 'myCollect') {
              data = collectList
            } else if (this.rightType === 'recentOpen') {
              data = recentOpenList
            }
            rightActiveIndex = Math.min(rightActiveIndex, data.length - 1)
            if (rightActiveIndex > 0) {
              this.$store.dispatch('index/setRightSelect', rightActiveIndex)
            }
            break
          case 'right-play':
            // 右侧列表play事件
            console.log('单击')
            let musicObj = this.getRightData().musicObj
            let list = this.getRightData().list
            if (list.length === 0) {
              return
            }
            if (this.isPlaying && musicObj.musicId === this.isPlayingMusicId && this.isPlayingType === this.rightType) {
              // 播放中 不操作 仅弹框
              this.loading = false
              eventsHub.$emit('toast', {text: '正在播放当前曲谱', icon: 'icon-sync-info', iconLoading: false, allExit: false})
              return
            }
            if (this.enterPlay) {
              // 已经进入过曲谱 如果没有移动光标要先reset()
              if (musicObj.musicId === this.isPlayingMusicId && this.isPlayingType === this.rightType) {
                console.log(this.playerSource, '播过reset后调play()')
                this.$refs.player.reset()
                this.hideOtherButtons = true
                this.enterPlay = false
              }
            }
            this.autoPlay = false
            this.playMidi(musicObj.musicId, list, rightActiveIndex)
            break
          case 'openMusicScore':
            // 进入播放曲谱界面
            this.$store.dispatch('addPractice')
            let dd = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss:S')
            console.log(dd)
            let musicObj1 = this.getRightData().musicObj
            let list1 = this.getRightData().list
            if (list1.length === 0) {
              return
            }
            if (this.openMusicScore) {
              console.log('return')
              return
            }
            this.addRecentOpen(musicObj1)
            this.openMusicScore = true
            this.hideOtherButtons = true
            if (this.isPlaying) {
              // 如果在播放 先暂停
              this.$refs.player.pause()
              this.isPlaying = false
              if (musicObj1.musicId === this.isPlayingMusicId) {
                window.fp.uis.player.getProgress().then(data => {
                  if (data.curTick !== undefined) {
                    this.player(musicObj1, data.curTick)
                  } else {
                    this.player(musicObj1, 0)
                  }
                  this.$refs.player.reset()
                  this.enterPlay = true
                })
              } else {
                this.player(musicObj1, 0)
              }
            } else {
              this.player(musicObj1, 0)
            }
            break
          case 'changeRightData':
            // 切换右侧数据
            let rightTypeName = 'recentOpen'
            if (this.rightType === 'recentOpen') {
              rightTypeName = 'myCollect'
            }
            this.$store.dispatch('index/setRightType', rightTypeName).then(() => {
              if (this.isPlaying && rightTypeName === this.isPlayingType) {
                this.$store.dispatch('index/setRightSelect', this.isPlayingIndex)
              } else {
                this.$store.dispatch('index/setRightSelect', 0)
              }
            })
            break
          case 'keyBoardMute':
            modules.settings.getProperty('isPedalMuteOn').then((data) => {
              modules.mutePedal.setPedalMuteOnOff(data)
              this.controlButtons[0].checked = !data
            })
            break
          case 'closeScreen':
            this.closeScreen = bool
            modules.device.turnOnScreen(!bool)
            break
          case 'peilian':
            //   陪练
            console.log('陪练')
            // 做登录验证
            if (!this.isLogin) {
              return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
            }
            if (this.isLogin) {
              this.$store.dispatch('getUserInfo').then(data => {
                if (!data.userInfo.userId) {
                  modules.user.logOut()
                  return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                }
              })
              this.checkApp('findPartner')
            }
            break
          case 'canceldownload':
            this.canceldownload()
            break
          default:
            console.log('108')
        }
      },
      checkApp (appName) {
        this.appLoading = true
        eventsHub.$emit('toast', {text: '正在加载', iconLoading: true, icon: 'icon-loading', allExit: true})
        let path = '$web/' + appName + '/package.json'
        if (appName !== 'findPartner') {
          path = '$game/' + appName + '/version.json'
        }
        return this.$store.dispatch('index/getAppVersion', appName).then((data) => {
          if (data[appName]) {
            this.downloadInfo = data[appName].url
            this.compel = data[appName].compel
          }
          modules.file.pathComplement(path).then((res) => {
            if (res.path) {
              // 判断文件是否存在
              modules.file.fileExists(res.path).then((res1) => {
                if (res1) {
                  return this.$store.dispatch('index/getLocalAppVersion', {url: res.http, appName: appName}).then((data1) => {
                    if (data1 && data1[appName + 'Local'] && data1[appName + 'Local'].version) {
                      // 本地有 去判断线上版本
                      console.log('本地有 去判断线上版本')
                      console.log(data)
                      if (data && data[appName] && data[appName].url) {
                        // 有线上版本 比较版本 看是否需要更新
                        let isNeedUpdate = this.contrastVersion(data[appName], data1[appName + 'Local'])
                        console.log('有线上版本 比较版本 看是否需要更新', isNeedUpdate)
                        if (isNeedUpdate) {
                          // 需要更新 弹框提示 显示直接进入和更新按钮
                          console.log('需要更新 弹框提示 显示直接进入和更新按钮')
                          if (this.compel) {
                            // 强制更新 不显示直接进入
                            console.log('强制更新')
                            this.gameButtons[1].show = false
                          } else {
                            this.gameButtons[1].show = true
                          }
                          this.gameButtons[0].show = false
                          this.gameButtons[2].show = true
                          eventsHub.$emit('toast', {text: '数据包有更新,是否更新后进入?', icon: 'icon-sync-info', iconLoading: false, allExit: true})
                        } else {
                          // 不需要更新 直接打开即可
                          this.openApp(appName)
                        }
                      } else {
                        // 没有线上版本 直接打开
                        this.openApp(appName)
                      }
                    } else {
                      // 本地文件访问不到 判断网络情况
                      console.log('本地文件访问不到 判断网络情况')
                      if (data[appName] && data[appName].url) {
                        // 拉到了线上版本 去下载
                        console.log('拉到了线上版本 去下载')
                        this.downloadApp(appName)
                      } else {
                        // 拉不到线上版本 提示网络问题 显示重试按钮
                        console.log('拉不到线上版本 提示网络问题')
                        this.appLoading = false
                        this.canEnterModule = true
                        errorHandling(data)
                      }
                    }
                  })
                } else {
                  // 本地没有 判断网络情况
                  console.log('本地没有 判断网络情况')
                  if (data[appName] && data[appName].url) {
                    // 拉倒了线上版本 去下载
                    console.log('拉倒了线上版本 去下载')
                    this.downloadApp(appName)
                  } else {
                    // 拉不到线上版本 提示网络问题 显示重试按钮
                    console.log('拉不到线上版本 提示网络问题')
                    this.appLoading = false
                    this.canEnterModule = true
                    errorHandling(data)
                  }
                }
              })
            }
          })
        })
      },
      // 直接打开APP
      openApp (appName) {
        let path = '$game'
        if (appName === 'findPartner') {
          path = '$web'
        }
        this.appLoading = false
        this.canEnterModule = true
        eventsHub.$emit('closeToast')
        modules.nativeRouter.openWebView(path + '/' + appName + '/index.html').then((data) => {
          console.log(data, '打开' + appName)
        })
      },
      // 加入最近打开
      addRecentOpen (musicObj) {
        let recentObj = {
          musicId: musicObj.musicId,
          bookId: musicObj.bookId,
          bookName: musicObj.bookName,
          name: musicObj.name,
          styleName: musicObj.styleName,
          practiceTime: +new Date()
        }
        if (recentObj) {
          if (!this.isLogin) {
            this.$store.dispatch('index/localRecent', recentObj)
          } else {
            this.$store.dispatch('index/addRecentOpen', recentObj)
          }
        }
        if (this.rightType === 'recentOpen') {
          this.$store.dispatch('index/setRightSelect', 0)
        }
      },
      downloadApp (appName) {
        let path = '$game'
        if (appName === 'findPartner') {
          path = '$web'
        }
        this.isDownloadingPeilian = true
        let downloadInfo = this.downloadInfo
        let localPath, targetPath
        let self = this
        // 只显示取消按钮
        self.gameButtons[0].show = true
        self.gameButtons[1].show = false
        self.gameButtons[2].show = false
        modules.file.pathComplement('$downLoadHtmls').then((result) => {
          console.log(result)
          localPath = result.path
          return modules.file.pathComplement(path + '/' + appName)
        }).then((result) => {
          targetPath = result.path
          downloadInfo.localPath = localPath
          self.downloadInfo = downloadInfo
          download.downloadFile({
            url: downloadInfo.url,
            md5: downloadInfo.md5,
            fsize: downloadInfo.fsize,
            localPath: localPath
          }).progress(progress => {
            eventsHub.$emit('toast', {text: '下载中 ' + parseInt(progress.progress * 100) + '%', iconLoading: false, icon: 'icon-updating', allExit: true})
          }).then(res => {
            console.log(res)
            if (res.path) {
              modules.file.unZip(res.path, targetPath).then(function (data) {
                if (data.code !== undefined) {
                  console.log('解压失败' + data.desc)
                } else {
                  console.log('解压成功 直接打开')
                  self.openApp(appName)
                }
              })
            }
          })
        })
      },
      canceldownload () {
        let downloadInfo = this.downloadInfo
        download.abort({
          url: downloadInfo.url,
          md5: downloadInfo.md5,
          fsize: downloadInfo.fsize,
          localPath: downloadInfo.localPath
        }).then(res => {
          console.log(res)
          this.appLoading = false
          this.canEnterModule = true
          eventsHub.$emit('closeToast')
        })
      },
      contrastVersion (serverVersionInfo, localVersionInfo) {
        // 先比较版本号再比较build号
        let serverVersion = serverVersionInfo.version
        let localVersion = localVersionInfo.version
        let serverBuild = serverVersionInfo.build
        let localBuild = localVersionInfo.build

        let serverVersionArr = serverVersion.split('.')
        let serverVersion1 = [serverVersionArr[0], serverVersionArr[1]].join('.')
        let serverVersion2 = serverVersionArr[2]
        console.log(serverVersion1, serverVersion2)

        let localVersionArr = localVersion.split('.')
        let localVersion1 = [localVersionArr[0], localVersionArr[1]].join('.')
        let localVersion2 = localVersionArr[2]
        console.log(localVersion1, localVersion2)

        if (serverVersion1 > localVersion1) { // 需要更新
          console.log('需要更新')
          return true
        } else if (serverVersion1 === localVersion1) { // 继续对比
          if (serverVersion2 > localVersion2) { // 需要更新
            console.log('需要更新')
            return true
          } else if (serverVersion2 === localVersion2) { // 继续对比
            if (serverBuild > localBuild) { // 需要更新
              console.log('需要更新')
              return true
            } else { // 不需要更新
              return false
            }
          } else if (serverVersion2 < localVersion2) { // 不需要更新
            return false
          }
        } else if (serverVersion1 < localVersion1) { // 不需要更新
          return false
        }
      },
      player (musicObj, tick) {
        this.loading = true
        console.log('loading开始--1')
        eventsHub.$emit('toast', {text: '正在加载曲谱', icon: 'icon-loading', iconLoading: true, allExit: true})
        let musicId = parseInt(musicObj.musicId)
        let bookId = parseInt(musicObj.bookId)
        let musicIds = []
        let allMusics = []
        let styleId = null
        switch (musicObj.styleName[0]) {
          case '钢琴独奏版':
            styleId = 1
            break
          case '器乐合奏版':
            styleId = 2
            break
          case '器乐弹唱版':
            styleId = 6
            break
          case '钢琴弹唱版':
            styleId = 5
            break
          case '初练版':
            styleId = 7
            break
        }
        this.$store.dispatch({type: 'scoreList/getMusicList', typeName: 'musicScore', id: bookId}).then((data) => {
          console.log('曲谱列表请求回来--2')
          let list = this.musicList[bookId]
          if (list) {
            // 有缓存
            console.log('有数据')
            list.forEach((data) => {
              let id = data.musicId
              let eachMusic = {}
              let musicVersions = []
              eachMusic.styleName = data.files[0].styleName
              eachMusic.curMusicId = data.files[0].musicId
              eachMusic.styleId = data.files[0].styleId
              let {bookName, musicId, name: musicName} = data
              Object.assign(eachMusic, {bookName, musicId, musicName, musicOrigin: 'bookList'})
              data.files.forEach((item) => {
                if (styleId === item.styleId) {
                  eachMusic.curMusicId = item.musicId
                  eachMusic.styleId = item.styleId
                  id = item.musicId
                  eachMusic.styleName = item.styleName
                }
                musicVersions.push({musicId: item.musicId, version: item.styleName || ''})
              })
              musicIds.push(parseInt(id))
              eachMusic.musicVersions = musicVersions
              allMusics.push(eachMusic)
            })
            console.log({musicId, musicIds, allMusics, tick}, 'scoreData')
            modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics, tick}).then((data) => {
              this.loading = false
              console.log('loading结束')
              eventsHub.$emit('closeToast')
              if (data) {
                // 打开曲谱成功
                console.log('打开曲谱成功')
                this.isOpeningScore = true
                if (this.isPlaying) {
                  this.isPlaying = false
                  this.$refs.player.pause()
                }
              } else {
                // 打开失败
                console.log('打开失败')
                eventsHub.$emit('toast', {text: '打开曲谱失败', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                this.isOpeningScore = false
                this.hideOtherButtons = false
                this.canEnterModule = true
                this.openMusicScore = false
              }
            })
          } else {
            console.log('没有列表数据数据 判断网络情况')
            this.isOpeningScore = false
            this.hideOtherButtons = false
            this.loading = false
            this.canEnterModule = true
            this.openMusicScore = false
            errorHandling(data)
          }
        })
      },
      getRightData () {
        let rightActiveIndex = this.rightSelectedIndex
        let list = []
        let list1 = []
        let musicObj = {}
        if (this.rightType === 'recentOpen') {
          list = this.isLogin ? this.recentOpenList : this.localRecent
        } else if (this.rightType === 'myCollect') {
          list = this.isLogin ? this.collectList : this.localCollect
        }
        list1 = [].concat(JSON.parse(JSON.stringify(list)))
        musicObj = list1[rightActiveIndex]
        if (musicObj) {
          this.clickedMusicId = musicObj.musicId
          this.clickeType = this.rightType
          this.clickedIndex = rightActiveIndex
        }
        return {musicObj: musicObj, list: list1}
      },
      playLoop (musicList, musicIndex) {
        if (this.autoPlay && musicIndex + 1 <= musicList.length - 1) {
          this.$store.dispatch('index/setRightSelect', musicIndex + 1)
          this.clickedMusicId = musicList[musicIndex + 1].musicId
          this.clickedIndex = musicIndex + 1
          this.playMidi(musicList[musicIndex + 1].musicId, musicList, musicIndex + 1)
        } else {
          this.isPlaying = false
          this.hideOtherButtons = false
        }
      },
      playMidi (musicId, musicList, musicIndex) {
        // 弹loading框
        if (this.isPlaying) {
          this.isPlaying = false
          this.$refs.player.pause()
        }
        this.loading = true
        console.log('loading开始--1')
        eventsHub.$emit('toast', {text: '正在加载', icon: 'icon-loading', iconLoading: true, allExit: true})
        let midiData = {url: '', md5: '', fsize: 0}
        let mp3Data = {url: '', md5: '', fsize: 0}
        this.hideOtherButtons = true
        console.log('开始请求数据', musicId)
        this.$store.dispatch('index/getMusicInfo', musicId).then((data) => {
          console.log('列表请求返回--2')
          let musicInfo = this.musicInfo[musicId]
          if (!musicInfo || !musicInfo.files) {
            // 曲谱数据没有缓存并且没有网络的时候提示
            console.log('曲谱数据没有缓存并且没有网络的时候提示')
            errorHandling(data)
            this.loading = false
            this.initPlayer()
            this.hideOtherButtons = false
            // 当前是自动播放则继续播放下一首
            this.playLoop(musicList, musicIndex)
            return
          }
          let hasR = false
          musicInfo.files.forEach((value) => {
            if (value.musicId === musicId) {
              hasR = true
              let Mid = value.bMid
              if (!value.bMid.url) {
                if (!value.mMid.url) {
                  this.loading = false
                  this.initPlayer()
                  eventsHub.$emit('toast', {text: '获取曲谱信息失败', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                  this.hideOtherButtons = false
                  // 当前是自动播放则继续播放下一首
                  this.playLoop(musicList, musicIndex)
                  return
                }
                Mid = value.mMid
              }
              mp3Data.url = value.aMp3.url
              mp3Data.fsize = value.aMp3.fsize
              mp3Data.md5 = value.aMp3.md5
              midiData.url = Mid.url
              midiData.fsize = Mid.fsize
              midiData.md5 = Mid.md5
            }
          })
          if (!hasR) {
            // 找不到曲谱
            console.log('找不到曲谱')
            this.loading = false
            this.initPlayer()
            eventsHub.$emit('toast', {text: '获取曲谱信息失败', icon: 'icon-sync-info', iconLoading: false, allExit: false})
            this.hideOtherButtons = false
            // 当前是自动播放则继续播放下一首
            this.playLoop(musicList, musicIndex)
            return
          }
          let mp3ExitObj = {
            url: mp3Data.url,
            md5: mp3Data.md5,
            localPath: '$filesCache/' + musicId
          }
          let exixtObj = {
            url: midiData.url,
            md5: midiData.md5,
            localPath: '$filesCache/' + musicId
          }
          console.log('判断文件是否存在')
          // 判断文件是否存在
          modules.download.fileIsExists(exixtObj).then((res) => {
            if (!res.path) {
              // 本地没有 去下载
              console.log('本地没有 去下载')
              let downloadObj = {...exixtObj, fsize: midiData.fsize}
              download.downloadFile(downloadObj).then((data) => {
                console.log(data, '下载完成--3')
                if (data.path) {
                  console.log(data, '给播放器赋值--3')
                  this.playerSource = {
                    mid: {
                      midiUrl: data.path
                    },
                    options: {
                      countDownEnable: false
                    }
                  }
                } else {
                  this.loading = false
                  this.initPlayer()
                  this.hideOtherButtons = false
                  eventsHub.$emit('toast', {text: '曲谱信息下载失败', icon: 'icon-sync-info', iconLoading: false, allExit: false})
                  // 当前是自动播放则继续播放下一首
                  this.playLoop(musicList, musicIndex)
                }
              })
            } else {
              // 判断有无mp3
              console.log('本地有 去判断有没有mp3', mp3ExitObj)
              modules.download.fileIsExists(mp3ExitObj).then((data) => {
                console.log(data, '判断有无mp3--4')
                if (data.path) {
                  this.playerSource = {
                    mp3: {
                      midiUrl: res.path,
                      accompanyUrl: data.path
                    },
                    options: {
                      countDownEnable: false
                    }
                  }
                  console.log('有mp3, 给播放器赋值', this.playerSource)
                } else {
                  this.playerSource = {
                    mid: {
                      midiUrl: res.path
                    },
                    options: {
                      countDownEnable: false
                    }
                  }
                  console.log('没有mp3, 给播放器赋值', this.playerSource)
                }
              })
            }
          })
        })
      },
      initPlayer () {
        if (this.isPlaying) {
          this.$refs.player.pause()
          this.$refs.player.reset()
        }
      },
      playerInitComplete (data) {
        // 播放器加载成功
        console.log(data, '播放器加载成功')
        if (!data.result) {
          if (this.loading) {
            eventsHub.$emit('toast', {text: '曲谱播放失败', icon: 'icon-sync-info', iconLoading: false, allExit: false})
            this.loading = false
            this.hideOtherButtons = false
          }
          return
        }
        this.loading = false
        console.log('loading结束，开始播放曲谱')
        eventsHub.$emit('closeToast')
        if (this.isOpeningScore) {
          return
        }
        console.log(data, 'playerInitComplete')
        console.log(this.playerSource, '没播过调play()')
        let recentOpenList = this.isLogin ? this.recentOpenList : this.localRecent
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let rightActiveIndex = this.rightSelectedIndex
        let list = []
        if (this.rightType === 'myCollect') {
          list = collectList
        } else if (this.rightType === 'recentOpen') {
          list = recentOpenList
        }

        // this.playSet()
        this.$refs.player.play().then(() => {
          if (this.loading) {
            //  如果正在loading 不自动切
            return
          }
          this.isPlaying = false
          if (this.isPlayingType !== this.rightType) {
            // 列表切换回来
            this.$store.dispatch('index/setRightType', this.isPlayingType)
          }
          if (this.clickedIndex === list.length - 1) {
            // 已经是最后一首了
            this.hideOtherButtons = false
            return
          }
          this.autoPlay = true
          this.clickedIndex = this.clickedIndex + 1
          rightActiveIndex = Math.min(this.clickedIndex, list.length - 1)
          if (this.clickedIndex > 0) {
            this.$store.dispatch('index/setRightSelect', rightActiveIndex)
          }
          this.clickedMusicId = list[rightActiveIndex].musicId
          this.playMidi(list[this.clickedIndex].musicId, list, this.clickedIndex)
        })
        this.isPlaying = true
        this.isPlayingMusicId = this.clickedMusicId
        this.isPlayingIndex = this.clickedIndex
        this.hideOtherButtons = true
        this.isPlayingType = this.clickeType
      },
      adjustPlayer () {
        modules.notification.regist('pageLifecycle', data => {
          // 打开原生界面
          console.log(data, 'pageLifecycle')
          if (data.case === 'pause') {
            console.log('打开原生界面')
            if (!this.mixerIsOpen) {
              this.loading = false
              eventsHub.$emit('closeToast')
              this.isOpeningScore = true
              if (this.isPlaying) {
                this.isPlaying = false
                this.$refs.player.pause()
              }
            }
            let dd = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss:S')
            console.log(dd)
          }
          if (data.case === 'resume') {
            console.log('关闭原生界面 释放模块锁定状态')
            this.canEnterModule = true
            if (!this.mixerIsOpen) {
              this.isOpeningScore = false
              this.hideOtherButtons = false
              this.openMusicScore = false
              // 退出原生界面的时候 做一次登陆验证
              return this.$store.dispatch('getUserInfo').then(data => {
                if (!data.userInfo.userId) {
                  modules.user.logOut()
                }
              })
            }
            this.mixerIsOpen = false
          }
        })
      },
      removeRegist () {
        // 移除通知
        modules.notification.remove('ClearCache')
        modules.notification.remove('pageLifecycle')
        modules.notification.remove('checkPedalMute')
      },
      getPianoInfo () {
        return this.$store.dispatch('getPianoInfo', {root: true})
      },
      getPianoType () {
        return this.$store.dispatch('getPianoType', {root: true})
      },
      registVloume () {
        //   监听音量设置
        let self = this
        window.fp.utils.volumeManager.registVolumeChange((data) => {
          if (data && data.type === 1) {
            if (data.mute !== undefined && data.mute === true) {
              self.$refs.player && self.$refs.player.setVolume(0)
            } else {
              self.$refs.player && self.$refs.player.setVolume(data.realValue)
            }
          }
        })
      }
    },
    created () {
      this.getPianoInfo()
      this.getPianoType()
      this.createSession()
      this.getIsSupportMutePedal()
      this.getMetronomeStatus()
      this.clearCache()
      this.checkPedalMute()
      this.registVloume()
    },
    mounted () {
      this.adjustPlayer()
    },
    beforeDestroy () {
      this.toolbarHidden = true
    },
    destroyed () {
      clearInterval(window.interval)
      this.removeRegist()
      eventsHub.$emit('closeToast', true)
    },
    components: {
      BannerLeft,
      findButtonBanner,
      contentCenter,
      bannerRight,
      bannerHelp,
      statusBar
    }
  }
</script>
<style lang="scss" scoped>
  .banner-wrapper {
    height: 100%;

  .banner-content {
    display: flex;
    height: 100%;
  }

  }
  .button-banner {
    padding: 0 20px;
  }

</style>
