<template>
    <div class="star">
        <div class="eachStar star-full iconfont icon-star-full" v-for="(num) in parseInt(starNum)" :key="num"></div>
        <div class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in parseInt(5-starNum)"
                 :key="num+7"></div>
    </div>

</template>
<style lang="scss" scope type=text/scss>
    .star {
     display: flex;
    }

    .star-full {
        font-size: 22px;
        margin-right: 8px;
        color:rgba(255,180,0,1);
    }

    .star-empty {
        font-size: 22px;
        color: #fff;
        margin-right: 8px;
        color:rgba(255,255,255,0.4);
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
    }
  }
</script>
