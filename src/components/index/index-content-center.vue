<template>
  <div class="box">
    <ul class="pages">
      <li v-for="(item, index) in pages" :key="index" :class="{'active': selectedIndex === index}" @click="setCenterSelect(index)">
        <div class="img"></div>
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
          text: '名师课程'
        }, {
          text: '流行经典'
        }, {
          text: '音乐王国'
        }, {
          text: '教材练习'
        }],
        opa1: 'rgba(105,105,255,0.7)',
        opa2: 'rgba(105, 105, 255, 0.8)'
      }
    },
    watch: {
      selectedIndex: function (val) {
        this.opa(val)
      }
    },
    methods: {
      opa (selectIndex) {
        switch (selectIndex) {
          case 0:
            this.opa1 = 'rgba(105, 105, 255, 0.7)'
            this.opa2 = 'rgba(105, 105, 255, 0.8)'
            break
          case 1:
            this.opa1 = 'rgba(0,171,126,0.7)'
            this.opa2 = 'rgba(0,171,126,0.8)'
            break
          case 2:
            this.opa1 = 'rgba(252,174,35, 0.7)'
            this.opa2 = 'rgba(252,174,35, 0.8)'
            break
          case 3:
            this.opa1 = 'rgba(51,130,219, 0.7)'
            this.opa2 = 'rgba(51,130,219, 0.8)'
            break
        }
      }
    },
    created () {
      this.opa(this.selectedIndex)
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
        overflow: hidden;
        &.active {
          transform: scale(1.15);
          overflow: visible;
          .bottom {
            width: 100% !important;
            border-radius: 0 !important;
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
          height: 188px;
          bottom: 0px;
          right: 0;
          z-index: 1000;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width:100%;
          height:200px;
          opacity:0.9;
          border-radius: 10px;
        }
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width:100%;
          height:268px;
          border-radius: 10px;
          z-index: 120;
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
          width:100%;
          font-size:55px;
          text-indent: 51px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          font-weight: 600;
          z-index: 200;
          color:rgba(255,254,254,1);
      }
        &:nth-child(1) {
          background: url('./images/famous_bg.png') no-repeat;
          background-size: cover;
          margin-right: 140px;
          .icon {
            background: url('./images/famous_icon.png') no-repeat;
            background-size: cover;
          }
          .img {
            position: absolute;
            background: url('./images/famous_img.png') no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
            left: -110px;
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
            background:linear-gradient(0deg,rgb(18, 18, 66) 0%,rgba(190,168,255,1) 100%);
          }
          &::before {
            background: url('./images/famous_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(2) {
          margin-right: 207px;
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
        &:nth-child(3) {
          background: url('./images/kindom_bg.png') no-repeat;
          background-size: cover;
          margin-right: 140px;
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
        &:nth-child(4) {
          background: url('./images/material_bg.png') no-repeat;
          background-size: cover;
          margin-right: 0;
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
      }
    }
  }
  @keyframes wave1{
    0% {background-position: 0 bottom;}
    50% {background-position: 225px bottom;}
    100% {background-position: 450px bottom;}
  }
  @keyframes wave2{
    0% {background-position: 0 bottom;}
    50% {background-position: 225px bottom;}
    100% {background-position: 450px bottom;}
  }
</style>
