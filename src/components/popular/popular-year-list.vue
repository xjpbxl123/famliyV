<template>
    <ul>
        <li v-for="(item,index) of yearList" :key="item.name" :class="{active:yearIndex===index}" @click="setSelect(index)" >
          <img :src="item.coverSmall" alt="">
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
      width: 340px;
      height: 485px;
      position: relative;
      margin-right: 115px;
      border-radius: 16px;
      background:rgba(0,0,0,1);
      opacity:0.6;
      border: 7px solid rgba(255,255,255,0.28);
      transition: all 0.4s linear;
      &::before {
        content: '';
        position: absolute;
        bottom: -86px;
        left: 50%;
        transform: translateX(-50%);
        width:354px;
        height:68px;
        background:linear-gradient(180deg,rgba(255,255,255,0.3) 10%,rgba(255,255,255,0));
        opacity:0.6;
        border-radius:10px;
      }
      &.active {
        transform: scale(1.2);
        background:transparent;
        opacity:1;
        border:7px solid #00FF90;
        box-shadow: 0px 0px 200px 0px #00FF90;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
