<template>
  <div>
    <span @click="click">Home</span>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return { list: [] }
    },
    methods: {
      click () {
        this.list.extend()
      }
    },
    components: {},
    created () {}
  }
</script>

<style lang="scss" scoped>
body {
  background: #ddd;
}
</style>
