<template>
  <li class="famous-book-item" :class="select==index && 'active'" @click="setFamousBookSelect(index)">
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
    animation: fadeRighr 1s;
    &.active {
      transform: scale(1.16);
      transition: all .5s linear;
    }
  }

  @keyframes fadeRighr {
    from {
      background-position-x: -50px;
    }
    to {
      background-position-x: 0px;
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
      },
      setFamousBookSelect: {
        type: Function
      }
    },
    data () {
      return {}
    }
  }
</script>
