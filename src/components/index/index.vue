<template>
  <div class="banner-wrapper">
   <banner-left></banner-left>
  </div>
</template>
<style lang="scss" scoped>
.banner-wrapper {
  height: 100%;
}
</style>
<script type="text/javascript">
  import bannerLeft from './index-banner-left/index-banner-left'
  export default {
    data () {
      return {}
    },
    methods: {},
    created () {
      // this.$store.dispatch('getRecentBooks')
      // this.$store.dispatch('getHotBooks')
    },
    components: { bannerLeft }
  }
</script>
