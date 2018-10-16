<template>
    <div class="prompt">
        <image :src="toastImg" v-if="!speedValue" style="height: 120px;width: 120px;position: absolute;top: 70px;left: 260px;" >
        </image>
        <div class="speedBar" v-else>
          <div class="valueBar" :style="{width: (speedValue/180)*380+'px'}">
            <div class="ball" :style="{left: ((speedValue/180)*380 - 24)+'px'}"></div>
          </div>
        </div>
         <text class="value"  v-if="speedValue">{{speedValue}}</text>
        <text class="text">{{text}}</text>
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
        speedValue: 0
      }
    },
    methods: {
      toastMess ({imgName, text, speedValue}) {
        this.text = text
        if (imgName) this.toastImg = this[imgName]
        this.speedValue = speedValue
      }
    },
    computed () {
    },
    created () {
      this.toastImg = this.syncInfo
    },
    components: {
    }
  }
</script>

<style lang='css' type="text/css">
    .prompt {
        width: 640px;
        height: 360px;
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
</style>
