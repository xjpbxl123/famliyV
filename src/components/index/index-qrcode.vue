<template>
  <div class="qr-wrapper">
    <canvas></canvas>
  </div>
</template>

<script>
  export default {
    name: 'index-qr-code',
    props: {
      sessionId: String
    },
    methods: {
      /**
       * @desc 生成二维码
       * @param {Object} qrCodeOptions -  qrCode库的参数，详见 https://github.com/soldair/node-qrcode
       * */
      generateQrCode (qrCodeOptions) {
        /// 异步获取qrcode模块，生成二维码
        return import(/* webpackChunkName:"qr-code" */ 'qrcode').then(qrCode => {
          qrCode.toCanvas(
            document.querySelector('canvas'),
            `http://spapi.findpiano.cn/wxLoginPiano?pkgname=gogo.gogomusic&type=share&qrType=find&deviceName=''&sessionId=${
              this.sessionId
            }&ct=LoginFindPiano&ip=''port=''`,
            { width: qrCodeOptions.width }
          )
        })
      }
    }
  }
</script>
