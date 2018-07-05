<template>
   <div class="content">
       <img :src="imgUrl" alt="">
       <toolbar :hidden="true">
          <icon-item id="222"
                      key="222"
                      icon="0xe63d"
                      pianoKey="82"
                      hidden="true"/>
       </toolbar>
   </div>
</template>
<script type="text/javascript">
  import {
    BACK_PRESSED
  } from 'vue-find'
  export default {
    data () {
      return {
        imgUrl: this.$route.query.url
      }
    },
    find: {
      [BACK_PRESSED] () {
        this.$router.back()
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
