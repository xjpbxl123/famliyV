<template>
  <div class="tap-buttons">
    <button class="eachButton" v-for="(item,index) in tapButtons" :key="item.icon"  :class="[item.className,{active: (index === popularTapIndex)}]">
      <span class="content" >
        <i class="iconfont" :class="item.icon"></i>
        <span class="text" v-text="item.text"></span>
      </span>
    </button>
  </div>
</template>

<script>
  import findDot from '../common/find-dot/find-dot'

  export default {
    name: 'popularTapButton',
    props: {
      popularTapIndex: {
        type: Number,
        default: () => (2)
      }
    },
    data () {
      return {
        tapButtons: [
          { icon: 'icon-sort-age', text: '年代', dot: true, className: 'tap-year key-46' },
          { icon: 'icon-sort-level', text: '难度', dot: true, className: 'tap-differ key-49' },
          { icon: 'icon-sort-music-style', text: '曲风', dot: true, className: 'tap-style key-54' }
        ]
      }
    },
    components: {
      findDot
    },
    created () {
      console.log(this.popularTapType, 'popularTapType')
    }
  }
</script>

<style lang="scss" scoped>
  .tap-buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    .eachButton {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      transform: translateX(-50%);
      background: #2582c4;
      bottom: 10px;
      &.active {
        background: #d86d0a !important;
        .content {
          background-image: linear-gradient(-189deg,#fcb150 0%,#d86d0a 100%) !important;
        }
      }
      .content {
        line-height: 50px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        width: 148px;
        height: 87px;
        border-radius: 16px;
        background-image: linear-gradient(-189deg,#4eb9ec 0%,#2582c4 100%);
        .iconfont {
          font-size: 42px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 6px;
        }
        .text {
          position: absolute;
          width: 100%;
          text-align: center;
          font-size: 18px;
          top: 40px;
          left: 0;
        }
      }
    }
  }

</style>
