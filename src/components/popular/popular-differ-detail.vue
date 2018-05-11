<template>
   <div class="differDetail">
      <div class="starBox">
        <span class="differLever">LV.{{popularIndex}}</span>
        <div class="star-full" v-for="(num) in parseInt(popularIndex+1)" :key="num"></div>
        <div class="star-empty" v-for="(num) in parseInt(4-popularIndex)" :key="num+7"></div>
      </div>
      <div class="text">本次难度包括：</div>
      <div class="text">节奏型：{{differList[popularIndex]&&differList[popularIndex].differC}}</div>
      <div class="text">技巧：{{differList[popularIndex]&&differList[popularIndex].skills}}</div>
  </div>
</template>
<script type="text/javascript">
  import {
  } from 'vue-find'
  export default {
    name: 'popular-differ-detail',
    props: {
      differList: {
        type: Array,
        default: () => ([])
      },
      popularIndex: {
        type: Number
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
   .differDetail {
     position: absolute;
      width: 600px;
      height: 574px;
      right: 160px;
      top: 260px;
      padding-left: 70px;
      border-right-width: 0;
      border-top-width:0;
      border-bottom-width: 0;
      border-left-width: 2px;
      border-left-style: solid;
      color: #fff;
      border-image: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    ) 30 30;
    .starBox {
      padding-bottom: 45px;
      margin-top: 52px;
      div {
        width:31px;
        height: 31px;
        margin-right:20px;
        display: inline-block;
      }
      .differLever {
        font-size: 36px;
        margin-right: 12px;
        transform: translateY(-4px);
      }
      .star-full {
        background: url('./images/icon_star_white.png') no-repeat;
        background-size: cover;
      }
      .star-empty {
          background: url('./images/icon_star_blue.png') no-repeat;
          background-size: cover;
      }
    }
    .text {
      width: 100%;
      font-size: 30px;
      margin-bottom: 45px;
      line-height: 34px;
     }
   }
</style>
