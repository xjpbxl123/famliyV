<template>
  <div class="banner-wrapper">
    <div class="banner-content">
      <banner-left
        :isSynced="isSynced"
        :isLogin="isLogin"
        :userInfo="userInfo"
        :sessionId="sessionId"
        :usedTime="usedTime"
        :setCalendarData="setCalendarData"
        :dispatch="initializeData"
      />
      <content-center
        :endIndex.sync="endIndex"
        :recentBooks="recentBooks"
        :hotBooks="hotBooks"
        :selectedIndex="selectedIndex"/>
      <bannerRight/>
    </div>
    <find-button-banner className="button-banner">
      <user-buttons
        :isLogin="isLogin"
        :action="buttonActions"/>
      <voice-control/>
      <course-button :action="buttonActions"/>
      <control-button :action="buttonActions"/>
    </find-button-banner>
    <banner-help
      class="help-banner"
      :showHelpBanner="showHelpBanner"
      :helpImg="helpImg"
      :helpIndex="helpIndex"
      :buttonActions="buttonActions"
    />
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
  import { KEY27, KEY108, KEY30, KEY75, KEY73, KEY_ANY } from 'vue-find'
  import bannerLeft from './index-banner-left'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'

  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png')],
        endIndex: -1
      }
    },
    find: {
      [KEY27] () {
        this.buttonActions('help')
      },
      [KEY30] () {
        this.buttonActions('login')
      },
      [KEY73] () {
        this.buttonActions('left')
      },
      [KEY75] () {
        this.buttonActions('right')
      },
      [KEY108] () {
        this.buttonActions()
      },
      [KEY_ANY] (keys) {
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
        recentBooks: state => state.index.recentBooks,
        usedTime: state => state.index.usedTime
      }),
      ...mapGetters(['hotBooks'])
    },
    watch: {
      /**
       * @desc 是否已经从原生storage同步完成
       * */
      isSynced (val) {
        if (val) {
          if (!this.isLogin) {
            this.createSession()
          } else {
            this.getUserStatus()
          }
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
        if (this.isSynced && this.isLogin) {
          this.$store.dispatch('getUserInfo')
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
       * @desc 显示帮助
       * */
      showHelp () {
        if (this.showHelpBanner) {
          if (this.helpIndex < this.helpImg.length - 1) {
            this.helpIndex = this.helpIndex + 1
          } else {
            this.helpIndex = 0
            this.showHelpBanner = false
          }
        } else {
          this.showHelpBanner = true
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
        switch (type) {
          case 'help':
            return this.showHelp()
          case 'login':
            return this.go('/login')
          case 'settings':
            return false
          case 'left':
            if (activeIndex === 0) {
              return
            }
            activeIndex--
            break
          case 'right':
            if (activeIndex === this.endIndex) {
              return
            }
            activeIndex++
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
          default:
            this.goBack()
        }
        this.$store.dispatch('index/setSelected', activeIndex)
      }
    },
    created () {
      this.initializeData()
      this.getUserStatus()
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
      bannerHelp
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
