<template>
  <li class="famous-book-item" :class="select==index && 'active'">
    <slot></slot>
  </li>
</template>
<style lang="scss" scoped type=text/scss>
  .famous-book-item {
    position: relative;
    height: 345px;
    width: 460px;
    border-radius: 15px;
    animation: all 8s;
    margin: 0 40px;
    overflow: hidden;
    background: url("./image/artistcourse_cover.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    &.active {
      height: 405px;
      width: 540px;
      margin: 0 0 0 50px;
    }
  }
</style>
<script type="es6">
  export default {
    name: 'famous-book-item',
    props: {
      select: {
        type: Number
      },
      index: {
        type: Number
      },
      item: {
        type: Object
      }
    },
    data () {
      return {}
    }
  }
</script>
