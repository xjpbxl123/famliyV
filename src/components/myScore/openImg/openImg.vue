<template>
   <div class="content">
       <img :src="imgUrl" alt="">
       <toolbar></toolbar>
   </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        imgUrl: require(this.$route.query.url)
      }
    },
    methods: {},
    created () {},
    components: {}
  }
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
