<template>
    <div class="star">
        <div v-if="type === 2">
          <div class="eachStar star-full iconfont icon-star-full" v-for="(num) in Math.floor((starNum+1)/2)" :key="num"></div>
          <div class="eachStar star-half" v-if="starNum%2 === 0"></div>
          <div v-if="starNum%2 === 0" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in 5 - Math.floor((starNum+1)/2)" :key="num+7"></div>
          <div v-if="starNum%2 !== 0" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in 6 - Math.floor((starNum+1)/2)" :key="num+7"></div>
        </div>
        <div v-else>
          <div class="eachStar star-full yinfu iconfont icon-popmusic_LV" v-for="(num) in parseInt(starNum)" :key="num"></div>
          <div class="eachStar star-empty iconfont icon-popmusic_LV" v-for="(num) in parseInt(5-starNum)"
                 :key="num+7"></div>
        </div>
    </div>
</template>
<style lang="scss" scope type=text/scss>
    .star > div {
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
    .star-half {
      width: 23px;
      height: 23px;
      margin-right: 8px;
      background: url('./images/half-star.png') no-repeat;
      background-size: cover;
    }
    .yinfu {
      color:rgba(255,180,0,1);
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
      },
      grade: {
        type: Number
      },
      type: {
        type: Number
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
