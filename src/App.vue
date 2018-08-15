<template>
  <div id="app">
    <div class="backImg" :style="{background:'url('+backgroundUrl+') 0 0 /cover no-repeat'}" >
      <router-view></router-view>
    </div>
    <!-- <transition name="fade"> -->

    <!-- </transition> -->
  </div>
</template>
<script type="text/javascript">
  import { modules } from 'find-sdk'
  export default {
    name: 'app',
    data () {
      return {
        backgroundUrl: '',
        isFrosted: false
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
    }
  }
</script>
<style lang="scss">
  #app {
    background-color: #fff;
    .backImg {
      width: 3840px;
      height: 1080px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      background-attachment: fixed;
      overflow: hidden;
      &::-webkit-scrollbar {display:none;}
    }
  }

</style>
