<template>
    <div class="star">
        <div v-if="parseInt(type) === 2 && (typeof grade) === 'number'">
          <div class="eachStar star-full iconfont icon-star-full" v-for="(num) in Math.floor((grade+1)/2)" :key="num"></div>
          <div class="eachStar star-half" v-if="grade%2 === 0"></div>
          <div  v-if="grade%2 === 0" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in Math.abs(5 - Math.floor((grade+1)/2))" :key="num+7"></div>
          <div v-if="grade%2 !== 0 && parseInt(grade) !== 11" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in 6 - Math.floor((grade+1)/2)" :key="num+7"></div>
        </div>
        <div v-if="parseInt(type) === 2 && typeof grade !== 'number' && starNum !== 0">
          <div class="eachStar star-full iconfont icon-star-full" v-for="(num) in Math.floor((comNum+1)/2)" :key="num"></div>
          <div class="eachStar star-half" v-if="comNum%2 === 0"></div>
          <div  v-if="comNum%2 === 0" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in Math.abs(5 - Math.floor((comNum+1)/2))" :key="num+7"></div>
          <div v-if="comNum%2 !== 0" class="eachStar star-empty iconfont icon-star-empty" v-for="(num) in 6 - Math.floor((comNum+1)/2)" :key="num+7"></div>
        </div>
        <div v-if="parseInt(type) === 1 && starNum !== 0">
          <div class="eachStar star-full yinfu iconfont icon-popmusic_LV" v-for="(num) in parseInt(starNum)" :key="num"></div>
          <div class="eachStar star-empty iconfont icon-popmusic_LV" v-for="(num) in parseInt(5-starNum)"
                 :key="num+7"></div>
        </div>
        <div class="noGrade" v-if="!grade && starNum === 0">-未分级-</div>
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
    .noGrade {
      width: 100%;
      font-size: 22px;
      text-align: center;
    }
</style>
<script type="es6">
  const starData = {
    1: 0,
    2: 3,
    3: 7,
    4: 10,
    5: 11
  }
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
      }
    },
    data () {
      return {
        comNum: 0
      }
    },
    watch: {
      starNum (value) {
        this.comNum = starData[value]
      }
    },
    method: {},
    created () {
      this.comNum = starData[this.starNum]
    }
  }
</script>
