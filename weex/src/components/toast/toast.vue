<template>
    <div class="prompt">
        <image :src="toastImg" style="height: 120px;width: 120px;position: absolute;top: 70px;left: 260px;" >
        </image>
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
        syncInfo: require('./images/icon-sync-info.jpg')
      }
    },
    methods: {
      toastMess ({imgName, text}) {
        this.text = text || '错误'
        if (imgName) this.toastImg = this[imgName]
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
</style>
