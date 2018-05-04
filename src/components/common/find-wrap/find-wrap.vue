<template>
  <div class="find-wrap">
    <find-title class='find-wrap-title' :styles="styles" :title="title"></find-title>
    <div class="find-wrap-content">
      <div class="find-wrap-list" :scroll-top.prop="scrollTop">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .find-wrap {
    position: absolute;
    top: 50px;
    left: 110px;
    width: 3620px;
    height: 912px;
    .find-wrap-content {
      width: 100%;
      height: 806px;
      padding: 40px 40px 60px 135px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, .2);
      border-radius: 10px;
      box-shadow: 0 8px 10px rgba(0, 0, 0, .5);
      .find-wrap-list {
        height: 100%;
        width: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
<script type="es6">
  import findTitle from 'components/common/find-title/find-title'

  export default {
    name: 'find-wrap',
    props: {
      title: {
        type: String,
        default: () => {
          return 'find'
        }
      },
      scrollTop: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    data () {
      return {
        styles: {
          position: 'relative',
          display: 'inline-block',
          left: '50px',
          top: 0,
          'box-shadow': 'none',
          'border-radius': '10px 10px 0 0',
          background: 'rgba(255,255,255,.2)',
          'font-size': '48px'
        }
      }
    },
    method: {},
    components: {
      findTitle
    }
  }
</script>
