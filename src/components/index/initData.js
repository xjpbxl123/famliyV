/**
 * Created by Tommy on 2018/5/23 .
 * */
export default {
  methods: {
    /**
     * @desc  初始化首页曲谱
     * */
    initializeData () {
      return this.$store.dispatch({type: 'index/getHotBooks'}).then(() => {
        return this.$store.dispatch({type: 'index/getRecentBooks'})
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
     * @desc 获取用户状态和用琴时间
     * */
    getUserStatus () {
      if (this.isSynced) {
        this.$store.dispatch('index/getPianoUsedTime')
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
     * @desc 获取用户数据
     * */
    getUserInfo () {
      return this.$store.dispatch('getUserInfo')
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
    }
  },
  created () {
    if (this.isLogin) {
      // 未登录时createSession之后再调
      this.initializeData()
    }
    this.getRecentOpenList()
    this.getCollectList()
    this.getUserStatus()
    this.getUserInfo()
    this.userDataMode()
  }
}
