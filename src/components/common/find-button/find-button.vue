<template>
  <button :class="[className,{'require-dot':requireDot}]" @click="action">
    <slot>
      <i class="iconfont" :class="iconClass"></i>
      <span class="text" v-text="text"></span>
      <find-dot v-if="requireDot" />
    </slot>
  </button>
</template>

<script>
  import mixin from '../style-mixins'
  import findDot from '../find-dot/find-dot'
  export default {
    name: 'find-button',
    mixins: [mixin],
    props: {
      iconClass: { type: String },
      text: { type: String, default: '' },
      requireDot: { type: Boolean, default: true },
      action: {
        type: Function,
        default: () => {}
      }
    },
    components: {
      findDot
    }
  }
</script>

<style lang="scss" scoped>
button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  color: #fff;
  &.require-dot {
    padding-bottom: 24px;
  }
  .iconfont {
    padding-bottom: 5px;
    font-size: 36px;
  }
  .text {
    width: 36px;
    font-size: 18px;
  }
}
</style>
