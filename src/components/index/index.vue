<template>
  <div class="banner-wrapper">
    <banner-left :buttonActions="buttonActions"/>
    <find-button-banner className="button-banner">
      <find-button v-for="button in userActionButtons"
                   :className="button.className"
                   :iconClass="button.icon"
                   :meta="button.meta"
                   :text="button.text"
                   :key="button.text"
                   :action="buttonActions"
      />
    </find-button-banner>
    <div class="help-banner" :class="{'show-help-banner':showHelpBanner}"
         :style="{'background-image':`url(${helpImg[helpIndex]})`}"></div>
  </div>
</template>
<script type="text/javascript">
  import findButton from '../common/find-button/find-button'
  import findButtonBanner from '../common/find-button-banner/find-button-banner'
  import { KEY27, KEY108 } from 'vue-find'
  import bannerLeft from './index-banner-left/index-banner-left'

  export default {
    data () {
      return {
        helpIndex: 0, /// 当前是第几个帮助图片
        showHelpBanner: false,
        helpImg: [require('./images/help-1.png'), require('./images/help-2.png')],
        userActionButtons: [
          {
            text: '帮助',
            icon: 'icon-help',
            className: 'help',
            meta: { type: 'help' }
          },
          {
            text: '登录',
            icon: 'icon-username',
            className: 'user',
            meta: { type: 'user' }
          },
          {
            text: '设置',
            icon: 'icon-settings',
            className: 'settings',
            meta: { type: 'settings' }
          }
        ],
        courseButtons: [
          {
            text: '我的曲谱',
            icon: 'score',
            className: 'index-custom-button custom-score',
            meta: { type: 'score' }
          },
          {
            text: '弹奏录制',
            icon: 'recording',
            className: 'index-custom-button custom-recording',
            meta: { type: 'recording' }
          },
          {
            text: '教材系列',
            icon: 'material',
            className: 'index-custom-button custom-material',
            meta: { type: 'material' }
          },
          {
            text: '流行经典',
            icon: 'popular',
            className: 'index-custom-button custom-popular',
            meta: { type: 'popular' }
          },
          {
            text: '名师课程',
            icon: 'master',
            className: 'index-custom-button custom-master',
            meta: { type: 'master' }
          },
          {
            text: '游戏应用',
            icon: 'game',
            className: 'index-custom-button custom-game',
            meta: { type: 'game' }
          }
        ]
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
    components: { bannerLeft, findButtonBanner, findButton }
  }
</script>
<style lang="scss">
/// 这里的css 是全局的，加上 [moduleName] 来区分,如：当前模块是index,则可以使用 index-xxx-xxx的方式
.index-custom-button {
  i {
    width: 80px;
    height: 72px;
  }
  .text {
    width: auto !important;
  }
  .score {
    background: transparent url("./images/my-score.png") center /cover no-repeat;
  }

  .recording {
    background: transparent url("./images/recording.png") center /cover no-repeat;
  }

  .popular {
    background: transparent url("./images/popular.png") center /cover no-repeat;
  }

  .material {
    background: transparent url("./images/material.png") center /cover no-repeat;
  }

  .master {
    background: transparent url("./images/master.png") center /cover no-repeat;
  }

  .game {
    background: transparent url("./images/game.png") center /cover no-repeat;
  }
}
</style>
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

.user {
  margin-left: 107px;
}

.settings {
  margin-left: 50px;
}

.index-custom-button {
  position: absolute;
  bottom: 5px;
  &.custom-score {
    left: 545px;
  }
  &.custom-recording {
    left: 647px;
  }
  &.custom-popular {
    left: 798px;
  }
  &.custom-material {
    left: 895px;
  }
  &.custom-master {
    left: 995px;
  }
  &.custom-game {
    left: 1147px;
  }
}
</style>
