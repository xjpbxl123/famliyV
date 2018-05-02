<template>
  <div class="box">
    <span>{{bookData.name}}</span>
    <img :src="bookData.coverSmall" alt="" :onerror="imgError" >
  </div>
</template>

<script>
  export default {
    props: {
      bookData: {

        type: Object
      }
    },
    data () {
      return {
        imgError: 'this.src="' + require('./images/default.jpg') + '"'
      }
    },
    created () {}
  }
</script>

<style lang="scss" scoped>
.box {
  width: 230px;
  height: 324px;
  display: flex;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    box-shadow: 0 22px 24px rgba(0, 0, 0, 0.5);
  }
  span {
    position: absolute;
    top: 58%;
    color: #fff;
    font-size: 20px;
    width: 80%;
    text-align: center;
    left: 10%;
  }
}
</style>
