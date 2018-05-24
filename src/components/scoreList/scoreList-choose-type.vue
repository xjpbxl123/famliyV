<template>
    <div class="chooseType">
       <div class="coverBox">
          <div class="title" v-text="bannerType==='collect'?'请选择要收藏的版本':'请选择曲谱版本'"></div>
          <ul>
            <li v-for="(item,index) in files" :key="index"
            :class="{type1:(item.styleName==='钢琴独奏版'),
                    type2:(item.styleName==='钢琴弹唱版'),
                    type3:(item.styleName==='初练版'),
                    type4:(item.styleName==='器乐合奏版'),
                    type5:(item.styleName==='器乐弹唱版')}">
              <span class="styleName">{{item.styleName}}</span>
              <span class="styleDesc">{{item.styleDescription}}</span>
              <span class="collectIcon iconfont" :class="collect[index].collection?'icon-favorite-on':'icon-favorite'" v-if="bannerType==='collect'"></span>
            </li>
          </ul>
        </div>
    </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      files: {
        type: Array,
        default: () => ([])
      },
      collect: {
        type: Array,
        default: () => ([])
      },
      bannerType: {
        type: String,
        default: () => ('')
      }
    },
    data () {
      return {
      }
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
  .chooseType {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 100;
    .coverBox {
      position: absolute;
      width: 50%;
      left: 50%;
      top: 56%;
      .title {
        width: 76%;
        font-size: 48px;
        position: relative;
        text-align: center;
        color: #fff;
        font-weight: 600;
        &::before {
          content: '';
          width: 512px;
          height: 1px;
          top: 24px;
          left: -1%;
          position: absolute;
          background-image: -webkit-linear-gradient(left,rgba(255,255,255,.1),rgba(255,255,255,0.5),rgba(255,255,255,1));
        }
        &::after {
          content: '';
          width: 457px;
          height: 1px;
          top: 24px;
          left: 66%;
          position: absolute;
          background-image: -webkit-linear-gradient(left,rgba(255,255,255,1),rgba(255,255,255,0.5),rgba(255,255,255,.1));
        }
      }
      ul {
        display: flex;
        justify-content: left;
        margin-top: 20px;
        li {
          width: 240px;
          height: 368px;
          margin-right: 140px;
          color: #fff;
          position: relative;
          font-weight: 600;
          &.type1 {
            background: url('./images/type1.png');
            background-size: cover;
          }
          &.type2 {
            background: url('./images/type2.png');
            background-size: cover;
          }
          &.type3 {
            background: url('./images/type3.png');
            background-size: cover;
          }
          &.type4 {
            background: url('./images/type4.png');
            background-size: cover;
          }
          &.type5 {
            background: url('./images/type5.png');
            background-size: cover;
          }
          .styleName {
            position: absolute;
            bottom: 100px;
            width: 90%;
            left: 53%;
            text-align: center;
            font-size: 28px;
            transform: translateX(-50%);
            padding-bottom: 10px;
            border-bottom-style: solid;
            border-width: 0;
            border-bottom-width: 1px;
            border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,1),rgba(255,255,255,0)) 30 30;
          }
          .styleDesc {
            position: absolute;
            top: 280px;
            width: 80%;
            left: 53%;
            line-height: 16px;
            transform: translateX(-50%);
            text-align: left;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .collectIcon {
            position: absolute;
            top: 21%;
            left: 51%;
            transform: translateX(-50%);
            font-size: 68px;
            color: #fff;
            font-weight: 400;
          }
        }
      }
    }
  }

</style>
