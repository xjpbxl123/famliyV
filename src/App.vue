<template>
  <div id="app">
    <div class="backImg" :style="{background:'url('+backgroundUrl+') 0 0 /cover no-repeat'}" >
    </div>
    <router-view></router-view>
    <!-- <transition name="fade"> -->

    <!-- </transition> -->
  </div>
</template>
<script type="text/javascript">
  import { modules } from 'find-sdk'
  import eventsHub from './scripts/eventsHub'
  import toast from './components/common/toast/toast.js'
  export default {
    name: 'app',
    data () {
      return {
        backgroundUrl: '',
        loadingInstance: null
      }
    },
    created () {
      // 获取原生背景图片
      modules.global.httpBackgroundImage().then(data => {
        if (data) {
          this.backgroundUrl = data
        } else {
          this.backgroundUrl = require('./images/DefaultWallpaper.png')
        }
      })

      // 监听背景设置
      modules.notification.regist('SetBackgroundImage', data => {
        if (data.backGroundImageName) {
          this.backgroundUrl = data.backGroundImageName
        } else {
          this.backgroundUrl = require('./images/DefaultWallpaper.png')
        }
      })

      // 提示框
      eventsHub.$on('toast', (params) => {
        let defaultParams = {text: '正在加载', icon: 'icon-loading', iconLoading: true, allExit: true}
        params = Object.assign({}, defaultParams, params)
        if (this.loadingInstance) eventsHub.$emit('closeToast')
        this.loadingInstance = toast(params)
      })
      eventsHub.$on('closeToast', () => {
        if (this.loadingInstance) {
          this.loadingInstance.close()
        }
      })
    }
  }
</script>
<style lang="scss">
  #app {
    .backImg {
      width: 3840px;
      height: 1080px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      background-attachment: fixed;
      overflow: hidden;
    }
  }

</style>
