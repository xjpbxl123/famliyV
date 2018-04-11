<template>
  <div class="banner-left">
    <i class="iconfont icon-logo"></i>
    <div class="qr-code">
      <qr-code ref="qrCode"/>
    </div>
    <span>扫描二维码登陆</span>
    <calendar/>
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
      this.$refs.qrCode.generateQrCode({ width: 180 })
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
  height: 82px;
  font-size: 146px;
  color: #fff;
}

.qr-code {
  padding-top: 65px;
}

.banner-left {
  display: flex;
  flex-direction: column;
  z-index: 2;
  width: 470px;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
}

span {
  margin-top: 10px;
  font-size: 26px;
  color: #fff;
}
</style>
