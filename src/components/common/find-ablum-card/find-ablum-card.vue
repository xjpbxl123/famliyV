<template>
  <div class='find-ablum-card' :class="{active:select===index}">
    <img :src="ablum.shareCover" v-if="type===2" alt="" class="coverImg">
    <findAblumTitle :name="ablum.name"></findAblumTitle>
    <findAlbum :albumArr="ablum.bookCover" v-if="type!==2"></findAlbum>
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
    .coverImg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
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
</style>

<script>
  import findAlbum from 'components/common/find-Album/find-Album'
  import findAblumTitle from 'components/common/find-ablum-title/find-ablum-title'

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
      return {}
    },
    components: {
      findAlbum,
      findAblumTitle
    }
  }
</script>
