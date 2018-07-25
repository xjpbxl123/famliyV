<template>
  <div class="image" >
      <img :src="url" alt="Find" :class="{'borderRadius': borderRadius}" @error="error" >
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
      },
      borderRadius: {
        type: Boolean
      },
      hasBorder: {
        type: Boolean
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
      if (this.src.indexOf('./static') !== -1) {
        this.url = this.src
        return
      }
      window.fp.modules.file.cacheUrl(this.src).then(data => {
        if (data.code === 0) {
          this.url = data.url
        } else {
          console.log(data.desc)
        }
      })
    }
  }
</script>
<style lang="scss">
  .image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      width:100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      &.borderRadius {
        border-radius: 50%;
      }
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
