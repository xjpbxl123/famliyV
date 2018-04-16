<template>
  <div class="banner-wrapper">
    <div class="banner-content">
      <banner-left
        :setCalendarData="setCalendarData"
        :buttonActions="buttonActions"/>
      <contentCenter :endIndex.sync="endIndex" :recentBooks="recentBooks" :hotBooks="hotBooks" :activeIndex="activeIndex"></contentCenter>
      <bannerRight></bannerRight>
    </div>
    <find-button-banner className="button-banner">
      <user-buttons :action="buttonActions"/>
      <voice-control/>
      <course-button :action="buttonActions"/>
      <control-button :action="buttonActions"/>
    </find-button-banner>
    <div class="help-banner"
         :class="{'show-help-banner':showHelpBanner}"
         :style="{'background-image':`url(${helpImg[helpIndex]})`}"
         @click="buttonActions('help')"
    ></div>
  </div>
</template>
<script type="text/javascript">
  import findButton from '../common/find-button/find-button'
  import findButtonBanner from '../common/find-button-banner/find-button-banner'
  import userButtons from './index-user-buttons'
  import courseButton from './index-course-button'
  import controlButton from './index-control-button'
  import findDot from '../common/find-dot/find-dot'
  import voiceControl from './index-voice-control'
  import { KEY27, KEY108 } from 'vue-find'
  import bannerLeft from './index-banner-left'
  import mixins from './mixins'
  import contentCenter from './index-content-center'
  import bannerRight from './index-banner-right'
  import { KEY75, KEY73 } from 'vue-find/src/pianoKeys.js'

  export default {
    mixins: [mixins],
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png')],
        activeIndex: 0,
        endIndex: -1
      }
    },
    find: {
      [KEY27] () {
        this.showHelp()
      },
      [KEY108] () {
        this.goBack()
      },
      [KEY75] () {
        this.keyIndex()
      },
      [KEY73] () {
        this.keyBack()
      }
    },
    methods: {
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
        switch (type) {
          case 'help':
            return this.showHelp()
          case 'login':
            return false
          case 'settings':
            return false
        }
      }
    },
    created () {
      this.initializeData()
      setTimeout(() => {
        console.log(this.recentBooks)
        console.log(this.endIndex)
      }, 3000)
    },
    components: {
      bannerLeft,
      findButtonBanner,
      findButton,
      findDot,
      voiceControl,
      userButtons,
      courseButton,
      controlButton,
      contentCenter,
      bannerRight
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

.help-banner {
  display: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent url("./images/help-1.png") no-repeat center;
}

.show-help-banner {
  display: block;
}

.button-banner {
  padding: 0 20px;
}
</style>
