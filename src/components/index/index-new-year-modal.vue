<template>
  <div class="new-year-modal">
    <div class="calendar-bg"></div>
    <div class="left-lights"></div>
    <div class="animation-lucky"></div>
    <div class="right-lights"></div>
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
  $zIndex: 9;
  .new-year-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .left-lights {
      position: absolute;
      left: -116px;
      top: -143px;
      z-index: $zIndex;
      width: 790px;
      height: 572px;
      background: url("./images/new_year/left_lights.png") no-repeat;
      background-size: contain;
    }
    .animation-lucky {
      position: absolute;
      left: 434px;
      top: 0;
      z-index: $zIndex;
      width: 224px;
      height: 517px;
      background: url("./images/new_year/lucky_animation.png") no-repeat;
      background-size: contain;
      animation: run 1.8s ease-in-out infinite alternate;
      transform-origin: 112px 0;
      transform: rotate(4deg);
    }
    .right-lights {
      position: absolute;
      z-index: $zIndex;
      right: -150px;
      top: -18px;
      width: 1370px;
      height: 324px;
      background: url("./images/new_year/right_lights.png") no-repeat;
      background-size: contain;
    }
    @keyframes run {
      0% {
        transform: rotate(4deg);
      }
      100% {
        transform: rotate(-4deg);
      }
    }
    .calendar-bg {
      position: absolute;
      left:5px;
      top: 84px;
      z-index: $zIndex;
      width: 470px;
      height: 100%;
      background: url("./images/new_year/calendar_bg.png") no-repeat;
      background-size: 70%;
      background-position: center 524px;
    }
  }
</style>
