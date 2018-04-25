<template>
  <div>111</div>
</template>

<script>
  import {KEY108} from 'vue-find'

  export default {
    name: 'demo',
    find: {
      [KEY108] (key) {
        console.log(key)
      }
    }
  }
</script>

<style scoped>

</style>
