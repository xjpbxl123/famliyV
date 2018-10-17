<template>
  <div class="box">
    <ul class="pages">
      <li v-for="(item, index) in pages" :key="index" :class="{'active': selectedIndex === index}" @click="setCenterSelect(index)">
        <div class="box">
          <div class="img"></div>
          <div class="icon"></div>
          <div class="bottom" v-if="selectedIndex !== index"></div>
          <div class="wave" v-else>
            <span class="wave1"></span>
            <span class="wave2"></span>
          </div>
          <span v-text="item.text" class="moduleName"></span>
        </div>
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
        transition: all 0.4s linear;
        border-radius: 10px;
        .box {
          width: 100%;
          height: 100%;
          position: relative;
          top: 0;
          left: 0;
          overflow: hidden;
        }
        &.active {
          transform: scale(1.15);
          .box {
            overflow: visible;
          }
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
            animation: wave1 5s linear infinite;
          }
          .wave2 {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 258px;
            width: 100%;
            background-position: 0 bottom;
            animation: wave2 2s linear infinite;
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
            background: url('./images/popular_img.png') no-repeat;
            background-size: cover;
            width: 195px;
            height: 525px;
            right: -20px;
            top: 67px;
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
            background: url('./images/material_img.png') no-repeat;
            background-size: cover;
            width: 386px;
            height: 351px;
            left: 91px;
            top: 15px;
            z-index: 100;
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
          .img {
            position: absolute;
            background: url('./images/famous_img.png') no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
            left: -50px;
            top: 0;
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
            background: url('./images/famous_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(4) {
          background: url('./images/kindom_bg.png') no-repeat;
          background-size: cover;
          margin-right: 0;
          .img {
            position: absolute;
            background: url('./images/kindom_img.png') no-repeat;
            background-size: cover;
            width: 534px;
            height: 580px;
            left: -30px;
            top: -20px;
            z-index: 100;
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
