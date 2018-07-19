<template>
  <div id="app">
    <div class="backImg" :style="{background:'url('+backgroundUrl+') 0 0 /cover no-repeat'}" :class="{'frosted': isFrosted}">
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
    components: {},
    created () {
      // 获取原生背景图片
      modules.global.httpBackgroundImage().then(data => {
        if (data) {
          this.backgroundUrl = data
        } else {
          this.backgroundUrl = require('./images/background0.jpg')
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
      width: 3840px;
      height: 1080px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      background-attachment: fixed;
      overflow: hidden;
      &::-webkit-scrollbar {display:none;}
      &.frosted::before {
        content: "";
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(20px);
        z-index: -1;
        backface-visibility: hidden;
        perspective: 1000;
        transform: translate3d(0,0,0);
        transform: translateZ(0);
      }
    }
  }

</style>
