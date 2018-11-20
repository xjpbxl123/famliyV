<template>
  <div class="image" >
      <img :src="url" alt="Find" :class="{'borderRadius': borderRadius}" @error="error" >
      <span v-show="showTitle && text" :style="textStyle" class="bookName" :class="{addZindex: addZindex}">{{text}}</span>
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
      },
      textStyle: {
        type: Object
      }
    },
    data () {
      return {
        url: this.beforeImage || this.errorImage,
        showTitle: true,
        addZindex: false
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
        if (this.errorImage.indexOf('./static') !== -1) {
          this.addZindex = true
        }
        if (src.indexOf('./static') !== -1) {
          this.url = this.src
          this.showTitle = false
          this.addZindex = true
          return
        }
        window.fp.modules.file.cacheUrl(src).then(data => {
          if (data.code === 0) {
            this.url = data.url
            this.addZindex = false
          } else {
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
   .bookName {
      position: absolute;
      top: 58%;
      color: #fff;
      font-size: 20px;
      width: 80%;
      text-align: center;
      left: 10%;
      &.addZindex {
        z-index: 30;
      }
    }
  }
</style>
