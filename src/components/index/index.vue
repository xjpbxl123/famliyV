<template>
  <div class="banner-wrapper">
    <banner-left :buttonActions="buttonActions"/>
    <find-button-banner className="button-banner">
      <user-buttons :action="buttonActions"/>
      <voice-control/>
      <course-button :action="buttonActions"/>
      <control-button :action="buttonActions" />
    </find-button-banner>
    <div class="help-banner" :class="{'show-help-banner':showHelpBanner}"
         :style="{'background-image':`url(${helpImg[helpIndex]})`}"></div>
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
  import bannerLeft from './index-banner-left/index-banner-left'

  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png')]
      }
    },
    find: {
      [KEY27] () {
        this.showHelp()
      },
      [KEY108] () {
        this.goBack()
      }
    },
    methods: {
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
      buttonActions ({ type }) {
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
    created () {},
    components: {
      bannerLeft,
      findButtonBanner,
      findButton,
      findDot,
      voiceControl,
      userButtons,
      courseButton,
      controlButton
    }
  }
</script>
<style lang="scss" scoped>
.banner-wrapper {
  height: 100%;
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
