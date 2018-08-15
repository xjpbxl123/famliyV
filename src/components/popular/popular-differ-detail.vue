<template>
   <div class="differDetail" v-if="differList.length !== 0">
      <div class="starBox">
        <span class="differLever">LV.{{popularIndex+1}}</span>
        <div class="star-full" v-for="(num) in parseInt(popularIndex+1)" :key="num"></div>
        <div class="star-empty" v-for="(num) in parseInt(4-popularIndex)" :key="num+7"></div>
      </div>
      <div class="text text1">{{differList[popularIndex]&&differList[popularIndex].desc}}</div>
      <div class="text">本次难度包括：</div>
      <div class="text">节奏型：</div>
      <div class="text">{{differList[popularIndex]&&differList[popularIndex].tap}}</div>
      <div class="text">技巧：</div>
      <div class="text">{{differList[popularIndex]&&differList[popularIndex].skills}}</div>
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
      right: 0;
      width:690px;
      height:1080px;
      background:rgba(0,0,0,0.1);
      top:0px;
      padding-left: 56px;
      border-right-width: 0;
      border-top-width:0;
      border-bottom-width: 0;
      border-left-width: 2px;
      border-left-style: solid;
      color: #fff;
      border-image: -webkit-linear-gradient(
      top,
      rgba(0,255,144,0) 20%,
     rgba(0,255,144,1) 60%,
      rgba(0,255,144, 0) 80%
    ) 30 30;
    .starBox {
      padding-bottom: 45px;
      margin-top: 165px;
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
      width: 520px;
      font-size: 30px;
      margin-bottom: 45px;
      line-height: 34px;
      &.text1 {
        color: #FFB400;
      }
     }
   }
</style>
