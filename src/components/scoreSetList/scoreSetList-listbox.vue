<template>
    <div class="maxBox">
      <ul class="listBox" :style="{'top': top+'px'}">
        <li v-for="(item,index) of scoreSetList" :key="item.bookId" :class="{ active:index == scoreListIndex }">
            <findImg :src="item.coverSmall" ></findImg>
        </li>
    </ul>
    </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  export default {
    name: 'scoreSetList-listbox',
    props: {
      scoreSetList: {
        type: Array,
        default: () => {
          return []
        }
      },
      scoreListIndex: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    data () {
      return {}
    },
    watch: {
      scoreListIndex: function (val) {
        if (this.scoreListIndex === 0) {
          this.top = 0
          return
        }
        this.top = (Math.ceil((this.scoreListIndex + 1) / 20) - 1) * -762
      }
    },
    methods: {},
    created () {
      if (this.scoreListIndex === 0) {
        this.top = 0
        return
      }
      this.top = (Math.ceil((this.scoreListIndex + 1) / 20) - 1) * -762
    },
    components: {
      findImg
    }
  }
</script>
<style lang="scss" scoped>
  .maxBox {
    position: absolute;
    top: 180px;
    left: 200px;
    width: 100%;
    height: 762px;
    overflow: hidden;
    ul.listBox {
      position: absolute;
      top: 0;
      left: 0;
      li {
        color: #fff;
        font-size: 40px;
        width: 248px;
        height: 340px;
        box-sizing: border-box;
        margin-right: 102px;
        margin-bottom: 40px;
        img {
          width: 100%;
          height: 100%;
        }
        &.active {
          border:6px solid #ff7e1b;
        }
      }
    }
  }
</style>
