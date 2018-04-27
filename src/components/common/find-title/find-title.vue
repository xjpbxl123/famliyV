<template>
    <span class='find-title' v-bind:style="styles">
      {{title}}
    </span>
</template>
<style lang="scss" scope type=text/scss>
  .find-title {
    padding: 29px 38px 29px 38px;
    position: absolute;
    top: 50px;
    left: -10px;
    background: #094BA6;
    color: white;
    font-size: 40px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 6px 8px 21px rgba(0,0,0,.8);
  }
</style>
<script type="es6">
  export default {
    name: 'find-title',
    props: {
      title: {
        type: String,
        default: () => {
          return 'find'
        }
      },
      styles: {
        type: Object,
        default: () => {
          return {
            color: 'white',
            background: '#094BA6'
          }
        }
      }
    },
    data () {
      return {}
    },
    method: {}
  }
</script>
