<template>
 <div class="timbreList">
    <div class="listOne" v-if="listIndex <= 1">
        <div class="title" v-text="title1"></div>
        <div class="box1">
            <ul>
                <li v-for="(item,index) in list" :key="index"  :class="{active: index===listIndex1 && listIndex === 0}">
                    <div class="item">
                        <span class="icon iconfont"  :class="item.iconName"></span>
                        <span class="name" v-text="item.name"></span>
                        <div class="img" v-if="item.imgUrl">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <span class="yidiaoValue" v-if="item.value !== undefined" v-text="'+'+yidiaoValue"></span>
                        <span class="iconfont icon-arrow-more arrow"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="listTwo" :class="{'slideLeft': listIndex === 2}">
        <div class="title">
            <span class="iconfont icon-arrow-back icon1"></span>
            <span class="title1" v-text="title1"></span>
            <span class="iconfont icon-arrow-back icon2"></span>
            <span class="title2" v-text="title2">电子键盘音色</span>
        </div>
        <div class="box1" v-if="listIndex1 === 0">
            <ul :style="{top: rightTop+'px'}">
                <li v-for="(item,index) in list[0].items" :key="index"  :class="{active: index===listIndex2 && listIndex === 1}">
                    <div class="item">
                        <div class="img" v-if="item.imgUrl">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <span class="name" v-text="item.name"></span>
                        <span class="iconfont icon-arrow-more arrow"  v-if="!item.hideArrow"></span>
                        <span class="iconfont icon-sync-complete arrow arrow1" v-if="index === chosedItemListIndex"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="box2" v-if="listIndex1 === 1">
            <span class="iconfont icon-transpose icon"></span>
            <span class="text">电子键盘移调</span>
            <div class="valueBox" v-text="'+'+yidiaoValue"></div>
        </div>
    </div>
    <div class="listTwo" v-if="listIndex === 2">
        <div class="title">
            <span class="iconfont icon-arrow-back icon1"></span>
            <span class="title1" v-text="title1">键盘设置</span>
            <span class="iconfont icon-arrow-back icon1"></span>
            <span class="title1" v-text="title2">电子键盘音色</span>
            <span class="iconfont icon-arrow-back icon2"></span>
            <span class="title2" v-text="title3">钢琴</span>
        </div>
        <div class="box1">
            <ul>
                <li v-for="(item,index) in list[0].items[this.listIndex2].items" :key="index"  :class="{active: index===listIndex3 && listIndex === 2}">
                    <div class="item">
                        <div class="img" :class="{'imgN': !item.imgUrl}" >
                            <img :src="item.imgUrl" alt="" v-if="item.imgUrl">
                        </div>
                        <span class="name" v-text="item.name"></span>
                        <span class="iconfont icon-sync-complete arrow" v-if="item.item === chosedItem"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
 </div>
</template>

<script>
  export default {
    name: 'musicList',
    data () {
      return {
        rightTop: 0
      }
    },
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      listIndex: {
        type: Number,
        default: () => (0)
      },
      title1: {
        type: String,
        default: () => ''
      },
      title2: {
        type: String,
        default: () => ''
      },
      title3: {
        type: String,
        default: () => ''
      },
      listIndex1: {
        type: Number,
        default: () => 0
      },
      listIndex2: {
        type: Number,
        default: () => 0
      },
      listIndex3: {
        type: Number,
        default: () => 0
      },
      yidiaoValue: {
        type: Number,
        default: () => 0
      },
      chosedItem: {
        type: Number,
        default: () => NaN
      },
      chosedItemListIndex: {
        type: Number,
        default: () => NaN
      }
    },
    watch: {
      listIndex2 (value, oldValue) {
        // 控制列表位置
        if (value === 0) {
          this.rightTop = 0
          return
        }
        let height = value * 78 * -1
        if (value - oldValue === -1) {
          // up
          if (value <= 0) {
            this.rightTop = 0
          }
          if (this.rightTop - height < 78) {
            this.rightTop = height
          }
        } else if (value - oldValue === 1) {
          // down
          if (value >= 9 && value < this.list[0].items.length) {
            if (parseInt(this.rightTop) - height > 78 * 8) {
              this.rightTop = (value - 8) * 78 * -1
            }
          }
        } else if (value - oldValue === -9) {
          // prevPage
          let height = parseInt(this.rightTop) + 78 * 9
          this.rightTop = height
          if (value < 9) {
            height = 0
          }
          this.rightTop = height
        } else if (value - oldValue === 9) {
          // nextPage
          let height = parseInt(this.rightTop) - 78 * 9
          if (this.list[this.listIndex1].items.length - value < 9) {
            height = (this.list[this.listIndex1].items.length - 9) * 78 * -1
          }
          this.rightTop = height
        }
      }
    },
    created () {
    },
    components: {

    }
  }
</script>

