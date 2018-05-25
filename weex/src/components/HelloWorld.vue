<template>
  <div>
    <text class="message">Now, let's use Vue.js to build your Weex app.</text>
    <image :src="logo" class="logo"></image>
  </div>
</template>
<script>
  export default {
    data () {
      return {logo: require('../images/default.jpg')}
    }
  }
</script>
<style lang="scss" scoped>
  .logo {
    width: 424px;
    height: 200px;
  }
</style>
