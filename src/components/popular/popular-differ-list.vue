<template>
  <ul>
    <li v-for="(item,index) in differList" :key="index" @click="setSelect(index)" :class="{active:(index === popularIndex)}">
      <img :src="(index === popularIndex)?item.sleCoverSmall:item.coverSmall" alt="">
      <popular-differ-year-eachItem
        :starNum="item.starNum"/>
    </li>
  </ul>
</template>
<script type="text/javascript">
  import popularDifferYearEachItem from './popular-differ-year-eachItem'
  import {} from 'vue-find'

  export default {
    name: 'popular-differ-list',
    props: {
      differList: {
        type: Array,
        default: () => ([])
      },
      popularIndex: {
        type: Number
      },
      setSelect: {
        type: Function
      }
    },
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {
    },
    components: {
      popularDifferYearEachItem
    }
  }
</script>
<style lang="scss" scoped>
  ul {
    position: absolute;
    top: 260px;
    left: 430px;
    li {
      width: 404px;
      height: 574px;
      margin-right: 115px;
      &.active {
        .starBox {
          .star-empty {
            background: url('./images/icon_star_white.png') no-repeat !important;
            background-size: cover;
          }
          .differLever {
            color: #fff;
          }

        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
