<template>
  <div class="banner-left">
    <i class="iconfont icon-logo"></i>
    <qr-code ref="qrCode"/>
    <span>扫描二维码登陆</span>
    <calendar></calendar>
  </div>
</template>

<script>
  import qrCode from './index-qrcode'
  import calendar from './index-calendar'
  export default {
    name: 'index-banner-left',
    data () {
      return {}
    },
    methods: {},
    mounted () {
      /// 生成二维码
      this.$refs.qrCode.generateQrCode({ width: 80 })
    },
    created () {},
    components: {
      qrCode,
      calendar
    }
  }
</script>

<style lang="scss" scoped>
.icon-logo {
  font-size: 73px;
  color: #fff;
}

.banner-left {
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-top: 11.5px;
  width: 235px;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
}
span {
  margin-top: 5px;
  font-size: 13px;
  color: #fff;
}
</style>
