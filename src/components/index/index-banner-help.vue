<template>
  <div class="help-banner"
       :class="{'show-help-banner':showHelpBanner}"
       :style="{'background-image':`url(${helpImg[helpIndex]})`}"
       @click="()=>buttonActions('help')"
  ></div>
</template>

<script>
  export default {
    name: 'index-banner-help',
    props: {
      showHelpBanner: Boolean,
      helpImg: Array,
      helpIndex: { type: Number, default: 0 },
      buttonActions: Function
    }
  }
</script>

<style lang="scss" scoped>
.help-banner {
  display: none;
  position: absolute;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: transparent url("./images/help-1.png") no-repeat center;
}

.show-help-banner {
  display: block;
}
</style>
