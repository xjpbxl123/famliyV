<template>
  <div class="box">
    <ul class="pages">
      <li v-for="(item, index) in pages" :key="index" :class="{'active': selectedIndex === index}" @click="setCenterSelect(index)">
        <div class="img"></div>
        <!--<span class="tips" v-if="index === 2">限时体验</span>-->
        <div class="icon"></div>
        <div class="bottom" v-if="selectedIndex !== index"></div>
        <div class="wave" v-else>
          <span class="wave1"></span>
          <span class="wave2"></span>
        </div>
        <span v-text="item.text" class="moduleName"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      selectedIndex: {
        default: 0,
        type: Number
      },
      setCenterSelect: {
        type: Function
      }
    },
    components: {
    },
    data () {
      return {
        pages: [{
          text: '流行经典'
        }, {
          text: '教材练习'
        }, {
          text: '名师课程'
        }, {
          text: '音乐王国'
        }]
      }
    },
    watch: {
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .box {
    display: flex;
    .pages {
      margin-left: 309px;
      margin-top: 149px;
      li {
        width: 450px;
        height: 660px;
        float: left;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        &.active {
          transform: scale(1.15);
          overflow: visible;
          .bottom {
            width: 100% !important;
            opacity: 0.8;
          }
          .icon {
            right: 0 !important;
          }
        }
        &::before {
          content: '';
          position: absolute;
          bottom: -118px;
          left: 0;
          width: 450px;
          height: 102px;
        }
        .icon {
          position: absolute;
          width: 266px;
          height: 200px;
          bottom: 0px;
          right: 0;
          z-index: 1000;
          border-radius: 0 0 10px 0;
          overflow: hidden
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width:100%;
          height: 200px;
          opacity: 0.9;
          border-radius: 0 0 10px 10px;
        }
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 268px;
          border-radius: 0 0 10px 10px;
          z-index: 120;
          overflow: hidden;
          .wave1 {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 268px;
            width: 100%;
            animation: wave1 4s linear infinite;
          }
          .wave2 {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 258px;
            width: 100%;
            background-position: 0 bottom;
            animation: wave2 3s linear infinite;
          }
        }
        .moduleName {
          position: absolute;
          bottom: 29px;
          width: 100%;
          font-size: 48px;
          text-indent: 52px;
          font-weight: 400;
          z-index: 200;
          color:rgba(255,254,254,1);
      }
        &:nth-child(1) {
          margin-right: 140px;
          background: url('./images/popular_bg.png') no-repeat;
          background-size: cover;
          .img {
            position: absolute;
            background: url('./images/pig01.png') no-repeat;
            background-size: cover;
            width: 450px;
            height: 564px;
            left: 0;
            bottom: 0;
          }
          &.active {
            .img {
              background: url('./images/pig02.png') no-repeat;
              background-size: cover;
              width: 580px;
              height: 652px;
              left: -90px;
              bottom: 0;
            }
          }
          .wave {
            .wave1 {
              background: url('./images/green1.png');
              background-size: 100% 100%;
            }
            .wave2 {
              background: url('./images/green2.png');
              background-size: 100% 100%;
            }
          }
          .icon {
            width: 242px;
            background: url('./images/popular_icon.png') no-repeat;
            background-size: cover;
          }
          .bottom {
            background:linear-gradient(0deg,rgba(0,171,126,1) 0%,rgba(120,240,126,1) 100%);
          }
          &::before {
            background: url('./images/popular_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(2) {
          background: url('./images/material_bg.png') no-repeat;
          background-size: cover;
          margin-right: 207px;
          .img {
            position: absolute;
            background: url('./images/duck01.png') no-repeat;
            background-size: cover;
            width: 477px;
            height: 660px;
            left: 0;
            top: 0;
            z-index: 100;
          }
          &.active {
            .img {
              background: url('./images/duck02.png') no-repeat;
              background-size: cover;
              width: 584px;
              height: 660px;
              left: -90px;
              bottom: 0;
            }
          }
          .wave {
            .wave1 {
              background: url('./images/blue1.png');
              background-size: 100% 100%;
            }
            .wave2 {
              background: url('./images/blue2.png');
              background-size: 100% 100%;
            }
          }
          .icon {
            width: 318px;
            background: url('./images/material_icon.png') no-repeat;
            background-size: cover;
          }
          .bottom {
            background:linear-gradient(0deg,rgba(51,130,219,1) 2%,rgba(32,230,218,1) 100%);
          }
          &::before {
            background: url('./images/material_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(3) {
          background: url('./images/famous_bg.png') no-repeat;
          background-size: cover;
          margin-right: 140px;
          .icon {
            width: 218px;
            background: url('./images/famous_icon.png') no-repeat;
            background-size: cover;
          }
          .tips {
            width: 178px;
            height: 66px;
            position: absolute;
            top: 28px;
            right: -13px;
            font-size: 30px;
            line-height: 66px;
            font-weight: 400;
            color:rgba(255,254,254,1);
            background: url('./images/tips_s.png') no-repeat;
            background-size: cover;
            text-indent: 40px;
          }
          .img {
            position: absolute;
            background: url('./images/deer01.png') no-repeat;
            background-size: cover;
            width: 415px;
            height: 573px;
            left: -32px;
            bottom: 0;
            z-index: 100;
          }
          &.active {
            .img {
              background: url('./images/deer02.png') no-repeat;
              background-size: cover;
              width: 471px;
              height: 677px;
              left: -52px;
              bottom: 0;
            }
          }
          .wave {
            .wave1 {
              background: url('./images/purple1.png');
              background-size: 100% 100%;
            }
            .wave2 {
              background: url('./images/purple2.png');
              background-size: 100% 100%;
            }
          }
          .bottom {
            background:linear-gradient(0deg,rgba(105,105,255,1) 0%,rgba(190,168,255,1) 100%);
            width:450px;
          }
          &::before {
            background: url('./images/deer_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(4) {
          background: url('./images/kindom_bg.png') no-repeat;
          background-size: cover;
          margin-right: 0;
          .img {
            position: absolute;
            background: url('./images/mouse01.png') no-repeat;
            background-size: cover;
            width: 362px;
            height: 463px;
            right: 0;
            bottom: 0;
            z-index: 100;
          }
          &.active {
            .img {
              background: url('./images/mouse02.png') no-repeat;
              background-size: cover;
              width: 433px;
              height: 634px;
              left: 63px;
              bottom: 0;
            }
          }
          .wave {
            .wave1 {
              background: url('./images/yellow1.png');
              background-size: 100% 100%;
            }
            .wave2 {
              background: url('./images/yellow2.png');
              background-size: 100% 100%;
            }
          }
          .icon {
            width: 257px;
            background: url('./images/kindom_icon.png') no-repeat;
            background-size: cover;
          }
          .bottom {
            background:linear-gradient(0deg,rgba(252,174,35,1) 0%,rgba(255,198,0,1) 100%);
          }
          &::before {
            background: url('./images/kindom_bottom.png') no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
  @keyframes wave1{
    0% {background-position: 0 0;}
    100% {background-position: 450px 0;}
  }
  @keyframes wave2{
    0% {background-position: 0 0;}
    100% {background-position: 450px 0;}
  }
</style>
