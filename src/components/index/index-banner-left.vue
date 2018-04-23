<template>
  <div class="banner-left">
    <i class="iconfont icon-logo"></i>
    <div class="user-status hide" :class="{show:isSynced}">
      <div v-if="!isLogin">
        <div class="qr-code">
          <qr-code ref="qrCode" :sessionId="sessionId"/>
        </div>
        <span class="scan">扫我一下</span>
        <calendar :setCalendarData="setCalendarData"/>
      </div>
      <div v-else>
        <div>
          <img class="avatar" :src="userInfo.imageUrl" alt="">
        </div>
        <span class="nick-name" v-text="userInfo.nickName"></span>
        <div class="used-time">
          <div>
            <i class="iconfont icon-period"></i>
            <span class="text">累计使用</span>
          </div>
          <span class="time" v-text="usedTime.usedTime"></span>
        </div>
        <div class="auto-play-time">
          <div>
            <i class="iconfont icon-auto-play"></i>
            <span class="text">自动弹奏时间</span>
          </div>
          <span class="time" v-text="usedTime.autoPlayerTime"></span>
        </div>
        <div class="rate-play-time">
          <div>
            <i class="iconfont icon-period"></i>
            <span class="text">带评分弹奏</span>
          </div>
          <span class="time" v-text="usedTime.ratePlayMoment"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qrCode from './index-qrcode'
  import calendar from './index-calendar'

  export default {
    name: 'index-banner-left',
    props: {
      setCalendarData: Function,
      sessionId: String,
      isSynced: Boolean,
      isLogin: Boolean,
      userInfo: Object,
      usedTime: Object,
      dispatch: Function
    },
    data () {
      return {}
    },
    watch: {
      sessionId () {
        this.$nextTick(() => {
          this.$refs.qrCode && this.$refs.qrCode.generateQrCode({width: 180})
        })
      }
    },
    components: {
      qrCode,
      calendar
    }
  }
</script>

<style lang="scss" scoped>
  .banner-left {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: 470px;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .hide {
    display: none;
    &.show {
      display: block;
    }
  }

  .icon-logo {
    height: 45px;
    font-size: 146px;
    color: #fff;
  }

  .user-status {
    padding-top: 110px;
  }

  .avatar {
    width: 163px;
    height: 163px;
    border-radius: 50%;
  }

  .scan,
  .nick-name {
    display: inline-block;
    margin-top: 10px;
    font-size: 26px;
    color: #fff;
  }

  .auto-play-time,
  .used-time,
  .rate-play-time {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 24px auto 0 auto;
    border-bottom: 1px solid;
    border-image: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
    ) 30 30;
    width: 256px;
    height: 80px;
    color: #fff;
    > div {
      display: flex;
      flex-direction: column;
    }
    i {
      font-size: 42px;
    }
    .text {
      font-size: 18px;
    }
    .time {
      font-size: 28px;
    }
  }

  .used-time {
    margin-top: 116px;
  }

  .auto-play-time,
  .rate-play-time {
    > div {
      margin-left: -18px;
    }
  }
</style>
