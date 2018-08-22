<template>
 <div class="find-prompt" v-show="show" :style="{width:width+'px',height: height + 'px'}">
     <div class="prompt">
         <div class="prompt-icon" :class="{'loading': loading}">
             <i :class="['iconfont',icon]" ></i>
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
      },
      delay: {
        type: Number,
        default: () => 2000
      },
      width: {
        type: Number,
        default: () => 750
      },
      height: {
        type: Number,
        default: () => 450
      },
      allExit: {
        type: Boolean,
        default: () => false
      },
      loading: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        show: false
      }
    },
    computed: {},
    methods: {
      showPrompt () {
        this.show = true
        setTimeout(() => {
          if (!this.allExit) {
            this.show = false
          }
        }, this.delay)
      },
      hidePrompt () {
        this.show = false
      }
    },
    created () {
    },
    components: {},
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
.find-prompt {
  position: absolute;
  z-index: 100;
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
