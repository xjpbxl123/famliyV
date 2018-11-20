<template>
  <div class="box">
    <div class="imgBox">
      <findImg :src="bookData.coverSmall" :text="bookData.name"></findImg>
    </div>
  </div>
</template>

<script>
  import findImg from '../common/find-img/find-img'
  export default {
    props: {
      bookData: {
        type: Object
      }
    },
    data () {
      return {
      }
    },
    created () {},
    components: {
      findImg
    }
  }
</script>

<style lang="scss" scoped>
.box {
  width: 250px;
  height: 360px;
  display: flex;
  background:rgba(255,255,255,0.1);
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  .imgBox {
    width: 220px;
    height: 300px;
    margin: 0 auto;
    margin-top: 11px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
      z-index: 100;
    }
  }
}
</style>
