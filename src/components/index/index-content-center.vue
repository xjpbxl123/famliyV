<template>
  <div class="box">
    <contentBook></contentBook>
  </div>
</template>

<script>
  import contentBook from './index-content-book'
  export default {
    props: {
      recentBooks: {
        type: Object
      }
    },
    component: {
      contentBook
    },
    data () {
      return {}
    },
    created () {
      setTimeout(() => {
        console.dir(this.recentBooks)
      }, 3000)
    }
  }
</script>

<style lang="scss" scoped>
</style>
