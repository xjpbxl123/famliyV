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
        :dispatch="dispatchUserInfo"
        :isActivation="isActivation"
        :isCalendar="isCalendar"
      />
      <content-center
        :endIndex.sync="endIndex"
        :recentBooks="recentBooks"
        :hotBooks="hotBooks"
        :selectedIndex="selectedIndex"/>
      <bannerRight
        :recentOpenList="isLogin?recentOpenList:localRecent"
        :rightSelectedIndex="rightSelectedIndex"
        :collectList="isLogin?collectList:localCollect"
        :rightType="rightType"
        :isPlaying="isPlaying"
        :isPlayingMusicId="isPlayingMusicId"/>
    </div>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text" :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height" :allExit="true"></findPrompt>
    <findPrompt ref="musicPrompt" :icon="promptInfo.icon" :text="promptInfo.text" :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height" :allExit="false"></findPrompt>
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
            :hidden="hideOtherButtons || !logoutCover"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:'#0000',color: '#fff',textColor: '#fff'}"/>

        <text-icon-item v-for="(button) in bigBUtton"
            :hidden="hideOtherButtons || !logoutCover"
            :key="button.id"
            :id="button.id"
            :text="button.text"
            :pianoKey="button.pianoKey"
            :positionPixels="button.positionPixels"
            :style="button.style"
            :icon="button.icon"/>
        <group id="501" :hidden="hideOtherButtons || !logoutCover">
          <icon-item id="400" pianoKey="66" titlePosition="below" icon="0xe62b"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',textColor:'#fff',dotColor: '#52931E'}"/>
          <icon-item id="401" pianoKey="67" text="" icon="0xe601"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff'}"/>
          <icon-item id="402" pianoKey="68" titlePosition="in" :text="speed"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18}"/>
          <icon-item id="403" pianoKey="69" text="" icon="0xe605"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff'}"/>
          <icon-item id="404" pianoKey="70" titlePosition="in" :text="metre"
                    :style="{color:'#fff',backgroundColor:'#8AC93E,#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18}"/>
        </group>
        <icon-item v-for="(button,index) in controlButtons"
        :longClick="button.longClick"
        :key="index"
        :id="button.id"
        :icon="button.icon"
        :pianoKey="button.pianoKey"
        :selected="button.selected"
        :hidden="button.hidden || hideOtherButtons || !logoutCover"
        :checkable="button.checkable"
        :checked="button.checked"
        :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: button.dotColor}"/>

        <icon-item v-for="(button,index) in playButtons"
          :longClick="button.longClick"
          :key="index"
          :id="button.id"
          :icon="button.icon"
          :pianoKey="button.pianoKey"
          :selected="button.selected"
          :hidden="button.hidden || !logoutCover"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: '#fff'}"/>
        <icon-item
          key="201"
          id="201"
          icon="0xe625"
          pianoKey="90"
          :hidden="!hideOtherButtons || !logoutCover"
          :style="{backgroundColor:'#2000',textColor: '#fff',dotColor: '#fff'}"/>

         <icon-item v-for="(button,index) in logoutButtons"
            :hidden="logoutCover"
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
  import {
    TOOLBAR_PRESSED,
    KEY22,
    KEY27,
    KEY30,
    KEY32,
    KEY34,
    KEY39,
    KEY42,
    KEY46,
    KEY49,
    KEY51,
    KEY54,
    KEY58,
    KEY66,
    KEY67,
    KEY68,
    KEY69,
    KEY70,
    KEY102,
    KEY73,
    LONG_KEY73,
    KEY75,
    LONG_KEY75,
    KEY78,
    LONG_KEY78,
    KEY80,
    LONG_KEY80,
    KEY82,
    KEY85,
    KEY87,
    KEY90,
    KEY97,
    LONG_KEY92,
    KEY92,
    LONG_KEY94,
    KEY94,
    KEY99,
    INTERCEPT_DOWN,
    BACK_PRESSED,
    PEDAL_PRESSED
  } from 'vue-find'
  import BannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import findPrompt from '../common/find-prompt/find-prompt'
  import { modules, download, global } from 'find-sdk'
  const lefts = [11, 4, 8]
  const rights = [7, 10, 3]
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
        playRightType: '',
        enterPlay: false,
        playerSource: {
          mid: {
            midiUrl: ''
          }
        },
        isPlaying: false,
        isPlayingMusicId: 0,
        interval: null,
        logoutCover: true,
        cancelClick: false,
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
        promptInfo: {
          text: '网络连接出错，请检查网络',
          icon: 'icon-sync-info',
          delay: 3000,
          width: 750,
          height: 450
        },
        bigBUtton: [
          {id: 7, pianoKey: 39, text: '流行经典', icon: '0xe69f', positionPixels: -10, style: {backgroundColor: '#FD7778,#EB3256', dotColor: '#EB3256'}},
          {id: 8, pianoKey: 42, text: '名师课程', icon: '0xe69d', positionPixels: 0, style: {backgroundColor: '#D84575,#8E2F45', dotColor: '#8E2F45'}},
          {id: 6, pianoKey: 46, text: '教材系列', icon: '0xe69b', positionPixels: -40, style: {backgroundColor: '#F2C82D,#B47119', dotColor: '#B47119'}},
          {id: 4, pianoKey: 49, text: '我的曲谱', icon: '0xe6af', positionPixels: -30, style: {backgroundColor: '#C499FF,#A15CFF', dotColor: '#A15CFF'}},
          {id: 5, pianoKey: 51, text: '弹奏录制', icon: '0xe615', positionPixels: 30, style: {backgroundColor: '#5F89FC,#4E59E1', dotColor: '#4E59E1'}},
          {id: 10, pianoKey: 54, text: '乐理&技巧', icon: '0xe69f', positionPixels: 40, style: {backgroundColor: '#FB9664,#F4462F', dotColor: '#F4462F'}},
          {id: 9, pianoKey: 58, text: '音乐王国', icon: '0xe604', positionPixels: 0, style: {backgroundColor: '#FBB264,#FC8F1B', dotColor: '#FC8F1B'}}
        ],
        controlButtons: [
          {
            pianoKey: 27,
            text: '',
            icon: '0xe71f',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 20,
            checkable: true,
            checked: true,
            hidden: true
          },
          {
            pianoKey: 102,
            text: '',
            icon: '0xe609',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 100
          },
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 12,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 13,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 14,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 15
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe64d',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 102
          },
          {
            pianoKey: 87,
            text: '',
            icon: '0xe610',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 101
          }
        ],
        playButtons: [
          {
            pianoKey: 99,
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
          }
        ],
        logoutButtons: [
          {
            pianoKey: 78,
            text: '取消',
            icon: '0xe60a',
            id: 288,
            backgroundColor: '#3000',
            show: true
          },
          {
            pianoKey: 75,
            text: '注销',
            icon: '0xe651',
            id: 289,
            backgroundColor: '#3000',
            show: true
          }
        ],
        metronome: false,
        speed: 120,
        metre: '3',
        toolbarHidden: false,
        clickedMusicId: 0,
        hideOtherButtons: false,
        autoPlay: false,
        canEnterModule: true
      }
    },
    find: {
      [TOOLBAR_PRESSED] ({hidden}) {
        this.toolbarHidden = hidden
        if (hidden && this.metronome) {
          return
        }
        this.buttonActions('closeMetro')
      },
      [KEY22] () {
        this.buttonActions('closeMetro')
      },
      [KEY27] () {
        this.buttonActions('keyBoardMute')
      },
      [KEY30] () {
        console.log('KEY30---', new Date().toString())
        this.buttonActions('help')
      },
      [KEY32] () {
        console.log('KEY32---', new Date().toString())
        this.buttonActions('login')
      },
      [KEY34] () {
        console.log('KEY34---', new Date().toString())
        this.buttonActions('set')
      },
      [KEY39] () {
        console.log('KEY39---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('popular')
      },
      [KEY42] () {
        console.log('KEY42---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('famous')
      },
      [KEY46] () {
        console.log('KEY46---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('material')
      },
      [KEY49] () {
        console.log('KEY49---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('myScore')
      },
      [KEY51] () {
        console.log('KEY51---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('playRecord')
      },
      [KEY54] () {
        //  乐理与技巧
        console.log('KEY54---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        this.canEnterModule = false
        this.buttonActions('skill')
      },
      [KEY58] () {
        // 音乐王国
        console.log('KEY58---', new Date().toString())
        if (!this.canEnterModule) {
          console.log('return')
          return
        }
        if (this.isLogin) {
          this.canEnterModule = false
        }
        this.buttonActions('game')
      },
      [KEY66] () {
        // 打开节拍器
        this.buttonActions('openMetro')
      },
      [KEY67] () {
        // 节拍器减速
        this.buttonActions('speedDown')
      },
      [KEY68] () {
        // 节拍器恢复120
        this.buttonActions('speedRecover')
      },
      [KEY69] () {
        // 节拍器加速
        this.buttonActions('speedUp')
      },
      [KEY70] () {
        // 节拍器换拍子
        this.buttonActions('metroTip')
      },
      [KEY102] () {
        // 关机
        this.buttonActions('shutdown')
      },
      [KEY73] () {
        console.log('KEY73---', new Date().toString())
        this.buttonActions('left')
      },
      [LONG_KEY73] () {
        this.buttonActions('left')
      },
      [KEY75] () {
        console.log('KEY75---', new Date().toString())
        !this.logoutCover ? this.buttonActions('login') : this.buttonActions('right')
      },
      [LONG_KEY75] () {
        this.buttonActions('right')
      },
      [KEY78] () {
        console.log('KEY78---', new Date().toString())
        if (!this.logoutCover) {
          this.$refs.prompt.hidePrompt()
          this.logoutCover = !this.logoutCover
        } else {
          this.buttonActions('up')
        }
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        console.log('KEY80---', new Date().toString())
        this.buttonActions('down')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        console.log('KEY82---', new Date().toString())
        this.buttonActions('ok')
      },
      [KEY85] () {
        console.log('KEY85---', new Date().toString())
        this.buttonActions('search')
      },
      [KEY87] () {
        console.log('KEY87---', new Date().toString())
        this.buttonActions('tone')
      },
      [KEY90] () {
        // 熄屏
        this.buttonActions('closeScreen', true)
      },
      [LONG_KEY92] () {
        this.buttonActions('right-up')
      },
      [KEY92] () {
        console.log('KEY92---', new Date().toString())
        this.buttonActions('right-up')
      },
      [LONG_KEY94] () {
        this.buttonActions('right-down')
      },
      [KEY94] () {
        console.log('down')
        console.log('KEY94---', new Date().toString())
        this.buttonActions('right-down')
      },
      [KEY97] () {
        console.log('KEY97---', new Date().toString())
        this.buttonActions('right-play')
      },
      [KEY99] () {
        console.log('KEY99---', new Date().toString())
        this.buttonActions('changeRightData')
      },
      [PEDAL_PRESSED] (key) {
        if (this.isPlaying) {
          // 播放的时候禁用踏板
          return
        }
        switch (key.id) {
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
      [BACK_PRESSED] () {
        console.log('KEY108---', +new Date())
        this.goBack()
      },
      banner: {
        [INTERCEPT_DOWN] (keys) {
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
        isLogin (state) {
          let {storage} = state
          if (storage.isLogin) {
            this.userActionButtons[1].text = '注销'
          }
          return storage.isLogin
        },
        userInfo: state => state.storage.userInfo,
        selectedIndex: state => state.index.selectedIndex,
        rightSelectedIndex: state => state.index.rightSelectedIndex,
        usedTime: state => state.index.usedTime,
        namespace () {
          return this.showHelpBanner || this.closeScreen ? 'banner' : ''
        },
        rightType: state => state.index.rightType,
        scoreList: function (state) {
          return state.storage.cache.renderCache.scoreList
        }
      }),
      ...mapGetters(['hotBooks', 'recentBooks', 'recentOpenList', 'collectList', 'localCollect', 'localRecent', 'musicInfo'])
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
       * @desc  初始化首页曲谱
       * */
      initializeData () {
        this.$store.dispatch({type: 'index/getRecentBooks'}).then(() => {
          this.$store.dispatch({type: 'index/getHotBooks'})
        })
      },
      /**
       * @desc 右侧最近打开数据
       * */
      getRecentOpenList () {
        if (this.isLogin) {
          this.$store.dispatch({type: 'index/getRecentOpenList'})
        } else {
          this.$store.dispatch('index/localRecent', this.localRecent || [])
        }
      },
      /**
       * @desc 右侧我的收藏数据
       * */
      getCollectList () {
        if (this.isLogin) {
          this.$store.dispatch({type: 'index/getCollectList'})
        } else {
          this.$store.dispatch('index/localCollect', this.localCollect || [])
        }
      },
      /**
       * @desc dispatch 用户状态
       * */
      dispatchUserInfo () {
        return this.$store.dispatch('getUserInfo')
      },
      /**
       * @desc 获取用户状态和用琴时间
       * */
      getUserStatus () {
        if (this.isSynced) {
          this.$store.dispatch('index/getPianoUsedTime')
        }
      },
      /**
       * @desc 创建会话ID
       * */
      createSession () {
        if (!this.isLogin) {
          return this.$store.dispatch('setSession')
        }
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
       * @desc 获取节拍器状态
       * */
      getMetronomeStatus () {
        modules.metronome.getCurrentTempo().then((data) => {
          this.speed = data.tempoSpeed
          this.metre = data.metre
        })
      },
      /**
       * @desc 获取是否支持静音踏板
       * */
      isSupportMutePedal () {
        modules.settings.getProperty('isSupportMutePedal').then((data) => {
          if (data) {
            // 支持
            this.controlButtons[0].hidden = false
            modules.settings.getProperty('isPedalMuteOn').then((data) => {
              this.controlButtons[0].checked = data
            })
          }
        })
      },
      /**
       * @desc 监听清空缓存/恢复出厂设置
       * */
      clearCache () {
        modules.notification.regist('ClearCache', data => {
          if (data.isClearCache) {
            // 清空缓存
            this.$store.dispatch('clearCache')
          } else {
            // 恢复出厂设置
            this.$store.dispatch('restoreFactorySettings')
          }
        })
      },
      getUserInfo () {
        this.$store.dispatch('getUserInfo')
      },
      /**
       * @desc 用户数据模式
       * */
      userDataMode () {
        this.$store.dispatch('index/getIsPracticeDataActive').then(() => {
          this.$store.dispatch('index/getPracticeDataMode').then(() => {
            this.$store.dispatch('index/registUserCountDataMode')
          })
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
        this.$router.push(params)
      },
      goBack () {
        if (this.isPlaying) {
          this.$refs.player.pause()
          this.$refs.player.reset()
          this.isPlaying = false
          this.isPlayingMusicId = 0
          this.hideOtherButtons = false
        }
        if (this.metronome) {
          // 节拍器开着 关闭节拍器
          this.buttonActions('closeMetro')
        }
        if (!this.logoutCover) {
          this.$refs.prompt.hidePrompt()
          this.logoutCover = true
          this.toolbarHidden = false
        }
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type, bool) {
        let activeIndex = this.selectedIndex
        let recentOpenList = this.isLogin ? this.recentOpenList : this.localRecent
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let rightActiveIndex = this.rightSelectedIndex
        let hotBooks = this.hotBooks
        let recentBooks = this.recentBooks
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
              // 临时写的用来注销账号
              // this.$store.dispatch('logoutCache', {root: true})
              // 弹出提示框
              if (this.logoutCover) {
                this.promptInfo.text = '确认注销吗？'
                this.$refs.prompt.showPrompt()
                this.logoutCover = !this.logoutCover
              } else {
                this.$store.dispatch('logout', {root: true}).then(() => {
                  this.createSession()
                  this.$refs.prompt.hidePrompt()
                  this.logoutCover = !this.logoutCover
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
          case 'popular':
            return this.go('/popular')
          case 'material':
            return this.go('/material')
          case 'skill':
            return modules.nativeRouter.openAppsView()
          case 'game':
            return modules.game.openKingdom()
          case 'playRecord':
            return modules.nativeRouter.openMidiRecordView()
          case 'famous':
            return modules.nativeRouter.openArtistCourseView()
          // return this.go('/famous')
          case 'shutdown':
            return this.go('/shutdown')
          case 'myScore':
            return this.go('/myScore')
          case 'closeMetro':
            console.log('close')
            if (this.metronome) {
              this.toolbarHidden = false
              modules.metronome.stop()
              this.metronome = false
            }
            break
          case 'openMetro':
            if (!this.metronome) {
              this.toolbarHidden = true
              modules.metronome.start()
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
            if (this.speed < 120) {
              for (let i = 0; i < time; i++) {
                modules.metronome.changeTempoSpeed(true).then(() => {
                })
              }
            } else if (this.speed > 120) {
              for (let i = 0; i < time; i++) {
                modules.metronome.changeTempoSpeed(false).then(() => {
                })
              }
            }
            this.getMetronomeStatus()
            break
          case 'metroTip':
            modules.metronome.changeTempo().then(() => {
              this.getMetronomeStatus()
            })
            break
          case 'left':
            if (activeIndex <= 0) {
              return
            }
            let leftIndex = lefts.indexOf(activeIndex)
            if (leftIndex !== -1) {
              activeIndex = rights[leftIndex]
            } else {
              activeIndex--
            }
            this.$store.dispatch('index/setSelected', activeIndex)
            break
          case 'right':
            if (activeIndex === 13) {
              return
            }
            let rightIndex = rights.indexOf(activeIndex)
            if (rightIndex !== -1) {
              activeIndex = lefts[rightIndex]
            } else {
              activeIndex++
            }
            this.$store.dispatch('index/setSelected', activeIndex)
            break
          case 'up':
            /// 处理热门曲谱的index
            if (activeIndex > 10) {
              activeIndex -= 3
            } else if (activeIndex >= 4 && activeIndex < 8) {
              activeIndex -= 4
            }
            this.$store.dispatch('index/setSelected', activeIndex)
            break
          case 'down':
            /// 处理热门曲谱的index
            if (activeIndex > 7 && activeIndex <= 10) {
              activeIndex += 3
            } else if (activeIndex < 4) {
              activeIndex += 4
            }
            this.$store.dispatch('index/setSelected', activeIndex)
            break
          case 'tone':
            return modules.nativeRouter.openTimbreView()
          case 'ok':
            if (recentBooks.bookList.length === 0) {
              return
            }
            if (activeIndex === 7) {
              return this.$router.push({path: '/indexMore', query: {title: '最近更新'}})
            }
            if (activeIndex === 13) {
              return this.$router.push({path: '/indexMore', query: {title: '热门曲谱'}})
            }
            if (activeIndex >= 0 && activeIndex < 7) {
              // 最近更新
              if (recentBooks.bookList.length === 0) {
                return
              }
              return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(recentBooks.bookList[activeIndex])}})
            }
            if (activeIndex >= 8 && activeIndex < 13) {
              if (hotBooks.bookList.length === 0) {
                return
              }
              // 热门曲谱
              return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(hotBooks.bookList[activeIndex - 8])}})
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
            this.$store.dispatch('addPractice')
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
            if (list1.length === 0) {
              return
            }
            if (!this.timer) {
              this.timer = +new Date()
            } else if (new Date() - this.timer <= 700) {
              console.log('双击')
              if (this.cancelClick) {
                return false
              }
              clearInterval(this.clickInterval)
              this.clickInterval = null
              this.timer = 0
              if (this.isPlaying) {
                // 如果在播放 先暂停
                this.$refs.player.pause()
                this.isPlaying = false
                if (musicObj.musicId === this.isPlayingMusicId) {
                  window.fp.uis.player.getProgress().then(data => {
                    if (data.curTick) {
                      this.player(musicObj, data.curTick)
                    }
                    this.$refs.player.reset()
                    this.enterPlay = true
                    this.addRecentOpen(musicObj)
                  })
                } else {
                  this.player(musicObj, 0)
                }
              } else {
                this.player(musicObj, 0)
              }
              return
            }
            this.clickInterval = setTimeout(() => {
              console.log('单击')
              if (this.cancelClick) {
                return false
              }
              if (this.isPlaying) {
                // 获取进度进去播放
                console.log(this.isPlaying, 'playing')
                this.$refs.player.pause()
                this.isPlaying = false
                if (musicObj.musicId === this.isPlayingMusicId) {
                  window.fp.uis.player.getProgress().then(data => {
                    this.$refs.player.reset()
                    if (data.curTick) {
                      this.player(musicObj, data.curTick)
                    }
                    this.enterPlay = true
                    this.addRecentOpen(musicObj)
                  })
                  return
                }
              }
              if (this.enterPlay) {
                // 已经进入过曲谱 如果没有移动光标直接播放即可
                if (musicObj.musicId === this.isPlayingMusicId) {
                  this.$refs.player.reset()
                  this.$refs.player.play().then(() => {
                    this.isPlaying = false
                  })
                  this.hideOtherButtons = true
                  this.autoPlay = false
                  this.promptInfo.text = '再次点击进入曲谱'
                  this.$refs.musicPrompt.showPrompt()
                  this.enterPlay = false
                  this.isPlaying = true
                  return
                }
              }
              this.timer = 0
              this.autoPlay = false
              this.playMidi(musicObj.musicId, list1, rightActiveIndex)
            }, 700)
            break
          case 'changeRightData':
            // 切换右侧数据
            let rightTypeName = 'recentOpen'
            if (this.rightType === 'recentOpen') {
              rightTypeName = 'myCollect'
            }
            this.$store.dispatch('index/setRightType', rightTypeName).then(() => {
              this.$store.dispatch('index/setRightSelect', 0)
            })
            break
          case 'keyBoardMute':
            this.controlButtons[0].checked = !this.controlButtons[0].checked
            modules.mutePedal.setPedalMuteOnOff()
            modules.settings.getProperty('isPedalMuteOn').then((data) => {
              this.controlButtons[0].checked = data
            })
            break
          case 'closeScreen':
            this.closeScreen = bool
            modules.device.turnOnScreen(!bool)
            break
          default:
            console.log('108')
        }
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
      player (musicObj, tick) {
        this.cancelClick = true
        let musicId = parseInt(musicObj.musicId)
        let bookId = parseInt(musicObj.bookId)
        let musicIds = []
        let allMusics = []
        let styleId = null
        let styleName = ''
        if (musicObj.styleName !== '') {
          styleName = musicObj.styleName[0]
        }
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
        this.$store.dispatch({type: 'scoreList/getScoreList', typeName: 'musicScore', id: bookId}).then(() => {
          let list = this.scoreList[bookId]
          if (list) {
            // 有缓存
            list.forEach((data) => {
              let id = data.musicId
              let eachMusic = {}
              let musicVersions = []
              // eachMusic.bookName = data.bookName || ''
              // eachMusic.musicOrigin = 'bookList'
              // eachMusic.musicId = data.musicId
              // eachMusic.musicName = data.name
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
            console.log({musicId, musicIds, allMusics, tick})
            modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics, tick})
          } else {
            // 无缓存
            let musicInfo = {}
            musicInfo.bookName = musicObj.bookName || ''
            musicInfo.musicOrigin = 'bookList'
            musicInfo.musicId = musicId
            musicInfo.musicName = musicObj.name || musicObj.musicName
            musicInfo.curMusicId = musicId
            musicInfo.styleName = styleName
            musicInfo.styleId = styleId
            musicInfo.musicVersions = [[musicId, styleName]]
            allMusics.push(musicInfo)
            musicIds.push(musicId)
            console.log({musicId, musicIds, allMusics, tick})
            modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics, tick})
          }
        })
      },
      playMidi (musicId, musicList, musicIndex) {
        this.clickedMusicId = musicId
        let midiData = {url: '', md5: '', fsize: 0}
        let mp3Data = {url: '', md5: '', fsize: 0}
        this.hideOtherButtons = true
        this.$store.dispatch('index/getMusicInfo', musicId).then((data) => {
          let musicInfo = this.musicInfo[musicId]
          if (!musicInfo || !musicInfo.files) {
            // 曲谱数据没有缓存并且没有网络的时候提示
            global.getStatusBarItem().then((data) => {
              if (!data.wifi.title) {
                this.promptInfo.text = '网络连接出错，请检查网络'
                this.$refs.musicPrompt.showPrompt()
                // 当前是自动播放则继续播放下一首
                if (this.autoPlay) {
                  this.autoPlay = true
                  if (musicIndex + 1 <= musicList.length - 1) {
                    this.$store.dispatch('index/setRightSelect', musicIndex + 1)
                    this.playMidi(musicList[musicIndex + 1].musicId, musicList, musicIndex + 1)
                  }
                } else {
                  this.hideOtherButtons = false
                }
              }
            })
            return
          }
          musicInfo.files.forEach((value) => {
            if (value.musicId === musicId) {
              let Mid = value.bMid
              if (!value.bMid.url) {
                if (!value.mMid.url) {
                  this.promptInfo.text = 'mid加载失败'
                  this.$refs.musicPrompt.showPrompt()
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

          // 判断文件是否存在
          modules.download.fileIsExists(exixtObj).then((res) => {
            if (!res.path) {
              global.getStatusBarItem().then((status) => {
                if (!status.wifi.title) {
                  // 当前曲谱文件没有缓存并且没有网络则提示
                  this.promptInfo.text = '网络连接出错，请检查网络'
                  this.$refs.musicPrompt.showPrompt()
                  // 如果是自动播放即继续播放下一首
                  if (this.autoPlay) {
                    if (musicIndex + 1 <= musicList.length - 1) {
                      this.$store.dispatch('index/setRightSelect', musicIndex + 1)
                      this.playMidi(musicList[musicIndex + 1].musicId, musicList, musicIndex + 1)
                    }
                  } else {
                    this.hideOtherButtons = false
                  }
                } else {
                  // 去下载
                  let downloadObj = {...exixtObj, fsize: midiData.fsize}
                  download.downloadFile(downloadObj).then((data) => {
                    this.playerSource.mid.midiUrl = data.path
                  })
                }
              })
            } else {
              // 判断有无mp3
              modules.download.fileIsExists(mp3ExitObj).then((data) => {
                if (data.path) {
                  this.playerSource = {
                    mp3: {
                      midiUrl: res.path,
                      accompanyUrl: data.path
                    }
                  }
                } else {
                  this.playerSource = {
                    mid: {
                      midiUrl: res.path
                    }
                  }
                }
              })
            }
          })
        })
      },
      playerInitComplete (data) {
        // 播放器加载成功
        console.log(data, 'playerInitComplete')
        if (!data.result) {
          return
        }
        this.promptInfo.text = '再次点击进入曲谱'
        this.$refs.musicPrompt.showPrompt()
        let recentOpenList = this.isLogin ? this.recentOpenList : this.localRecent
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let rightActiveIndex = this.rightSelectedIndex
        let list = []
        if (this.rightType === 'myCollect') {
          list = collectList
        } else if (this.rightType === 'recentOpen') {
          list = recentOpenList
        }
        // if (this.cancelPlay) {
        //   return
        // }
        this.$refs.player.play().then(() => {
          this.isPlaying = false
          if (this.playRightType !== this.rightType) {
            // 列表切换了
            return
          }
          if (rightActiveIndex === list.length - 1) {
            // 已经是最后一首了
            this.hideOtherButtons = false
            return
          }
          this.autoPlay = true
          rightActiveIndex++
          rightActiveIndex = Math.min(rightActiveIndex, list.length - 1)
          if (rightActiveIndex > 0) {
            this.$store.dispatch('index/setRightSelect', rightActiveIndex)
          }
          // this.buttonActions('right-play')
          this.playMidi(list[rightActiveIndex].musicId, list, rightActiveIndex)
        })
        this.playRightType = this.rightType
        this.isPlaying = true
        this.isPlayingMusicId = this.clickedMusicId
        this.hideOtherButtons = true
      },
      adjustPlayer () {
        modules.notification.regist('pageLifecycle', data => {
          console.log(data, 'pageLifecycle')
          if (data.case === 'pause') {
            if (this.isPlaying) {
              this.isPlaying = false
              this.$refs.player.pause()
            }
          }
          if (data.case === 'resume') {
            this.cancelClick = false
            this.hideOtherButtons = false
            this.canEnterModule = true
          }
        })
      },
      removeRegist () {
        // 移除通知
        modules.notification.remove('ClearCache')
        modules.notification.remove('pageLifecycle')
      }
    },
    created () {
      this.adjustPlayer()
      this.initializeData()
      this.getUserStatus()
      this.createSession()
      this.isSupportMutePedal()
      this.getRecentOpenList()
      this.getCollectList()
      this.getMetronomeStatus()
      this.userDataMode()
      this.clearCache()
      this.getUserInfo()
    },
    beforeDestroy () {
      this.toolbarHidden = true
    },
    destroyed () {
      clearInterval(window.interval)
      this.removeRegist()
    },
    mounted () {
      // 断网提醒
      global.getStatusBarItem().then((data) => {
        if ((this.hotBooks.bookList.length === 0 || this.recentBooks.bookList.length === 0) && !data.wifi.title) {
          this.promptInfo.text = '网络连接出错，请检查网络'
          this.$refs.prompt.showPrompt()
        }
      })
    },
    components: {
      BannerLeft,
      findButtonBanner,
      contentCenter,
      bannerRight,
      bannerHelp,
      statusBar,
      findPrompt
    }
  }
</script>
<style lang="scss" scoped>
  .find-prompt {
      width: 750px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 2043px;
  }
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
