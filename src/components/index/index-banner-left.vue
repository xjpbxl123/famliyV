<template>
  <div class="banner-left">
    <i class="iconfont icon-logo"></i>
    <div class="user-status hide" :class="{show:isSynced}">
      <div v-if="!isLogin">
        <div class="qr-code">
          <qr-code ref="qrCode" :sessionId="sessionId"/>
        </div>
        <span class="scan">扫描二维码登录</span>
      </div>
      <div v-else>
        <findImg class="avatar" :src="userInfo.imageUrl" :beforeImage="adminUrl" :errorImage="adminUrl" :borderRadius= "true" ></findImg>
        <span class="nick-name" v-text="nickName || ''"></span>
      </div>
      <calendar :setCalendarData="setCalendarData" :isActivation="isActivation" v-if="isCalendar" />
      <div v-if="!isCalendar" :class="{'noActiva': !isActivation}" class="userData">
        <div class="used-time">
          <div>
            <i class="iconfont icon-period"></i>
            <span class="text">累计使用</span>
          </div>
          <span class="time" v-text="isActivation?usedTime.usedTime:'--'"></span>
        </div>
        <div class="auto-play-time">
          <div>
            <i class="iconfont icon-auto-play"></i>
            <span class="text">自动弹奏时间</span>
          </div>
          <span class="time" v-text="isActivation?usedTime.autoPlayerTime:'--'"></span>
        </div>
        <div class="rate-play-time">
          <div>
            <i class="iconfont icon-period"></i>
            <span class="text">带评分弹奏</span>
          </div>
          <span class="time" v-text="isActivation?usedTime.ratePlayMoment:'--'"></span>
        </div>
      </div>
      <div class="noActive" v-if="!isActivation">*请在"设置 - 其他设置"中激活</div>
    </div>
  </div>
</template>

<script>
  import qrCode from './index-qrcode'
  import calendar from './index-calendar'
  import findImg from '../common/find-img/find-img'
  import {checkMobile} from '../../scripts/utils'
  export default {
    name: 'index-banner-left',
    props: {
      setCalendarData: Function,
      sessionId: String,
      isSynced: Boolean,
      isLogin: Boolean,
      userInfo: Object,
      usedTime: Object,
      getUserInfo: Function,
      isActivation: Boolean,
      isCalendar: Boolean
    },
    data () {
      return {
        adminUrl: require('./images/admin.png'),
        interval: null,
        nickName: ''
      }
    },
    watch: {
      sessionId () {
        if (!this.isLogin) {
          this.generateQrCode()
        }
      },
      userInfo (value) {
        if (checkMobile(value.nickName)) {
          // 如果用户名是手机号码 隐藏中间四位
          let first = value.nickName.slice(0, 3)
          let last = value.nickName.slice(7, 11)
          this.nickName = first + '****' + last
        } else {
          this.nickName = value.nickName || ''
        }
      }
    },
    methods: {
      generateQrCode () {
        if (this.$refs.qrCode) {
          this.$refs.qrCode.generateQrCode({width: 180}).then(() => {
            clearInterval(this.interval)
            this.interval = window.setInterval(() => {
              this.getUserInfo().then(res => {
                if (res.userInfo.userId) {
                  clearInterval(window.interval)
                }
              })
            }, 2000)
          })
        }
      }
    },
    mounted () {
      this.generateQrCode()
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    components: {
      qrCode,
      calendar,
      findImg
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .banner-left {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: 470px;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.1);
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
    position: relative;
    height: 100%;
    .noActive {
      width: 100%;
      font-size: 14px;
      text-align: center;
      font-family: MicrosoftYaHei;
      color: hsla(0,0%,100%,.6);
      position: absolute;
      bottom: 110px;
      left: 0;
    }

  }

  .avatar {
    width: 163px !important;
    margin: 0 auto;
    height: 163px !important;
    img {
       border-radius: 50% !important;
    }
  }

  .scan,
  .nick-name {
    display: inline-block;
    margin-top: 20px;
    font-size: 26px;
    color: #fff;
  }
  .userData {
    color: rgba(255,255,255,1) !important;
    &.noActiva {
      color: rgba(255,255,255,0.6) !important;
    }
  }

  .auto-play-time,
  .used-time,
  .rate-play-time {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 24px auto 0 auto;
    border-width: 0px;
    border-bottom: 1px solid;
    border-image: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
    ) 30 30;
    width: 256px;
    height: 80px;
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
