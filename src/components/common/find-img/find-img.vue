<template>
  <div class="image">
      <img :src="url" alt="Find">
      <h1 v-show="showTitle">{{text}}</h1>
  </div>
</template>
<script>
  export default {
    name: 'find-img',
    props: {
      beforeImage: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      },
      src: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      },
      errorImage: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      },
      text: {
        type: String,
        default: () => ''
      }
    },
    data () {
      return {
        url: this.beforeImage || this.errorImage,
        showTitle: true
      }
    },
    methods: {
      /**
       * 失败
       */
      error () {
        this.url = this.errorImage || this.beforeImage
      }
    },
    // render () {
    //   return (
    //     <img src={this.url} alt="Find" onError={this.error}></img>
    //   )
    // },
    created () {
      let image = new Image()
      image.src = this.src
      image.onload = () => {
        let checkoutImg = setInterval(() => {
          if (image.complete) { // 加载完成
            this.showTitle = false
            this.url = this.src
            clearInterval(checkoutImg)
          }
        }, 1000)
      }
    }
  }
</script>
<style lang="scss">
  .image {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width:100%;
      position: absolute;
      bottom: 0;
    }
    h1 {
      font-size: 70px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform:translateX(-50%);
      top: 70%;
    }
  }
</style>
