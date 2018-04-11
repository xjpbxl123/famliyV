<template>
  <div :class="className">
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
div {
  display: flex;
  position: absolute;
  bottom: 10px;
}
</style>
