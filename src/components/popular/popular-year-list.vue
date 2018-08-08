<template>
    <ul>
        <li v-for="(item,index) of yearList" :key="item.name" :class="{active:yearIndex===index}" @click="setSelect(index)" >
          <img :src="yearIndex===index?item.sleCoverSmall:item.coverSmall" alt="">
          <p>{{item.name}}</p>
        </li>
    </ul>
</template>
<script type="text/javascript">
//   import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'popular-year-list',
    props: {
      yearList: {
        type: Array,
        default: () => []
      },
      yearIndex: {
        type: Number,
        default: () => 0
      },
      setSelect: {
        type: Function
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  ul {
    color:#fff;
    position: absolute;
    top: 260px;
    left: 948px;
    li {
      width: 404px;
      height: 574px;
      background-color: green;
      position: relative;
      margin-right: 115px;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        font-size: 40px;
        bottom: 20px;
        color: #fff;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
