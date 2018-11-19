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
        default: require('../../../images/default.png')
      },
      src: {
        type: String,
        default: require('../../../images/default.png')
      },
      errorImage: {
        type: String,
        default: require('../../../images/default.png')
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
    watch: {
      src (val) {
        this.convertLocalImages(val)
      }
    },
    methods: {
      /**
       * 失败
       */
      error () {
        this.url = this.errorImage || this.beforeImage
      },
      convertLocalImages (src) {
        if (src.indexOf('./static') !== -1) {
          this.url = this.src
          this.showTitle = false
          return
        }
        window.fp.modules.file.cacheUrl(src).then(data => {
          if (data.code === 0) {
            this.url = data.url + 'm'
            this.showTitle = false
          } else {
            this.showTitle = true
            this.url = this.errorImage
            console.log(data.desc)
          }
        })
      }
    },
    created () {
      this.convertLocalImages(this.src)
    }
  }
</script>
<style lang="scss" scoped>
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
      z-index: 20;
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
