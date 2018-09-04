<template>
  <div>
    <transition name="fade">
      <div class="find-toast" v-show="visible" :class="className">
        <img :src="image" class="find-toast-icon" alt="">
        <span class="find-toast-text">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped type=text/scss>
  .find-toast {
    position: fixed;
    top: 272px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.9);
    padding: 50px 43px 56px 57px;
    box-sizing: border-box;
    width: 400px;
    height: 225px;
    display: flex;
    flex-direction:column;
    align-items: center;
    z-index: 1000;
    color: #ffffff;

    .find-toast-icon {
        display: block;
      width: 60px;
      height: 60px;
      }

    .find-toast-text {
        font-size: 25px;
        display: block;
        text-align: center;
        margin-top: 35px;
      }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>

<script type="text/babel">
  export default {
    props: {
      message: {
        type: String,
        default: '你好啊！小朋友～～'
      },
      className: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: require('./toast.png')
      }
    },
    data () {
      return {
        visible: false
      }
    }
  }
</script>
