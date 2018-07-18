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
        backgroundUrl: '',
        isFrosted: false
      }
    },
    components: {},
    created () {
      // 获取原生背景图片
      modules.global.httpBackgroundImage().then(data => {
        if (data) {
          let image = new Image()
          image.src = data
          image.onload = () => {
            let checkoutImg = setInterval(() => {
              if (image.complete) { // 加载完成
                this.backgroundUrl = data
                clearInterval(checkoutImg)
              }
            }, Math.random() * 1000)
          }
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
      width: 3890px;
      height: 1130px;
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
