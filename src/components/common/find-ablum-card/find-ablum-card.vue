<template>
  <div class='find-ablum-card'>
    <findAblumTitle></findAblumTitle>
    <findAlbum :albumArr="ablumArr"></findAlbum>
  </div>
</template>
<style lang=scss scope type=text/scss>
  .find-ablum-card {
    width: 800px;
    height: 330px;
    background: url("./bg_qupuxilie.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: flex;
    position: relative;
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
      ablumArr: Object
    },
    data () {
      return {
      }
    },
    components: {
      findAlbum,
      findAblumTitle
    }
  }
</script>
