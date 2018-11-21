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
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        backgroundUrl: '',
        loadingInstance: null
      }
    },
    computed: {
      ...mapState({
        isLogin (state) {
          return state.storage.isLogin
        }
      })
    },
    created () {
      console.log(this.state)
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
      // 重启app清空数组
      this.$store.dispatch('myScore/setCopyArr', [])
      // 监听U盘
      modules.notification.regist('UpanChange', data => {
        this.$store.dispatch('myScore/setCopyArr', [])
        this.$store.dispatch('index/setUpanInsert', data.isInsert)
        if (data.isInsert) {
          if (window.location.href.indexOf('myScore') !== -1) {
            // 当前在我的曲谱页面
            modules.nativeRouter.alert('加载完毕', 2, 3)
          } else {
            modules.nativeRouter.alert('加载完毕,请在我的资源中打开', 2, 3)
          }
        } else {
          this.$store.dispatch('myScore/setUpanIndex', 0)
          this.$store.dispatch('myScore/setUpanPath', '/Volumes')
          this.$store.dispatch('myScore/setCopyArr', [])
          modules.nativeRouter.alert('移除成功', 2, 3)
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
