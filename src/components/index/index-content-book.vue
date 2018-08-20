<template>
  <div class="box">
    <span v-text="bookData.name"></span>
    <findImg :src="bookData.coverSmall" ></findImg>
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
