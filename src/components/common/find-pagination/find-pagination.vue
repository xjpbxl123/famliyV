<template>
  <ul v-if="pagination" class="find-pagination">
    <li v-for="(item,index) in sumPage" :key="index+'index'" :class="{active:activePage===index+1}"></li>
  </ul>
</template>
<style lang="scss" scoped type=text/scss>
  .find-pagination {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 80px;
    li {
      height: 10px;
      width: 10px;
      border: 1px solid #fff;
      margin-bottom: 10px;
      display: block;
      border-radius: 50%;
      &.active {
        background: #fff;
      }
    }
  }
</style>
<script type="es6">
  export default {
    name: 'find-pagination',
    props: {
      sumPage: {
        type: Number,
        default: () => {
          return 1
        }
      },
      pagination: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      activePage: {
        type: Number,
        default: () => {
          return 1
        }
      }
    },
    data () {
      return {}
    }
  }
</script>
