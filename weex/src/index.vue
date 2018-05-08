<template>
  <div class="wrapper">
    <image :src="logo" class="logo"/>
    <text class="greeting" @click="goTo">The environment is ready!</text>
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import {getBundleRoot} from './scripts/utils'

  let navigator = weex.requireModule('navigator')
  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data () {
      return {
        logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
      }
    },
    methods: {
      goTo () {
        console.log(`${getBundleRoot()}/components/HelloWorld.js`)
        navigator.push({url: `${getBundleRoot()}/components/HelloWorld.js`})
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 424px;
    height: 200px;
  }

  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }

  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>
