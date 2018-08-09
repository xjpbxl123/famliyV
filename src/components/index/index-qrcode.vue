<template>
  <div class="qr-wrapper">
    <canvas></canvas>
  </div>
</template>

<script>
  import {getCurEnvs} from '../../scripts/utils'
  import {global} from 'find-sdk'
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
        return getCurEnvs().then(env => {
          let url = 'https://spapi.findpiano.cn'
          if (env.HTTP_ROOT.indexOf('ktunes') !== -1) {
            url = 'https://spapi.ktunes.cn'
          }
          global.getLocalIpAddress().then((value) => {
            let ip = !value ? '' : value
            global.getStatusBarItem().then((data) => {
              let localName = data.localname ? data.localname.title : ''
              // 异步获取qrcode模块，生成二维码
              return import(/* webpackChunkName:"qrCode" */ 'qrcode').then(qrCode => {
                qrCode.toCanvas(
                  document.querySelector('canvas'),
                  url + `/wxLoginPiano?pkgname=gogo.gogomusic&type=share&qrType=find&deviceName=${localName}$&sessionId=${
                    this.sessionId
                  }&ct=LoginFindPiano&ip=${ip}&port=5672`,
                  { width: qrCodeOptions.width }
                )
              })
            })
          })
        })
      }
    }
  }
</script>
