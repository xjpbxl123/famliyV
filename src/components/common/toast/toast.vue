<template>
 <div class="find-prompt" v-show="visible">
     <div class="prompt">
         <div class="prompt-icon" :class="{'loading': iconLoading}">
             <i :class="['iconfont',icon]" ></i>
         </div>
         <div class="prompt-text">
           <span v-html="text"></span>
         </div>
     </div>
 </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      text: {
        type: String,
        default: '正在加载'
      },
      icon: {
        type: String,
        default: 'icon-sync-info'
      },
      iconLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: false
      }
    }
  }
</script>
<style lang="scss" scoped>
.find-prompt {
    position: absolute;
    z-index: 100;
    width: 640px;
    height: 360px;
    position: absolute;
    top: 500px;
    left: 2043px;
  .prompt {
    width: 100%;
    height: 100%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 16px;
    overflow: hidden;
    .prompt-icon {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      margin-top: 70px;
      &.loading {
        animation:loading 2s infinite linear;
      }
      @keyframes loading {
        from {transform:rotate(0deg)}
        to {transform:rotate(360deg)}
      }
      .iconfont {
        font-size: 120px;
        color: #fff;
      }
    }
    .prompt-text {
      font-size: 36px;
      width: 100%;
      text-align: center;
      margin-top: 34px;
      color: #fff;
    }
  }
}
</style>
