<template>
  <div class="popular-genre">
    <find-ablum-card v-for="(item,index) in popularGenre" class="find-popular-card" :key="index"
                     :index="index" :ablum="item" :class="{maxMargin:(index+1)%2===0}"
                     :select="select" :setSelect="setSelect" :type="2"></find-ablum-card>
  </div>
</template>
<style lang=scss type=text/scss scoped>
  .popular-genre {
    overflow: hidden;
    .find-popular-card {
      margin-right: 30px;
      float: left;
      margin-bottom: 30px;
      &.maxMargin {
        margin-right: 90px;
      }
    }
  }

</style>

<script>
  import findAblumCard from 'components/common/find-ablum-card/find-ablum-card'

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
      findAblumCard
    }
  }
</script>
