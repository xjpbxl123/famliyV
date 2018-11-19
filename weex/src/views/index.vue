<template>
  <div class="wrapper">
    <image :src="logo" class="logo"/>
    <text class="logo-text">{{logo}}</text>
    <text class="greeting" @click="goTo">The environment is ready!</text>
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import {getBundleRoot, getLocalUrl} from './scripts/utils'

  let navigator = weex.requireModule('navigator')
  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    data () {
      return {
        logo: require('./images/default.png'),
        text: JSON.stringify(weex.config)
      }
    },
    methods: {
      goTo () {
        navigator.push({url: `${getBundleRoot()}/components/HelloWorld.js`})
      }
    },
    created () {
      getLocalUrl()
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
