<template>
  <div class="box">
    <img :src="bookData.coverSmall" alt="">
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
      return {}
    },
    created () {}
  }
</script>

<style lang="scss" scoped>
.box {
  width: 230px;
  height: 324px;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    box-shadow: 0 22px 24px rgba(0, 0, 0, 0.5);
  }
}
</style>
