<template>
  <div class="center">
    <ul :style="{'top':rightTop+'px'}">
        <score-list-list-eachItem v-for="(item,index) in scoreList"
        :key="index"
        :index="index"
        :item="item"
        :setSelect="setSelect"
        :scoreIndex="scoreIndex"/>
    </ul>
  </div>

</template>
<script type="text/javascript">
  import scoreListListEachItem from './scoreList-list-eachItem'
  export default {
    props: {
      scoreList: {
        type: Array,
        default: () => ([])
      },
      scoreIndex: {
        type: Number,
        default: () => ([])
      },
      setSelect: {
        type: Function
      }
    },
    watch: {
      scoreIndex (value, oldValue) {
        // 控制列表位置
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
          if (value >= 10 && value < this.scoreList.length) {
            if (parseInt(this.rightTop) - height > 78 * 9) {
              this.rightTop = (value - 9) * 78 * -1
            }
          }
        } else if (value - oldValue === -10) {
          // prevPage
          let height = parseInt(this.rightTop) + 78 * 10
          this.rightTop = height
          if (value < 10) {
            height = 0
          }
          this.rightTop = height
        } else if (value - oldValue === 10) {
          // nextPage
          let height = parseInt(this.rightTop) - 78 * 10
          if (this.scoreList.length - value < 10) {
            height = (this.scoreList.length - 10) * 78 * -1
          }
          this.rightTop = height
        } else {
          if (value > 9) {
            this.rightTop = (value - 9) * 78 * -1
          }
          if (value === 0) {
            this.rightTop = 0
          }
        }
      }
    },
    data () {
      return {
        rightTop: 0
      }
    },
    methods: {
    },
    created () {
      if (this.scoreIndex >= 10) {
        this.rightTop = (this.scoreIndex - 9) * -78
      }
    },
    components: {
      scoreListListEachItem
    }
  }
</script>
<style lang="scss" scoped>
  .center {
      width: 976px;
      height: 780px;
      overflow: hidden;
      position: absolute;
      left: 850px;
      top: 94px;
      ul {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
      }
  }
</style>
