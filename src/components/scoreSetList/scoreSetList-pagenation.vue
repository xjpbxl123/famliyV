<template>
 <ul class="pagenation">
    <li v-for="(item,index) in totalPage" :key="index" :class="{ active:index == scoreListPageIndex}"></li>
 </ul>
</template>
<script type="text/javascript">
  export default {
    name: 'scoreSetList-pagenation',
    props: {
      scoreListPageIndex: {
        type: Number,
        default: () => {
          return 0
        }
      },
      totalPage: {
        type: Number,
        default: () => {
          return 1
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    }
  }
</script>
<style lang="scss" scoped>
  ul.pagenation {
    width: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    li {
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      border: 1px solid #fff;
      border-radius: 50%;
      &.active {
          background-color: #fff;
      }
    }
  }
</style>
