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
    <!-- <div class="footBack"></div> -->
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
            :hidden="isPlaying"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:'#0000',color: '#fff',textColor: '#fff'}"/>

         <text-icon-item v-for="(button) in bigBUtton"
            :hidden="isPlaying"
            :key="button.id"
            :id="button.id"
            :text="button.text"
            :pianoKey="button.pianoKey"
            :positionOffset="button.positionOffset"
            :style="button.style"
            :icon="button.icon"/>
      <group id="501" :hidden="isPlaying">
        <icon-item id="400" pianoKey="66" titlePosition="below" icon="0xe62b"
                   :style="{color:'#fff',backgroundColor:'#52931E',textColor:'#fff',dotColor: '#52931E',gradient: true}"/>
        <icon-item id="401" pianoKey="67" text="" icon="0xe601"
                   :style="{color:'#fff',backgroundColor:'#52931E',dotColor: '#52931E',textColor:'#fff',gradient: true}"/>
        <icon-item id="402" pianoKey="68" titlePosition="in" :text="speed"
                   :style="{color:'#fff',backgroundColor:'#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18,gradient: true}"/>
        <icon-item id="403" pianoKey="69" text="" icon="0xe605"
                   :style="{color:'#fff',backgroundColor:'#52931E',dotColor: '#52931E',textColor:'#fff',gradient: true}"/>
        <icon-item id="404" pianoKey="70" titlePosition="in" :text="metre"
                   :style="{color:'#fff',backgroundColor:'#52931E',dotColor: '#52931E',textColor:'#fff',fontSize:18,gradient: true}"/>
      </group>
      <icon-item v-for="(button,index) in controlButtons"
        :longClick="button.longClick"
        :key="index"
        :id="button.id"
        :icon="button.icon"
        :pianoKey="button.pianoKey"
        :selected="button.selected"
        :hidden="button.hidden || isPlaying"
        :checkable="button.checkable"
        :checked="button.checked"
        :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: button.dotColor, gradient: button.gradient}"/>

        <icon-item v-for="(button,index) in playButtons"
          :longClick="button.longClick"
          :key="index"
          :id="button.id"
          :icon="button.icon"
          :pianoKey="button.pianoKey"
          :selected="button.selected"
          :hidden="button.hidden"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: '#fff'}"/>
        <icon-item
          key="201"
          id="201"
          icon="0xe625"
          pianoKey="90"
          :hidden="!isPlaying"
          :style="{backgroundColor:'#2000',textColor: '#fff',dotColor: '#fff'}"/>
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
    KEY37,
    KEY42,
    KEY46,
    KEY49,
    KEY58,
    KEY54,
    KEY61,
    KEY66,
    KEY67,
    KEY68,
    KEY69,
    KEY70,
    KEY102,
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY87,
    KEY90,
    KEY97,
    KEY92,
    LONG_KEY94,
    LONG_KEY97,
    KEY94,
    KEY99,
    INTERCEPT_DOWN,
    BACK_PRESSED
  } from 'vue-find'
  import bannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import { modules, download } from 'find-sdk'
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
          },
          midiUrl: 'ddd'
        },
        isPlaying: false,
        isPlayingMusicId: 0,
        isCalendar: false,
        isActivation: false,
        interval: null,
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
          {id: 7, pianoKey: 37, text: '流行经典', icon: '0xe69f', positionOffset: 1, style: {backgroundColor: '#EB3256', dotColor: '#EB3256', gradient: true}},
          {id: 8, pianoKey: 42, text: '名师课程', icon: '0xe69d', positionOffset: 0, style: {backgroundColor: '#8E2F45', dotColor: '#8E2F45', gradient: true}},
          {id: 6, pianoKey: 46, text: '教材系列', icon: '0xe69b', positionOffset: 0, style: {backgroundColor: '#B47119', dotColor: '#B47119', gradient: true}},
          {id: 4, pianoKey: 49, text: '我的曲谱', icon: '0xe6af', positionOffset: 1, style: {backgroundColor: '#A15CFF', dotColor: '#A15CFF', gradient: true}},
          {id: 5, pianoKey: 54, text: '弹奏录制', icon: '0xe615', positionOffset: 0, style: {backgroundColor: '#4E59E1', dotColor: '#4E59E1', gradient: true}},
          {id: 10, pianoKey: 58, text: '乐理&技巧', icon: '0xe69f', positionOffset: 0, style: {backgroundColor: '#F4462F', dotColor: '#F4462F', gradient: true}},
          {id: 9, pianoKey: 61, text: '音乐王国', icon: '0xe604', positionOffset: 1, style: {backgroundColor: '#A15CFF', dotColor: '#A15CFF', gradient: true}}
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
            id: 100,
            gradient: true
          },
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 11
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 12
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 13
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 14
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
            longClick: true,
            text: '',
            icon: '0xe657',
            backgroundColor: '#2fff',
            id: 18
          }
        ],
        metronome: false,
        speed: 120,
        metre: '3/8',
        toolbarHidden: true
      }
    },
    find: {
      [TOOLBAR_PRESSED] ({hidden}) {
        // if (this.isPlaying) {
        //   this.$refs.player.pause()
        //   this.$refs.player.reset()
        //   this.isPlaying = false
        //   this.isPlayingMusicId = 0
        //   return
        // }
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
        this.buttonActions('help')
      },
      [KEY32] () {
        this.buttonActions('login')
      },
      [KEY34] () {
        this.buttonActions('set')
      },
      [KEY37] () {
        this.buttonActions('popular')
      },
      [KEY42] () {
        this.buttonActions('famous')
      },
      [KEY46] () {
        this.buttonActions('material')
      },
      [KEY49] () {
        this.buttonActions('myScore')
      },
      [KEY54] () {
        this.buttonActions('playRecord')
      },
      [KEY61] () {
        // 音乐王国
        this.buttonActions('game')
      },
      [KEY58] () {
        //  乐理与技巧
        this.buttonActions('skill')
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
        this.buttonActions('left')
      },
      [KEY75] () {
        this.buttonActions('right')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [KEY85] () {
        this.buttonActions('search')
      },
      [KEY87] () {
        this.buttonActions('tone')
      },
      [KEY90] () {
        // 熄屏
        this.buttonActions('closeScreen', true)
      },
      [LONG_KEY94] () {
        console.log('up')
        this.buttonActions('right-up')
      },
      [LONG_KEY97] () {
        console.log('down')
        this.buttonActions('right-down')
      },
      [KEY94] () {
        this.buttonActions('right-down')
      },
      [KEY97] () {
        this.buttonActions('right-play')
      },
      [KEY99] () {
        this.buttonActions('changeRightData')
      },
      [KEY92] () {
        this.buttonActions('right-up')
      },
      [BACK_PRESSED] () {
        if (this.isPlaying) {
          this.$refs.player.pause()
          this.$refs.player.reset()
          this.isPlaying = false
          this.isPlayingMusicId = 0
        }
        if (this.metronome) {
          // 节拍器开着 关闭节拍器
          this.buttonActions('closeMetro')
        }
      },
      banner: {
        [INTERCEPT_DOWN] (keys) {
          this.clickHelp(keys)
        }
      },
      screenClose: {
        [INTERCEPT_DOWN] (keys) {
          // 亮屏
          this.buttonActions('closeScreen', false)
        }
      }
    },
    computed: {
      ...mapState({
        sessionId (state) {
          return state.storage.sessionId
        },
        isSynced (state) {
          return state.storage.isSynced
        },
        isLogin (state) {
          let {storage} = state
          if (storage.isLogin) {
            this.userActionButtons[1].text = '注销'
          }
          return storage.isLogin
        },
        userInfo (state) {
          return state.storage.userInfo
        },
        selectedIndex: state => state.index.selectedIndex,
        rightSelectedIndex: state => state.index.rightSelectedIndex,
        usedTime: state => state.index.usedTime,
        namespace () {
          if (this.closeScreen) {
            return 'screenClose'
          }
          return this.showHelpBanner ? 'banner' : ''
        },
        rightType: state => state.index.rightType
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
      },
      isPlaying (val) {
        if (val) {
          modules.device.turnOnOffScreen(!val)
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
        }
      },
      /**
       * @desc 右侧我的收藏数据
       * */
      getCollectList () {
        if (this.isLogin) {
          this.$store.dispatch({type: 'index/getCollectList'})
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
        return this.$store.dispatch('setSession')
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
       * @param {object} playCalendar - 练琴数据
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
       * @desc 用户数据模式
       * */
      userDataMode () {
        modules.settings.getProperty('isPracticeDataActive').then((data) => {
          this.isActivation = Boolean(data)
        })
        modules.settings.getProperty('practiceDataMode').then((data) => {
          this.isCalendar = Boolean(!data)
        })
        modules.notification.regist('UserCountDataMode', data => {
          this.isActivation = data.isActivation
          this.isCalendar = data.isCalendar
          console.log(data, 'UserCountDataMode')
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
        if (this.showHelpBanner) {
          this.showHelpBanner = false
        } else {
          this.$router.back()
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
              this.$store.dispatch('logoutCache', {root: true})
              this.$store.dispatch('logout', {root: true}).then(() => {
                this.$store.dispatch('setSession', '')
                this.$store.dispatch('index/setRightSelect', 0)
              })
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
            break
          case 'up':
            /// 处理热门曲谱的index
            if (activeIndex > 10) {
              activeIndex -= 3
            } else if (activeIndex >= 4 && activeIndex < 8) {
              activeIndex -= 4
            }
            break
          case 'down':
            /// 处理热门曲谱的index
            if (activeIndex > 7 && activeIndex <= 10) {
              activeIndex += 3
            } else if (activeIndex < 4) {
              activeIndex += 4
            }
            break
          case 'tone':
            return modules.nativeRouter.openTimbreView()
          case 'ok':
            console.log(activeIndex)
            if (activeIndex === 7) {
              return this.$router.push({path: '/indexMore', query: {title: '最近更新'}})
            }
            if (activeIndex === 13) {
              return this.$router.push({path: '/indexMore', query: {title: '热门曲谱'}})
            }
            if (activeIndex >= 0 && activeIndex < 7) {
              // 最近更新
              console.log(recentBooks.bookList[activeIndex])
              return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(recentBooks.bookList[activeIndex])}})
            }
            if (activeIndex >= 8 && activeIndex < 13) {
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
              list1 = [].concat(JSON.parse(JSON.stringify(list)))
              musicObj = list1[rightActiveIndex]
            } else if (this.rightType === 'myCollect') {
              list = this.isLogin ? this.collectList : this.localCollect
              list1 = [].concat(JSON.parse(JSON.stringify(list)))
              musicObj = list1[rightActiveIndex]
            }

            if (this.isPlaying) {
              // 获取进度进去播放
              this.$refs.player.pause()
              this.$refs.player.reset()
              this.isPlaying = false
              if (musicObj.musicId === this.isPlayingMusicId) {
                modules.nativeRouter.openMidiPlayer({isLocal: false, musicId: musicObj.musicId})
                this.enterPlay = true
                this.addRecentOpen(musicObj)
                return
              }
            }
            if (this.enterPlay) {
              if (musicObj.musicId === this.isPlayingMusicId) {
                this.$refs.player.reset()
                this.$refs.player.play().then(() => {
                  this.isPlaying = false
                })
                this.enterPlay = false
                this.isPlaying = true
              }
              return
            }
            if (!this.timer) {
              this.timer = +new Date()
            } else if (new Date() - this.timer <= 700) {
              console.log('双击')
              clearInterval(this.clickInterval)
              this.clickInterval = null
              this.timer = 0
              modules.nativeRouter.openMidiPlayer({isLocal: false, musicId: musicObj.musicId})
              this.addRecentOpen(musicObj)
              return
            }
            this.clickInterval = setTimeout(() => {
              console.log('单击')
              this.timer = 0
              this.playMidi(musicObj.musicId)
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
            console.log(bool)
            this.closeScreen = bool
            modules.device.turnOnOffScreen(bool)
            break
          default:
            console.log('108')
        }
        this.$store.dispatch('index/setSelected', activeIndex)
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
      playMidi (musicId) {
        let midiData = {url: '', md5: '', fsize: 0}
        this.$store.dispatch('index/getMusicInfo', musicId).then(() => {
          console.log(this.musicInfo)
          let musicInfo = this.musicInfo[musicId]
          musicInfo.files.forEach((value) => {
            if (value.musicId === musicId) {
              let Mid = value.bMid
              if (!value.bMid.url) {
                if (!value.mMid.url) {
                  alert('mid加载失败')
                  return
                }
                Mid = value.mMid
              }
              midiData.url = Mid.url
              midiData.fsize = Mid.fsize
              midiData.md5 = Mid.md5
            }
          })
          console.log(midiData)
          let exixtObj = {
            url: midiData.url,
            md5: midiData.md5,
            localPath: '$filesCache/' + musicId
          }
          console.log(exixtObj, 'exixtObj')

          // 判断文件是否存在
          modules.download.fileIsExists(exixtObj).then((data) => {
            console.log(data, 'exit')

            if (!data.path) {
              // 去下载
              let downloadObj = {...exixtObj, fsize: midiData.fsize}
              console.log(downloadObj, 'downloadObj')
              download.downloadFile(downloadObj).then((data) => {
                console.log(data, 'download')
                this.playerSource.mid.midiUrl = data.path
                console.log(this.playerSource)
              })
            } else {
              // 直接打开
              console.log('直接打开')
              console.log(data.path)
              this.playerSource = {
                mid: {
                  midiUrl: data.path
                },
                midiUrl: 'ddd'
              }
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
        let recentOpenList = this.isLogin ? this.recentOpenList : this.localRecent
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let rightActiveIndex = this.rightSelectedIndex
        let list = []
        if (this.rightType === 'myCollect') {
          list = collectList
        } else if (this.rightType === 'recentOpen') {
          list = recentOpenList
        }
        this.$refs.player.play().then(() => {
          console.log('end')
          this.isPlaying = false
          if (this.playRightType !== this.rightType) {
            // 列表切换了
            return
          }
          if (rightActiveIndex === list.length - 1) {
            // 已经是最后一首了
            return
          }
          rightActiveIndex++
          rightActiveIndex = Math.min(rightActiveIndex, list.length - 1)
          if (rightActiveIndex > 0) {
            this.$store.dispatch('index/setRightSelect', rightActiveIndex)
          }
          this.buttonActions('right-play')
        })
        this.playRightType = this.rightType
        this.isPlaying = true
        this.isPlayingMusicId = list[rightActiveIndex].musicId
      }
    },
    created () {
      this.initializeData()
      this.getUserStatus()
      this.isSupportMutePedal()
      this.getRecentOpenList()
      this.getCollectList()
      this.getMetronomeStatus()
      this.userDataMode()
      if (!this.sessionId) {
        this.createSession()
      }
    },
    mounted () {
      this.interval = setInterval(() => {
        modules.global.checkAppletsUpgrade()
        if (this.toolbarHidden === false) {
          clearInterval(this.interval)
          return
        }
        this.toolbarHidden = false
      }, 500)
    },
    beforeDestroy () {
      this.toolbarHidden = true
    },
    destroyed () {
      clearInterval(window.interval)
    },
    components: {
      bannerLeft,
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

  .footBack {
    position: absolute;
    width: 2682px;
    height: 7%;
    left: 470px;
    bottom: -2px;
    background: url(./images/bottomBackground.png) no-repeat;
  }
</style>
