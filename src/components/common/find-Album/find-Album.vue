<template>
  <ul>
    <li :style="imgSize(0)">
      <findImg :src="albumArr[0] || 'dsds'" :beforeImage="errorImage" :hasBorder="true"></findImg>
    </li>
    <li :style="imgSize(1)">
      <findImg :src="albumArr[1] || 'dsds'" :beforeImage="errorImage" :hasBorder="true"></findImg>
    </li>
    <li :style="imgSize(2)">
      <findImg :src="albumArr[2] || 'dsds'" :beforeImage="errorImage" :hasBorder="true"></findImg>
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
      img {
        width: 100%;
        height: 100%;
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
        errorImage: require('../../../images/famousbg.png')
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
