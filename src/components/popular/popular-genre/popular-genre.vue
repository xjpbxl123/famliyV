<template>
  <div class="popular-genre">
    <find-ablum-card-popular v-for="(item,index) in popularGenre" class="find-popular-card" :key="index"
                     :index="index" :ablum="item" :class="{maxMargin:(index+1)%2===0}"
                     :select="select" :setSelect="setSelect" :type="2"></find-ablum-card-popular>
  </div>
</template>
<style lang=scss type=text/scss scoped>
  .popular-genre {
    width: 100%;
    height: 100%;
    padding-left: 360px;
    padding-top: 237px;
    .find-popular-card {
      margin-right: 160px;
      float: left;
      margin-bottom: 78px;
      &.maxMargin {
        margin-right: 160px;
      }
    }
  }

</style>

<script>
  import findAblumCardPopular from 'components/common/find-ablum-card-popular/find-ablum-card-popular'

  export default {
    name: 'popular',
    props: {
      popularGenre: Array,
      select: Number,
      setSelect: Function
    },
    data () {
      return {}
    },
    beforeCreate () {
    },
    components: {
      findAblumCardPopular
    }
  }
</script>
