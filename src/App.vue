<template>
  <div id="app">
    <div class="backImg" :style="{background:'url('+backgroundUrl+') 0 0 /cover no-repeat'}" :class="{'frosted': isFrosted}"></div>
    <!-- <transition name="fade"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>
<script type="text/javascript">
  import { modules } from 'find-sdk'
  export default {
    name: 'app',
    data () {
      return {
        backgroundUrl: './images/bg_background3.png',
        isFrosted: false
      }
    },
    components: {},
    created () {
      // 获取原生背景图片
      modules.global.httpBackgroundImage().then(data => {
        if (data) {
          this.backgroundUrl = data
        } else {
          this.backgroundUrl = require('./images/bg_background3.png')
        }
      })

      // 监听背景设置
      modules.notification.regist('SetBackgroundImage', data => {
        if (data.backGroundImageName) {
          this.backgroundUrl = data.backGroundImageName
        }
      })
      // 毛玻璃效果初始值设置
      modules.settings.getProperty('isFrostedGlassOn').then((data) => {
        this.isFrosted = data
      })
      // 监听毛玻璃效果
      modules.notification.regist('BackgroundFrostedGlass', data => {
        this.isFrosted = data.isFrosted
      })
    }
  }
</script>
<style lang="scss">
  #app {
    background-color: #fff;
    .backImg {
      width: 3900px;
      height: 1140px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: -1;
      background-attachment: fixed;
      overflow: hidden;
      &::-webkit-scrollbar {display:none;}
      &.frosted {
        filter: blur(20px);
      }
    }

  }

</style>
