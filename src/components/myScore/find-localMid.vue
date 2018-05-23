<template>
    <div class="localMid">
        <div class="leftTitle">文件列表</div>
        <div class="contentBox">
            <ul :style="{'marginTop':rightTop+'px'}">
                <li  v-for="(item,index) in list"  :key="index" :class="{active: listIndex == index}">
                    <span class="typeIcon iconfont icon-midi" ></span>
                    <span class="name">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      listIndex: {
        type: Number,
        default: () => (0)
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
    methods: {
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
    .localMid {
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
        .contentBox {
            background: rgba(0,0,0,0.30);
            width: 1698px;
            height: 660px;
            overflow: hidden;
            ul {
                width: 100%;
                height: 100%;
                li {
                    width: 100%;
                    height: 120px;
                    border-bottom: 1px solid #fff;
                    box-sizing: border-box;
                    position: relative;
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
                        font-size: 30px;
                        margin-left: 108px;
                        display: inline-block;
                        height: 100%;
                        line-height: 120px;
                        color: #fff;
                        font-weight: 600;
                    }
                }
            }
        }
    }

</style>
