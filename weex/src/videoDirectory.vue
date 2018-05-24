<template>
  <div class="VideolDirectory">
    <div class="VideolDirectory-header">
      <text class="text">视频目录</text>
      <text class="text">共36个</text>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'videoDirectory',
    data () {
      return {}
    },
    methods: {},
    created () {
    }
  }
</script>

<style lang='scss'>
  .VideolDirectory {
    height: 1080px;
    width: 690px;
    background-color: rgba(0, 0, 0, .4);
    opacity: .5;

  }
  .VideolDirectory-header {
    width: 690px;
    height: 78px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #FFFFFF;
    flex-direction:row;
    justify-content: space-between;
    padding-left: 40px;
  }
  .text {
    flex: 1;
    line-height: 78px;
  }

</style>
