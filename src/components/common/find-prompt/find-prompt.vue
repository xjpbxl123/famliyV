<template>
 <div class="find-prompt">
     <div class="prompt">
         <div class="prompt-icon">
             <i :class="['iconfont',icon]"></i>
         </div>
         <div class="prompt-text">
             {{text}}
         </div>
     </div>
 </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      icon: {
        type: String,
        default: () => 'icon-grade-right'
      },
      text: {
        type: String,
        default: () => '提示'
      }
    },
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {},
    components: {}
  }
</script>
<style lang="scss" scoped>
.find-prompt {
  .prompt {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 40px;
    overflow: hidden;
    .prompt-icon {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      margin-top: 120px;
      .iconfont {
        font-size: 120px;
      }
    }
    .prompt-text {
      font-size: 36px;
      width: 100%;
      text-align: center;
      margin-top: 55px;
    }
  }
}
</style>
