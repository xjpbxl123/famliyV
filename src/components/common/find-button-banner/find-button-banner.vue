<template>
  <div class="button-banner-wrapper" :class="className">
    <slot></slot>
  </div>
</template>

<script>
  import mixin from '../style-mixins'
  export default {
    name: 'find-button-banner',
    mixins: [mixin]
  }
</script>

<style lang="scss" scoped>
.button-banner-wrapper {
  display: flex;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 999;
}
</style>
