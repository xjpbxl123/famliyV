<template>
  <div>
    <text class="message">Now, let's use Vue.js to build your Weex app.</text>
    <text>{{receiveMessage}}</text>
    <image :src="logo" class="logo"></image>
    <button @click="sendMessage">sendMessage</button>
  </div>
</template>
<script>
  import mixins from './mixins'
  const find = weex.requireModule('find')
  export default {
    data () {
      return {
        receiveMessage: '',
        logo: require('../../images/default.png')
      }
    },
    mixins: [mixins],
    methods: {
      sendMessage () {
        find.sendMsgToWeb({demo: 'demo'})
      },
      onReceiveMessageFromWeb (data) {
        find.debug(`receiveMessageFromWeb:${JSON.stringify(data)}`)
        this.receiveMessage = JSON.stringify(data)
      }
    }
  }
</script>
<style lang="scss">
  .logo {
    width: 424px;
    height: 200px;
  }
</style>
