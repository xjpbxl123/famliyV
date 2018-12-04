<template>
  <li class="famous-item" :class="index == select && 'active'" @click="setFamousSetSelect(index)"
      :style="{height:`${famousItemStyle.height}%`,width:`${famousItemStyle.width}px`}">
    <find-img class='image' :src="famous.cover" :beforeImage="cover.beforeImage" :errorImage="cover.beforeImage" :text="famous.name" :textStyle="textStyle"/>
  </li>
</template>
<script>
  import { mapState } from 'vuex'
  import findImg from 'components/common/find-img/find-img'

  export default {
    name: 'famous-item',
    props: {
      select: {type: Number, default: 0},
      index: {type: Number, default: 0},
      famous: {type: Object},
      setFamousSetSelect: {type: Function}
    },
    data () {
      return {
        famousItemStyle: {
          height: 100,
          width: 617
        },
        cover: {
          beforeImage: require('./default.png')
        },
        textStyle: {
          fontSize: '70px',
          top: '61%',
          left: '22%'
        }
      }
    },
    created () {
      this.changeSize(this.select)
    },
    computed: mapState({}),
    methods: {
      changeSize (select) {
        let wag = this.index - select
        if (wag < 0) {
          this.famousItemStyle.width = 617 - 57 * (-wag)
        }
        if (wag > 1) {
          this.famousItemStyle.width = 617 - 57 * (wag - 1)
        }
        if (wag === 0 || wag === 1) {
          this.famousItemStyle.width = 617
        }
      }
    },
    watch: {
      select (val, oldValue) {
        this.changeSize(val)
      }
    },
    components: {findImg}
  }
</script>

<style lang="scss" scoped type=text/scss>
  .famous-item {
    display: inline-block;
    position: relative;
    &.active {
      margin-right: 10px;
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        border: 6px solid #00A2E7;
        img {
          display: block;
          height: 100%;
        }
      }
    }
  }
</style>
<style lang="scss" type=text/scss>
.famous-item {
  .image {
    width: 100%;
    position: absolute;
    bottom: 0;
      img {
        height: auto !important;
      }
    }
}
</style>
