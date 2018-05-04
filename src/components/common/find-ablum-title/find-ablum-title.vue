<template>
  <div class="find-ablum-title">
    <p class="name">约翰·汤普森</p>
    <span class="num"><span>5册</span><span>36篇</span></span>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .find-ablum-title {
    .name {
      font-size: 36px;
      color: #334866;
      border-bottom: 1px solid #597399;
      padding-bottom: 10px;
      margin: 0;
    }
    .num {
      padding-top: 10px;
      padding-right: 70px;
      padding-left: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #597399;
    }
  }
</style>
<script type="es6">
  export default {
    name: 'find-ablum-title',
    data () {
      return {}
    }
  }
</script>
