<template>
  <div class='find-ablum-card'  :class="{active:select === index&&type !== 2, styleActive:select===index&&type === 2,type2: type===2}">
    <findImg :src="ablum.cover" v-if="type === 2" alt="" class="coverImg" :beforeImage="defaultImg" :errorImage="defaultImg"></findImg>
    <findAblumTitle :name="ablum.name" class="white" :isActive="select === index"></findAblumTitle>
    <findAlbum :albumArr="ablum.bookCover" v-if="type !== 2"></findAlbum>
  </div>
</template>
<style lang=scss scoped type=text/scss>
  .find-ablum-card {
    width: 800px;
    height: 330px;
    background: url("./bg_qupuxilie.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: flex;
    position: relative;
    &.active{
      background: url("./bg_qupuxilie_choose.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    &.styleActive{
      background: url("./bg_bgchoose.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      border: 6px solid #A6FFFA;
    }
    .coverImg{
      width: 364px;
      height: 266px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 69px;
    }

    ul {
      position: absolute;
      height: 246px;
      right: 70px;
      top: 42px;
    }
    .find-ablum-title {
      position: absolute;
      left: 40px;
      top: 115px;
    }
  }
  .type2{
    background: url("./bg_normal.png") no-repeat;
  }
</style>

<script>
  import findAlbum from 'components/common/find-Album/find-Album'
  import findAblumTitle from 'components/common/find-ablum-title/find-ablum-title'
  import findImg from '../find-img/find-img'
  export default {
    name: 'popular',
    props: {
      ablum: Object,
      index: Number,
      select: {
        type: Number,
        default: () => {
          return 0
        }
      },
      type: Number
    },
    data () {
      return {
        defaultImg: require('../../popular/images/pic_books_nomal.png')
      }
    },
    components: {
      findAlbum,
      findAblumTitle,
      findImg
    }
  }
</script>
