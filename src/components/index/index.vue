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
        :rightType="rightType"/>
    </div>
    <div class="footBack"></div>
    <find-cover :activeNamespace="namespace">
      <banner-help
        class="help-banner"
        :showHelpBanner="showHelpBanner"
        :helpImg="helpImg"
        :helpIndex="helpIndex"
        :buttonActions="buttonActions"
      />
    </find-cover>
    <toolbar :hidden="toolbarHidden">
      <text-icon-item v-for="(button,index) in userActionButtons"
                      :key="index" :id=button.id :style="{color:'#fff',textColor:'#fff'}"
                      :pianoKey="button.pianoKey" :text="button.text" titlePosition="in" :icon="button.icon"
                      longClick="true"/>
      <image-item v-for="(button,index) in courseButtons"
                  :key="index"
                  :id=button.id
                  titlePosition="below"
                  :image="button.image"
                  :text="button.text"
                  :pianoKey="button.pianoKey"
                  imageType="big"
                  :style="{color: '#fff',textColor: '#fff'}"/>
      <group id="501">
        <icon-item id="400" pianoKey="54" titlePosition="below" icon="0xe62b"
                   :style="{color:'#fff',backgroundColor:'#00a490',textColor:'#fff',dotColor: '#00a490'}"/>
        <icon-item id="401" pianoKey="55" text="" icon="0xe601"
                   :style="{color:'#fff',backgroundColor:'#00a490',dotColor: '#00a490',textColor:'#fff'}"/>
        <icon-item id="402" pianoKey="56" titlePosition="in" :text="speed"
                   :style="{color:'#fff',backgroundColor:'#00a490',dotColor: '#00a490',textColor:'#fff',fontSize:18}"/>
        <icon-item id="403" pianoKey="57" text="" icon="0xe605"
                   :style="{color:'#fff',backgroundColor:'#00a490',dotColor: '#00a490',textColor:'#fff'}"/>
        <icon-item id="404" pianoKey="58" titlePosition="in" :text="metre"
                   :style="{color:'#fff',backgroundColor:'#00a490',dotColor: '#00a490',textColor:'#fff',fontSize:18}"/>
      </group>
      <icon-item v-for="(button,index) in controlButtons"
                 :key="index"
                 :id=button.id
                 :icon="button.icon"
                 :pianoKey="button.pianoKey"
                 :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
    <!-- <fh-weex :hidden="showWeex" :style="weexStyle" ref="weex"/> -->
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
    KEY37,
    KEY42,
    KEY44,
    KEY46,
    KEY54,
    KEY55,
    KEY57,
    KEY58,
    KEY66,
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY90,
    KEY92,
    KEY94,
    KEY97,
    INTERCEPT_DOWN
  } from 'vue-find'
  import bannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import { modules } from 'find-sdk'
  const lefts = [11, 4, 8]
  const rights = [7, 10, 3]
  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png'), require('./images/help-3.jpg')],
        endIndex: -1,
        userActionButtons: [
          {
            pianoKey: 27,
            text: '帮助',
            icon: '0xe69c',
            id: 1
          },
          {
            pianoKey: 30,
            text: '登陆',
            icon: '0xe651',
            id: 2
          },
          {
            pianoKey: 32,
            text: '设置',
            icon: '0xe638',
            id: 3

          }
        ],
        courseButtons: [
          {
            pianoKey: 37,
            text: '我的曲谱',
            image: require('./images/my-score.png'),
            id: 4
          },
          {
            pianoKey: 39,
            text: '弹奏录制',
            image: require('./images/recording.png'),
            id: 5
          },
          {
            pianoKey: 42,
            text: '教材练习',
            image: require('./images/material.png'),
            id: 6
          },
          {
            pianoKey: 44,
            text: '流行经典',
            image: require('./images/popular.png'),
            id: 7
          },
          {
            pianoKey: 46,
            text: '名师课程',
            image: require('./images/master.png'),
            id: 8
          },
          {
            pianoKey: 49,
            text: '音乐王国',
            image: require('./images/game.png'),
            id: 9
          }
        ],
        controlButtons: [
          {
            pianoKey: 66,
            text: '',
            icon: '0xe609',
            backgroundColor: '#3b3b39',
            dotColor: '#3b3b39',
            id: 10
          },
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 11
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 12
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 13
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 14
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#109892',
            dotColor: '#109892',
            id: 15
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe64d',
            backgroundColor: '#BF5E18',
            dotColor: '#BF5E18',
            id: 100
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63c',
            backgroundColor: '#6000',
            dotColor: '#000',
            id: 16
          },
          {
            pianoKey: 92,
            text: '',
            icon: '0xe654',
            backgroundColor: '#6000',
            dotColor: '#000',
            id: 17
          },
          {
            pianoKey: 94,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#6000',
            dotColor: '#000',
            id: 18
          },
          {
            pianoKey: 97,
            text: '',
            icon: '0xe679',
            backgroundColor: '#6000',
            dotColor: '#000',
            id: 19
          }
        ],
        metronome: false,
        speed: 120,
        metre: '3/8',
        toolbarHidden: false
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
        this.buttonActions('help')
      },
      [KEY30] () {
        this.buttonActions('login')
      },
      [KEY32] () {
        this.buttonActions('set')
      },
      [KEY37] () {
        this.buttonActions('myScore')
      },
      [KEY42] () {
        this.buttonActions('material')
      },
      [KEY44] () {
        this.buttonActions('popular')
      },
      [KEY46] () {
        this.buttonActions('famous')
      },
      [KEY54] () {
        // 打开节拍器
        this.buttonActions('openMetro')
      },
      [KEY55] () {
        // 节拍器减速
        this.buttonActions('speedDown')
      },
      [KEY57] () {
        // 节拍器加速
        this.buttonActions('speedUp')
      },
      [KEY58] () {
        // 节拍器换拍子
        this.buttonActions('metroTip')
      },
      [KEY66] () {
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
      [KEY90] () {
        this.buttonActions('right-up')
      },
      [KEY92] () {
        this.buttonActions('right-down')
      },
      [KEY94] () {
        this.buttonActions('right-play')
      },
      [KEY97] () {
        this.buttonActions('changeRightData')
      },
      banner: {
        [INTERCEPT_DOWN] (keys) {
          this.clickHelp(keys)
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
          return this.showHelpBanner ? 'banner' : ''
        },
        rightType: state => state.index.rightType
      }),
      ...mapGetters(['hotBooks', 'recentBooks', 'recentOpenList', 'collectList', 'localCollect', 'localRecent'])
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
          this.userActionButtons[1].text = '登陆'
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
      buttonActions (type) {
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
          case 'famous':
            return this.go('/famous')
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
          case 'logout':
            // 临时写的用来注销账号
            // this.$store.dispatch('logoutCache', {root: true})
            // this.$store.dispatch('logout', {root: true}).then(() => {
            //   this.$store.dispatch('setSession', '')
            // })
            break
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
            console.log('去播放')
            let list = []
            let list1 = []
            let musicObj = {}
            if (this.rightType === 'recentOpen') {
              list = this.isLogin ? this.recentOpenList : this.localRecent
              list1 = [].concat(JSON.parse(JSON.stringify(list)))
              musicObj = list1[rightActiveIndex]
              musicObj.practiceTime = new Date().getTime()
            } else if (this.rightType === 'myCollect') {
              list = this.isLogin ? this.collectList : this.localCollect
              list1 = [].concat(JSON.parse(JSON.stringify(list)))
              musicObj = list1[rightActiveIndex]
              musicObj.time = new Date().getTime()
            }

            if (!this.isLogin) {
              this.$store.dispatch('index/localRecent', musicObj)
            } else {

            }
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
          default:
            console.log('108')
        }
        this.$store.dispatch('index/setSelected', activeIndex)
      }
    },
    created () {
      this.initializeData()
      this.getUserStatus()
      this.getRecentOpenList()
      this.getCollectList()
      this.getMetronomeStatus()
      if (!this.sessionId) {
        this.createSession()
      }
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