<style scoped lang="scss">
    .timbreList {
        width: 100%;
        height: 100%;
        position: relative;
        .listOne {
            width: 1070px;
            position: absolute;
            top: 85px;
            left: 850px;
            height: 900px;
            background:linear-gradient(-90deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 100%);
            border-radius:12px 0px 0px 12px;
            padding-top: 56px;
            .title {
                width: 855px;
                margin: 0 auto;
                text-align: center;
                font-size: 36px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color:rgba(255,255,255,1);
                border-bottom: 1px solid rgba(255,255,255,0.5);
                padding-bottom: 20px;
            }
            .box1 {
                position: relative;
                width: 100%;
                height: 702px;
                overflow: hidden;
                ul {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    li {
                        width: 100%;
                        height: 78px;
                        color: #fff;
                        box-sizing: border-box;
                        &.active {
                        background-image: -webkit-linear-gradient(left,rgba(255, 255, 255, 0),rgba(255,255,255,0.4),rgba(255,255,255,0));
                        }
                        .item {
                            width: 855px;
                            height: 100%;
                            position: relative;
                            line-height: 78px;
                            margin: 0 auto;
                            text-indent: 20px;
                            border-width: 0;
                            border-bottom-width: 1px;
                            border-bottom-style: solid;
                            border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0)) 30 30;
                            .name {
                                font-size: 30px;
                                font-family: PingFangSC-Regular;
                                font-weight: 400;
                                color:rgba(255,255,255,1);
                                margin-left: 20px;
                            }
                            .icon {
                                font-size: 30px;
                            }
                            .img {
                                width: 50px;
                                height: 50px;
                                background:rgba(255,255,255,1);
                                border-radius: 6px;
                                float: right;
                                margin-right: 84px;
                                margin-top: 12px;
                                background-size: cover;
                                position: relative;
                                img {
                                    width: 88%;
                                    height: 88%;
                                    position: absolute;
                                    left: 6%;
                                    top: 6%;
                                }
                            }
                            .arrow {
                                position: absolute;
                                top: 0;
                                right: 48px;
                                font-size: 30px;
                            }
                            .yidiaoValue {
                                float: right;
                                width: 50px;
                                height: 100%;
                                margin-right: 100px;
                                text-align: center;
                                display: block;
                                line-height: 78px;
                                font-size: 36px;
                                font-family: PingFangSC-Semibold;
                                font-weight: 600;
                                color:rgba(255,255,255,1);
                            }
                        }

                    }
                }
            }

        }
        .listTwo {
            width: 1070px;
            position: absolute;
            top: 85px;
            right: 850px;
            height: 900px;
            background:rgba(0,0,0,0.3);
            border-radius:0px 12px 12px 0px;
            padding-top: 56px;
            &.slideLeft {
                left: 850px;
                background:linear-gradient(-90deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 100%);
                border-radius:12px 0px 0px 12px;
            }
            .title {
                width: 855px;
                margin: 0 auto;
                text-align: left;
                font-size: 36px;
                font-family: PingFangSC-Semibold;
                color:rgba(255,255,255,1);
                font-weight: 600;
                border-bottom: 1px solid rgba(255,255,255,0.5);
                padding-bottom: 20px;
                .icon1 {
                    color: rgba(255,255,255,0.3);
                    font-size: 30px;
                }
                .icon2 {
                    font-size: 30px;
                }
                .title1 {
                    color:rgba(255,255,255,0.3);
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                }
            }
            .box1 {
                position: relative;
                width: 100%;
                height: 702px;
                overflow: hidden;
                ul {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    li {
                        width: 100%;
                        height: 78px;
                        color: #fff;
                        box-sizing: border-box;
                        &.active {
                        background-image: -webkit-linear-gradient(left,rgba(255, 255, 255, 0),rgba(255,255,255,0.4),rgba(255,255,255,0));
                        }
                        .item {
                            width: 835px;
                            height: 100%;
                            position: relative;
                            line-height: 78px;
                            margin: 0 auto;
                            text-indent: 20px;
                            border-width: 0;
                            padding-left: 20px;
                            border-bottom-width: 1px;
                            border-bottom-style: solid;
                            border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0)) 30 30;
                            .img {
                                width: 50px;
                                height: 50px;
                                background:rgba(255,255,255,1);
                                border-radius: 6px;
                                position: relative;
                                float: left;
                                margin-top: 12px;
                                background-size: cover;
                                &.imgN {
                                    background: transparent !important;
                                }
                                img {
                                    width: 88%;
                                    height: 88%;
                                    position: absolute;
                                    left: 6%;
                                    top: 6%;
                                }
                            }
                            .name {
                                font-size: 30px;
                                font-family: PingFangSC-Regular;
                                font-weight: 400;
                                color:rgba(255,255,255,1);
                                margin-left: 20px;
                            }

                            .arrow {
                                position: absolute;
                                top: 0;
                                right: 48px;
                                font-size: 30px;
                            }
                            .arrow1 {
                                right: 100px;
                            }
                        }

                    }
                }
            }
            .box2 {
                position: relative;
                width: 835px;
                margin: 0 auto;
                height: 76px;
                line-height: 76px;
                color: #fff;
                .icon {
                    float: left;
                    font-size: 30px;
                    margin-left: 20px;
                }
                .text {
                    font-size: 30px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    float: left;
                    margin-left: 22px;
                }
                .valueBox {
                    float: right;
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    margin-top: 21px;
                    text-align: center;
                    background:rgba(255,255,255,0.2);
                    border-radius: 20px;
                    font-size: 36px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                }
            }
        }
    }

</style>
