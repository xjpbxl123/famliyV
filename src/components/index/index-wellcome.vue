<template>
  <div class="wellcome-modal">
    <div class="animation-pig"></div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    mounted () {
    }
  }
</script>
<style lang="scss" scoped>
  .wellcome-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999;
    background: url('./images/wellcome_bg.png') no-repeat;
    background-size: contain;
  }

  .animation-pig {
    width: 582px;
    height: 576px;
    display: block;
    background-repeat: no-repeat;
    background-image: url("./images/animation_pig/pig_long.png");
    animation: frame 5s steps(72) both infinite;
    position: absolute;
    left: 1340px;
    bottom: 18px;
  }

  @keyframes frame {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -83808px 0;
    }
  }
</style>
