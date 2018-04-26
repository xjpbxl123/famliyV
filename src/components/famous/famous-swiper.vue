<template>
  <div class='famous-wrap'>
    <ul class="famous-swiper" :style="{ transform: `translateX(${left}px)` }">
      <famous-item v-for="(data,index) in famousList" :key="index" :select="select" :index="index"></famous-item>
    </ul>
  </div>
</template>
<style lang="scss" scope type=text/scss>
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
        left: this.defaultLeft
      }
    },
    watch: {
      select (val, oldValue) {
        if (val > oldValue) {
          this.left = this.left - (560 - (val - 1) * 57)
        } else {
          this.left = this.left + (560 - (val) * 57)
        }
      }
    },
    components: {
      famousItem
    }
  }
</script>
