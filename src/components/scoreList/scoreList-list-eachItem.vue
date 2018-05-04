<template>
    <li :class="{active:(index===scoreIndex)}">
        <span class="price sales" v-if="music.sales">限时免费</span>
        <span class="price free" v-else-if="music.isFree">免费</span>
        <span class="price hasBought" v-else-if="music.have.base">已购买</span>
        <span class="price buy" v-else>{{music.payment}}</span>
        <span class="video iconfont icon-with-video"></span>
        <span class="viewNumIcon iconfont icon-popularity"></span>
        <span class="viewNum">{{music.hotNum}}+</span>
        <span class="musicName">{{music.name}}</span>
        <span class="new">new</span>
    </li>
</template>
<script type="text/javascript">
  export default {
    props: {
      index: {
        type: Number,
        default: () => (0)
      },
      data: {
        type: Object,
        default: () => ({})
      },
      scoreIndex: {
        type: Number,
        default: () => (0)
      }
    },
    data () {
      return {
        music: []
      }
    },
    methods: {
    },
    created () {
      let value = this.data
      this.music = this.data
      let payment = ''
      let subParts = {base: '0', accompany: '0', video: '0'}
      if (!value.isFree && !value.sales && !value.have.base) {
        // 需要购买
        let money = 0
        if (value.have.base !== undefined && value.price.base) {
          subParts.base = '1'
          money += value.price.base
        }
        if (value.have.accompany === undefined && value.price.accompany) {
          subParts.accompany = '1'
          money += value.price.accompany
        }
        if (value.have.video === undefined && value.price.video) {
          subParts.video = '1'
          money += value.price.video
        }
        payment = '￥' + money
      }
      this.music.payment = payment
      this.music.subParts = subParts
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  li {
      width: 100%;
      height: 78px;
      position: relative;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      transition: all 0.2s ease;
      box-sizing: border-box;
      border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,1),rgba(255,255,255,0)) 30 30;
      &.active {
        background-image: -webkit-linear-gradient(left,rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.3));
      }
      .price {
          position: absolute;
          left: 154px;
          top: 50%;
          transform: translateY(-50%);
          width: 90px;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          background: #d9a122;
          border-radius: 16px;
          font-weight: 600;
          text-align: center;
          &.buy {
              background: #33b759;
          }
      }
      .video {
          font-size: 42px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 306px;
          color: #fff;
      }
      .viewNumIcon {
          font-size: 32px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 387px;
          color: #fff;
      }
      .viewNum {
          font-size: 20px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
          left: 428px;
          font-weight: 600;
        }
      .musicName {
          position: absolute;
          width: 410px;
          text-align: right;
          height: 78px;
          line-height: 78px;
          right: 43px;
          top: 0;
          font-size: 26px;
          font-weight: 600;
          color: #fff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
      }
      .new {
          position: absolute;
          width: 40px;
          height: 17px;
          background-color: #d53778;
          border-radius: 15px;
          line-height: 15px;
          text-align: center;
          font-size: 12px;
          right: 4px;
          color: #fff;
          top: 2px;
          font-weight: 600;
      }
  }
</style>
