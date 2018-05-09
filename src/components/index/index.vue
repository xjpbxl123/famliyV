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
        :setCalendarData="setCalendarData"/>
      <content-center
        :endIndex.sync="endIndex"
        :recentBooks="recentBooks"
        :hotBooks="hotBooks"
        :selectedIndex="selectedIndex"/>
      <bannerRight
        :recentOpenList="recentOpenList"
        :rightSelectedIndex="rightSelectedIndex"
        :collectList="collectList"
        :rightType="rightType"/>
    </div>
    <!--<find-button-banner>-->
      <!--<user-buttons-->
        <!--:isLogin="isLogin"-->
        <!--:action="buttonActions"/>-->
      <!--<voice-control/>-->
      <!--<course-button :action="buttonActions"/>-->
      <!--<control-button :action="buttonActions"/>-->
    <!--</find-button-banner>-->
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
    <toolbar>
      <icon-item v-for="(button,index) in userActionButtons"
                 :key="index" :id="index"
                 :pianoKey="button.pianoKey" :text="button.text" :icon="button.icon" longClick="true"/>

      <group id="501">
        <icon-item id="400" pianoKey="54" text="" icon="0xe62b"/>
        <icon-item id="401" pianoKey="55" text="" icon="0xe601"/>
        <icon-item id="402" pianoKey="56" text="120" icon=""/>
        <icon-item id="403" pianoKey="57" text="" icon="0xe605"/>
        <icon-item id="404" pianoKey="58" text="3/8" icon=""/>
      </group>
    </toolbar>
    <fh-weex :hidden="showWeex" :style="weexStyle" ref="weex"/>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import findButtonBanner from '../common/find-button-banner/find-button-banner'
  import bannerHelp from './index-banner-help'
  import userButtons from './index-user-buttons'
  import courseButton from './index-course-button'
  import controlButton from './index-control-button'
  import findDot from '../common/find-dot/find-dot'
  import voiceControl from './index-voice-control'
  import {
    KEY27,
    KEY108,
    KEY30,
    KEY42,
    KEY75,
    KEY73,
    KEY_ANY,
    KEY66,
    KEY78,
    KEY80,
    KEY94,
    KEY97,
    KEY99,
    KEY102,
    KEY44,
    KEY82
  } from 'vue-find'
  import bannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import statusBar from '../common/find-status-bar/find-status-bar'

  const lefts = [11, 4, 8]
  const rights = [7, 10, 3]
  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png'), require('./images/help-3.jpg')],
        endIndex: -1,
        weexStyle: {
          left: 400,
          top: 100,
          width: 2000,
          height: 900,
          backgroundColor: '#30000000',
          float: 'left',
          borderWidth: 3,
          borderColor: '#ef9900',
          borderRadius: 20
        },
        showWeex: true,
        userActionButtons: [
          {
            pianoKey: 27,
            text: '帮助',
            icon: '0xe69c'
          },
          {
            pianoKey: 30,
            text: '登陆',
            icon: '0xe651'
          },
          {
            pianoKey: 32,
            text: '设置',
            icon: '0xe638'
          },
          {
            pianoKey: 37,
            text: '我的曲谱',
            icon: '0xe69c'
          },
          {
            pianoKey: 39,
            text: '弹奏录制',
            icon: '0xe69c'
          },
          {
            pianoKey: 42,
            text: '教材练习',
            icon: '0xe69c'
          },
          {
            pianoKey: 44,
            text: '流行经典',
            icon: '0xe69c'
          },
          {
            pianoKey: 46,
            text: '名师课程',
            icon: '0xe69c'
          },
          {
            pianoKey: 49,
            text: '音乐王国',
            icon: '0xe69c'
          },
          {
            pianoKey: 66,
            text: '',
            icon: '0xe609'
          },
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660'
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b'
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b'
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650'
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a'
          }
        ]
      }
    },
    find: {
      [KEY27] () {
        this.buttonActions('help')
      },
      [KEY30] () {
        this.buttonActions('login')
      },
      [KEY42] () {
        this.buttonActions('material')
      },
      [KEY44] () {
        this.buttonActions('popular')
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
      [KEY94] () {
        this.buttonActions('changeRightData')
      },
      [KEY97] () {
        this.buttonActions('right-up')
      },
      [KEY99] () {
        this.buttonActions('right-down')
      },
      [KEY102] () {
        this.buttonActions('right-play')
      },
      [KEY108] () {
        console.log(this)
        this.buttonActions()
      },
      [KEY66] () {
        this.buttonActions('logout')
      },
      banner: {
        [KEY_ANY] (key) {
          this.clickHelp(key)
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
      ...mapGetters(['hotBooks', 'recentBooks', 'recentOpenList', 'collectList'])
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
          this.getRecentOpenList()
          this.getCollectList()
        }
      }
    },
    methods: {
      /**
       * @desc  初始化首页曲谱
       * */
      initializeData () {
        this.$store.dispatch({type: 'index/getRecentBooks'})
        this.$store.dispatch({type: 'index/getHotBooks'})
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
       * @desc 右侧最近打开数据
       * */
      getRecentOpenList () {
        this.$store.dispatch({type: 'index/getRecentOpenList'})
      },
      /**
       * @desc 右侧我的收藏数据
       * */
      getCollectList () {
<<<<<<< HEAD
        this.$store.dispatch({type: 'index/getCollectList'})
=======
        if (this.isLogin) {
          return this.$store.dispatch({type: 'index/getCollectList'})
        } else {
          return this.$store.dispatch('index/localCollectList', this.localCollect || [])
        }
>>>>>>> findh5-60
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
       * @desc 帮助页点击事件
       * */
      clickHelp (key) {
        if (this.showHelpBanner) {
          if (key === 108) {
            this.helpIndex = 0
            this.showHelpBanner = false
            return
          }
          if (this.helpIndex < this.helpImg.length - 1) {
            this.helpIndex = this.helpIndex + 1
          } else {
            this.helpIndex = 0
            this.showHelpBanner = false
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
      openWeex () {
        this.showWeex = false
        this.$refs.weex.openUrl(`${process.env.weex_url}dist/index.js`)
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        // 如果是帮助页
        let activeIndex = this.selectedIndex
        let recentOpenList = this.recentOpenList
        let collectList = this.collectList
        let rightActiveIndex = this.rightSelectedIndex
        let hotBooks = this.hotBooks
        let recentBooks = this.recentBooks
        switch (type) {
          case 'help' :
            this.showHelpBanner = true
            break
          case 'login':
            if (!this.isLogin) {
              // 未登录进入登录页
              return this.go('/login')
            } else {
              // 进入账户页
              console.log('已登录')
              return
            }
          case 'settings':
            return false
          case 'popular':
            return this.go('/popular')
          case 'material':
            return this.go('/material')
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
            if (activeIndex === this.endIndex) {
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
            this.$store.dispatch('logoutCache', {root: true})
            this.$store.dispatch('logout', {root: true}).then(() => {
              this.$store.dispatch('setSession', '')
            })
            break
          case 'ok':
            if (activeIndex >= 0 && activeIndex <= 7) {
              // 最近更新
              return this.$router.push({path: '/scoreList', query: {bookId: recentBooks.bookList[activeIndex].bookId}})
            }
            if (activeIndex >= 8 && activeIndex <= 12) {
              // 热门曲谱
              return this.$router.push({path: '/scoreList', query: {bookId: hotBooks.bookList[activeIndex - 8].bookId}})
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
            this.$store.dispatch('index/setRightSelect', rightActiveIndex)
            break
          case 'right-play':
            // 右侧列表play事件
            console.log('去播放')
            break
          case 'changeRightData':
            // 切换右侧数据
            if (this.rightType === 'myCollect') {
              this.$store.dispatch('index/setRightType', 'recentOpen')
            } else if (this.rightType === 'recentOpen') {
              this.$store.dispatch('index/setRightType', 'myCollect')
            }
            this.$store.dispatch('index/setRightSelect', 0)
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
    },
    components: {
      bannerLeft,
      findButtonBanner,
      findDot,
      voiceControl,
      userButtons,
      courseButton,
      controlButton,
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
