<template>
 <div class="progressBar">
     <div class="border">

     </div>
    <div class="container" :style="{ width:progressNum+'%' }">

     </div>
     <div class="progressNum">
       {{progressNum}}%
     </div>
 </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      progress: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      progressNum () {
        return parseInt(this.progress * 100)
      }
    },
    methods: {},
    created () {},
    components: {}
  }
</script>
<style lang="scss" scoped>
  .progressBar {
    .border {
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
      border-radius: 10px;
      position: absolute;
      top: 0;
    }
    .container {
      width: 0%;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
      position: absolute;
      top: 0;
    }
    .progressNum {
      font-size: 24px;
      position: absolute;
      right: -80px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
