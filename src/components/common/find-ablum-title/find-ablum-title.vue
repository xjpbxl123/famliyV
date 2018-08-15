<template>
  <div class="find-ablum-title">
    <p class="name" v-text="name" :class="{active: isActive,'popularStyle':typeN ===2}" ></p>
    <span class="num"><span></span><span></span></span>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .find-ablum-title {
    .name {
      font-size: 36px;
      color: #334866;
      width: 300px;
      border-bottom: 1px solid #597399;
      padding-bottom: 10px;
      margin: 0;
      &.active {
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      &.popularStyle {
        color: #fff;
        font-size: 40px;
        border-bottom: none;
      }
    }
    .num {
      padding-top: 10px;
      padding-right: 70px;
      padding-left: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #597399;
      font-family: PingFangSC-Medium;
    }
  }
</style>
<script type="es6">
  export default {
    name: 'find-ablum-title',
    props: {
      name: String,
      isActive: Boolean,
      typeN: Number
    },
    data () {
      return {}
    }
  }
</script>
