<template>
    <div class="star">
        <div class="star-full iconfont icon-star-full" v-for="(num) in parseInt(starNum)" :key="num"></div>
        <div class="star-empty iconfont icon-star-empty" v-for="(num) in parseInt(5-starNum)"
                 :key="num+7"></div>
    </div>

</template>
<style lang="scss" scope type=text/scss>
    .star-full {
        font-size: 22px;
        transform: rotateZ(-45deg);
        color: #fff;
        margin-right: 8px;
    }

    .star-empty {
        font-size: 22px;
        transform: rotateZ(-45deg);
        color: #fff;
        margin-right: 8px;
    }
</style>
<script type="es6">
  export default {
    name: 'find-star',
    props: {
      starNum: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    data () {
      return {}
    },
    method: {},
    created () {
      console.log(this.starNum, 'starNum')
    }
  }
</script>
