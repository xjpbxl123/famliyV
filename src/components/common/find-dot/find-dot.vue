<template>
  <i class="dot" :class="className"></i>
</template>

<script>
  import mixin from '../style-mixins'

  export default {
    name: 'find-dot',
    mixins: [mixin]
  }
</script>

<style lang="scss" scoped>
.dot {
  position: absolute;
  bottom: -1px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #fff;
  content: "";
}
</style>
