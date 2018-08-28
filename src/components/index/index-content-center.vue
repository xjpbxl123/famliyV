<template>
  <div class="box">
    <div class="rr"></div>
    <ul class="pages">
      <li v-for="(item, index) in pages" :key="index" :class="{'active': selectedIndex === index}">
        <div class="img"></div>
        <div class="icon"></div>
        <div class="bottom">
          <span v-text="item.text"></span>
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
        }]
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .box {
    display: flex;
    .pages {
      margin-left: 261px;
      margin-top: 149px;
      li {
        width: 450px;
        height: 660px;
        float: left;
        position: relative;
        transition: all 0.4s linear;
        border-radius: 10px;
        &.active {
          transform: scale(1.2);
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
          bottom: -116px;
          left: -5px;
          width: 460px;
          height: 100px;
        }
        .icon {
          position: absolute;
          width: 240px;
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
          span {
            position: absolute;
            bottom: 29px;
            width:100%;
            font-size:55px;
            text-indent: 57px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            font-weight: 600;
            color:rgba(255,254,254,1);
          }
        }
        &:nth-child(1) {
          background: pink;
          margin-right: 109px;
          .icon {
            background: url('./images/famous_icon.png') no-repeat;
            background-size: cover;
          }
          .bottom {
            background:linear-gradient(0deg,rgba(105,105,255,1) 0%,rgba(190,168,255,1) 100%);
          }
          &::before {
            background: url('./images/famous_bottom.png') no-repeat;
            background-size: cover;
          }
        }
        &:nth-child(2) {
          margin-right: 172px;
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
          margin-right: 109px;
          .img {
            position: absolute;
            background: url('./images/kindom_img.png') no-repeat;
            background-size: cover;
            width: 520px;
            height: 560px;
            left: -30px;
            top: -20px;
            z-index: 100;
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
</style>
