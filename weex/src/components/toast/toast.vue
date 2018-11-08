<template>
    <div class="prompt">
      <div class="box">
        <image :src="toastImg" v-if="!speedValue" style="height: 120px;width: 120px;position: absolute;top: 70px;left: 260px;" >
        </image>
         <text class="value"  v-if="speedValue && maxValue" >{{speedValue}}</text>
         <text class="value noBar" v-if="speedValue && !maxValue">{{speedValue+' X'}}</text>
          <div class="speedBar" v-if="maxValue">
            <div class="valueBar" :style="{width: (speedValue/maxValue)*380+'px'}">
              <div class="ball" :style="{left: ((speedValue/maxValue)*380 - 24)+'px'}"></div>
            </div>
        </div>
        <text class="text">{{text}}</text>
      </div>
    </div>
</template>

<script>
  import mixins from '../mixin.js'
  export default {
    name: 'toast',
    mixins: [mixins],
    data () {
      return {
        text: '错误',
        syncInfo: require('./images/icon-sync-info.jpg'),
        speedValue: 0,
        maxValue: 180
      }
    },
    computed () {
    },
    created () {
      this.toastImg = this.syncInfo
      if (weex.config.imgName) this.toastImg = this[weex.config.imgName]
      this.text = weex.config.text
      this.speedValue = weex.config.speedValue
      this.maxValue = weex.config.maxValue
    },
    components: {
    }
  }
</script>

<style lang='css' type="text/css">
    .prompt {
      width: 3840px;
      height: 1080px;
    }
    .box {
      width: 640px;
      height: 360px;
      top: 320;
      left: 2043;
      border-radius: 16;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .text {
      font-size: 36px;
      width: 640px;
      text-align: center;
      position: absolute;
      bottom: 100px;
      left: 0;
      color: #FFFFFF;
    }
    .speedBar {
      width: 380px;
      height: 20px;
      background-color: rgba(255,255,255,0.5);
      top: 100px;
      left: 130px;
      border-radius: 20px;
    }

    .valueBar {
      background-color: rgba(255,255,255,1);
      top: 0;
      left: 0;
      width: 30px;
      height: 20px;
      border-radius: 20px;
    }

    .ball {
      width: 48px;
      height: 48px;
      background-color: rgba(255,255,255,1);
      left: 0;
      top: -14px;
      border-radius: 50%;
    }

    .value {
      font-size: 40px;
      width: 640px;
      text-align: center;
      position: absolute;
      top: 150px;
      left: 0;
      color: #FFFFFF;
      font-weight: 600;
    }

    .noBar {
      top: 110px;
    }
</style>
