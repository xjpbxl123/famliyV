<template>
  <div>
    <text class="message">Now, let's use Vue.js to build your Weex app.</text>
    <image :src="logo" class="logo" />
  </div>
</template>
<script>
  export default {
    data () {
      return {logo: require('../images/default.png')}
    }
  }
</script>
<style lang="scss" scoped>
  .logo {
    width: 424px;
    height: 200px;
  }
</style>
