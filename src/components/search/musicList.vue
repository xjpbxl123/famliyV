<template>
  <div class="list" v-if="list.length!==0">
      <ul :style="{top: rightTop+'px'}">
          <li v-for="(item,index) in list" :key="index"  :class="{active: index===listIndex }">{{item.musicName || item.bookName}}</li>
      </ul>
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
        default: () => ([])
      }
    },
    watch: {
      listIndex (value, oldValue) {
        // 控制列表位置
        if (value === 0) {
          this.rightTop = 0
          return
        }
        let height = value * 87 * -1
        if (value - oldValue === -1) {
          // up
          if (value <= 0) {
            this.rightTop = 0
          }
          if (this.rightTop - height < 87) {
            this.rightTop = height
          }
        } else if (value - oldValue === 1) {
          // down
          if (value >= 10 && value < this.list.length) {
            if (parseInt(this.rightTop) - height > 87 * 9) {
              this.rightTop = (value - 9) * 87 * -1
            }
          }
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
  .list {
      width: 1725px;
      position: absolute;
      top: 77px;
      right: 150px;
      height: 870px;
      overflow: hidden;
      background: rgba(0,0,0,0.20);
      ul {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          li{
            width: 100%;
            height: 87px;
            line-height: 87px;
            font-family: PingFangSC-Regular;
            color: #fff;
            text-indent: 40px;
            font-size: 36px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            box-sizing: border-box;
            &.active {
               background-image: -webkit-linear-gradient(left,rgba(255, 255, 255, 0.1),rgba(255,255,255,0.5),rgba(255,255,255,0.1));
            }
          }
      }
  }
</style>
