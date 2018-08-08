<template>
    <div class="userMess">
        <span class="leftTitle">曲名/专辑</span>
        <span class="rightTitle">{{rightTitle}}</span>
        <span class="titleIcon iconfont icon-waiting"></span>
        <div class="contentBox">
            <ul :style="{'marginTop':rightTop+'px'}">
                <li  v-for="(item,index) in list"  :key="index" :class="{active: listIndex == index}" @click="setSelect(index)">
                    <span class="typeIcon iconfont icon-song" ></span>
                    <div class="name">
                        <span class="musicName">{{item.name || item.musicName}}</span>
                        <span class="bookName">{{item.bookName}}</span>
                    </div>
                    <div class="styleName">
                        {{item.styleName[0] || ''}}
                    </div>
                    <div class="date">
                        <span class="date1">{{ item.time || item.practiceTime | format1}}</span>
                        <span class="date2">{{ item.time || item.practiceTime | format2}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script type="text/javascript">
  import { formatDate } from 'scripts/utils/index'
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      rightTitle: {
        type: String,
        default: () => ('')
      },
      listIndex: {
        type: Number,
        default: () => (0)
      },
      setSelect: {
        type: Function
      }
    },
    data () {
      return {
        rightTop: 0
      }
    },
    watch: {
      listIndex (value, oldValue) {
        console.log(value)
        if (value === 0) {
          this.rightTop = 0
          return
        }
        let height = value * 120 * -1
        if (value - oldValue === -1) {
          // up
          if (value <= 0) {
            this.rightTop = 0
          }
          if (this.rightTop - height < 120) {
            this.rightTop = height
          }
        } else if (value - oldValue === 1) {
          // down
          if (value >= 5 && value < this.list.length) {
            if (parseInt(this.rightTop) - height > 120 * 4) {
              this.rightTop = (value - 4) * 120 * -1
            }
          }
        }
      }
    },
    filters: {
      format1 (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'MM月dd日')
      },
      format2 (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'hh:mm')
      }
    },
    methods: {
    },
    created () {
      if (this.listIndex >= 5) {
        this.rightTop = (this.listIndex - 4) * -120
      }
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
    .userMess {
        width: 50%;
        height: 100%;
        position: absolute;
        left: 50%;
        .leftTitle {
            color: #fff;
            font-size: 36px;
            margin-left: 30px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .titleIcon {
            float: right;
            margin-right:10px;
            color: #fff;
            font-size: 36px;
            }
        .rightTitle {
            color: #fff;
            font-size: 36px;
            float: right;
            margin-right:90px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .contentBox {
            background: rgba(0,0,0,0.30);
            width: 1698px;
            height: 660px;
            overflow: hidden;
            margin-top: 4px;
            ul {
                width: 100%;
                height: 100%;
                li {
                    width: 100%;
                    height: 120px;
                    border-bottom: 1px solid #fff;
                    box-sizing: border-box;
                    position: relative;
                    display: block;
                    &.active {
                        background: #FF7E1B;
                    }
                    .typeIcon {
                        font-size: 42px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 40px;
                        color: #fff;
                    }
                    .name {
                        position: absolute;
                        left:110px;
                        height:100%;
                        color: #fff;
                        width: 400px;
                        .musicName {
                            font-size: 30px;
                            position: absolute;
                            height: 50%;
                            line-height: 80px;
                            top: 0;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .bookName {
                            font-size: 22px;
                            position: absolute;
                            height: 50%;
                            line-height: 30px;
                            top: 50%;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .styleName {
                        position: absolute;
                        left: 656px;
                        height: 100%;
                        line-height: 120px;
                        font-size: 22px;
                        top: 0;
                        color: #fff;
                    }
                    .date {
                        position: absolute;
                        width: 110px;
                        right: 93px;
                        height: 100%;
                        line-height: 120px;
                        font-size: 22px;
                        top: 0;
                        color: #fff;
                        .date1 {
                            position: absolute;
                            top: 0;
                            height: 50%;
                            line-height: 80px;
                            width: 100%;
                            text-align: center;
                        }
                        .date2 {
                            position: absolute;
                            top: 50%;
                            height: 50%;
                            width: 100%;
                            line-height: 30px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

</style>
