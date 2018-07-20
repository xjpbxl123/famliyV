<template>
  <ul>
    <li :style="imgSize(0)">
      <span class="cover"></span>
      <span class="shadow"></span>
      <findImg :src="albumArr[0] || 'dsds'" :beforeImage="errorImage" ></findImg>
    </li>
    <li :style="imgSize(1)">
      <span class="shadow" ></span>
      <findImg :src="albumArr[1] || 'dsds'" :beforeImage="errorImage" ></findImg>
    </li>
    <li :style="imgSize(2)">
      <span class="cover"></span>
      <findImg :src="albumArr[2] || 'dsds'" :beforeImage="errorImage" ></findImg>
    </li>
  </ul>
</template>
<style lang="scss" scoped type=text/scss>
  ul {
    width: 360px;
    position: relative;
    li {
      width: 180px;
      bottom: 0;
      position: absolute;
      border-radius: 15px 30px 30px 15px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.20);
        z-index: 50;
      }
      .shadow {
        width: 15px;
        height: 100%;
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        border-radius: 15px 30px 30px 15px;
        background-image: linear-gradient(-90deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.10) 32%, rgba(0,0,0,0.20) 58%, rgba(0,0,0,0.00) 85%);
      }
    }
  }
</style>
<script type="es6">
  import findImg from 'components/common/find-img/find-img'

  export default {
    name: 'find-album',
    props: {
      albumArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      type: {
        type: Object,
        default: () => {
          return {
            maxHeight: 246,
            differHeight: 14,
            over: 90
          }
        }
      }
    },
    data () {
      return {
        errorImage: require('../../popular/images/pic_bg_bookcover.png')
      }
    },
    methods: {
      styles ({height, translate, zIndex}) {
        return {
          height: `${height}px`,
          left: `${translate}px`,
          'z-index': zIndex
        }
      },
      imgSize (index) {
        let wag = Math.ceil(3 / 2) - (index + 1)
        if (wag < 0) {
          let height = this.type.maxHeight - this.type.differHeight * (-wag)
          let translate = this.type.over * index
          let zIndex = 10 + wag
          return this.styles({height, translate, zIndex})
        }
        if (wag > 0) {
          let height = this.type.maxHeight - this.type.differHeight * (wag)
          let translate = this.type.over * index
          let zIndex = 10 - wag
          return this.styles({height, translate, zIndex})
        }
        if (wag === 0) {
          let height = this.type.maxHeight
          let translate = this.type.over * index
          let zIndex = 10
          return this.styles({height, translate, zIndex})
        }
      }
    },
    components: {
      findImg
    }
  }
</script>
