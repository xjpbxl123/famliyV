<template>
  <button :class="[className,{'require-dot':requireDot}]" @click="action(meta)">
    <slot>
      <i class="iconfont" :class="iconClass"></i>
      <span class="text" v-text="iconText"></span>
      <i class="dot"></i>
    </slot>
  </button>
</template>

<script>
  import mixin from '../style-mixins'

  export default {
    name: 'find-button',
    mixins: [mixin],
    props: {
      iconClass: { type: String },
      iconText: { type: String, default: '' },
      requireDot: { type: Boolean, default: true },
      action: { type: Function, default: () => {} },
      meta: { type: Object }
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
    padding-bottom: 30px;
  }
  .iconfont {
    padding-bottom: 5px;
    font-size: 36px;
  }
  .text {
    width: 36px;
    font-size: 18px;
  }
  .dot {
    position: absolute;
    bottom: 10px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #fff;
    content: "";
  }
}
</style>
