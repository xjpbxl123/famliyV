<template>
  <div class="line">
      <div v-if="name === '热门曲谱'"><span>热</span>门曲谱</div>
      <div v-else><span>最</span>近更新</div>
      <span class="line-icon"></span>
      <div class="color"></div>
    </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: ['name']
  }
</script>
<style scoped lang="scss">
.line {
      position: absolute;
      top: 87px;
      left: 198px;
      div:nth-child(1) {
        color: #fff;
        font-size: 30px;
        span {
          font-size: 48px;
        }
      }
      .line-icon {
        width: 40px;
        height: 60px;
        position: absolute;
        left: -42px;
        top: -2px;
        background: url('../popular/images/icon.png') no-repeat;
        background-size: cover;
        }
      .color {
        width: 800px;
        height: 1px;
        margin-left: 0px;
        margin-bottom: 7px;
        background-image: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.6) 50%,
          rgba(255, 255, 255, 0.1)
        );
      }
    }
</style>
