<template>
  <div class='famous-wrap'>
    <ul class="famous-swiper" :style="{ transform: `translateX(${left}px)` }">
      <famous-item v-for="(item,index) in famousList" :key="index" :select="select" :index="index" :famous="item"/>
    </ul>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .famous-wrap {
    height: 100%;
    overflow: hidden;
    .famous-swiper {
      height: 100%;
      white-space: nowrap;
      transition: all .4s;
    }
  }
</style>
<script type="es6">
  import famousItem from './famous-item'

  export default {
    name: 'famous-swiper',
    props: {
      famousList: Array,
      select: Number,
      defaultLeft: {
        type: Number,
        default: () => {
          return 1293
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {
      left: function () {
        let width = 0
        for (let i = 0; i < this.select; i++) {
          let itemWidth = 560 - 57 * i
          itemWidth = itemWidth > 47 ? itemWidth : 47
          width = width + itemWidth
        }
        return this.defaultLeft - width
      }
    },
    watch: {
    },
    components: {
      famousItem
    }
  }
</script>
