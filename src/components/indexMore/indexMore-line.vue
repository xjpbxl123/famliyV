<template>
  <div class="line">
    <div v-text='name'></div>
    <div class="color"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: ['name']
  }
</script>
<style scoped lang="scss">
.line {
  display: flex;
  align-items: flex-end;
  div:nth-child(1) {
    color: #fff;
    font-size: 30px;
  }
  .color {
    width: 684px;
    height: 1px;
    margin-left: 12px;
    margin-bottom: 7px;
    background-image: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0.1)
    );
  }
}
</style>
