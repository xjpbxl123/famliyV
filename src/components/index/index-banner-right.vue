<template>
  <div class="banner-rights"  :class="{'rotate1': rightValue}">
      <div class="banner-right">
        <div class="banner-title">
          <div class="banner-title-right">
            <div class="animate"></div>
            <div class='near'>{{title}}</div>
          </div>
          <div class="right">
            <span v-text="timeData"></span>
            <span>
              <span v-text="mounthData"></span>
              <span v-text="dayData">星期一</span>
            </span>
          </div>
        </div>
        <div class="outBox">
          <div class="banner-list" :style="{'margin-top':rightTop+'px'}" v-if="rightType === 'recentOpen'">
            <div class="item-list" v-for="(data,index) in recentOpenList" :key="index" :class="{active:(index === rightSelectedIndex)}" @click="setRightSelect(index)">
              <div class="item-logo iconfont icon-song" :class="{'play': isPlayingMusicId===data.musicId && isPlaying && isPlayingType === rightType,'icon-playing':isPlayingMusicId===data.musicId && isPlaying && isPlayingType === 'recentOpen'}"></div>
              <div class="musicInfo">
                <div class="musicName">{{data.musicName || data.name}}</div>
                <div class="bookName">{{data.bookName}}</div>
              </div>
              <div class="styleType">{{data.styleName?data.styleName[0]:''}}</div>
            </div>
          </div>
          <div class="banner-list" :style="{'margin-top':rightTop+'px'}" v-else>
            <div class="item-list" v-for="(data,index) in collectList" :key="index" :class="{active:(index === rightSelectedIndex)}" @click="setRightSelect(index)">
              <div class="item-logo iconfont icon-song " :class="{'play': isPlayingMusicId===data.musicId && isPlaying && isPlayingType === rightType,'icon-playing':isPlayingMusicId===data.musicId && isPlaying && isPlayingType === 'myCollect'}"></div>
              <div class="musicInfo">
                <div class="musicName">{{data.musicName || data.name}}</div>
                <div class="bookName">{{data.bookName}}</div>
              </div>
              <div class="styleType">{{data.styleName?data.styleName[0]:''}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {padStart} from 'lodash'
  export default {
    props: {
      recentOpenList: {
        type: Array
      },
      collectList: {
        type: Array
      },
      rightType: {
        type: String
      },
      rightSelectedIndex: {
        type: Number
      },
      isPlayingMusicId: {
        type: Number
      },
      isPlaying: {
        type: Boolean
      },
      setRightSelect: {
        type: Function
      },
      isPlayingType: {
        type: String
      }
    },
    watch: {
      rightSelectedIndex (value, oldValue) {
        // 控制列表位置
        console.log(value)
        let rightData = []
        this.rightType === 'recentOpen' ? rightData = this.recentOpenList : rightData = this.collectList
        let height = value * 120 * -1
        if (value < oldValue) {
          // up
          if (value <= 0) {
            this.rightTop = 0
          }
          if (this.rightTop - height < 120) {
            this.rightTop = height
          }
        } else if (value > oldValue) {
          // down
          if (value >= 7 && value < rightData.length) {
            if (parseInt(this.rightTop) - height > 120 * 6) {
              this.rightTop = (value - 6) * 120 * -1
            }
          }
        }
      },
      rightType (value, oldValue) {
        this.rightValue = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.rightValue = false
        }, 1000)
        console.log(value)
        if (value === 'recentOpen') {
          this.title = '最近打开'
        } else if (value === 'myCollect') {
          this.title = '我的收藏'
        }
      }
    },
    data () {
      return {
        timeId: null,
        timeData: '22:22',
        mounthData: '4月16日',
        lateMinute: -1,
        dayData: '三',
        rightTop: 0,
        title: '',
        rightValue: false,
        timer: null
      }
    },
    methods: {
      getTime () {
        this.timeId = setInterval(() => {
          this.getDate()
          this.lateMinute--
          if (this.lateMinute === 0) {
            this.getDays()
          }
          clearInterval(this.timeId)
        }, 60000)
      },
      getDate () {
        let t = new Date()
        this.timeData =
          padStart(t.getHours().toString(), 2, '0') + ':' +
          padStart(t.getMinutes().toString(), 2, '0')
        this.getTime()
      },
      getDays () {
        let t = new Date()
        this.lateMinute = 24 * 60 - (t.getHours() * 60 + t.getMinutes() - 1)
        this.mounthData = t.getMonth() + 1 + '月' + t.getDate() + '日'
        switch (t.getDay()) {
          case 0:
            this.dayData = '星期天'
            break
          case 1:
            this.dayData = '星期一'
            break
          case 2:
            this.dayData = '星期二'
            break
          case 3:
            this.dayData = '星期三'
            break
          case 4:
            this.dayData = '星期四'
            break
          case 5:
            this.dayData = '星期五'
            break
          case 6:
            this.dayData = '星期六'
            break
        }
      },
      allTime () {
        this.getDays()
        this.getDate()
      }
    },
    created () {
      this.allTime()
      if (this.rightType === 'recentOpen') {
        this.title = '最近打开'
      } else if (this.rightType === 'myCollect') {
        this.title = '我的收藏'
      }
      if (this.rightSelectedIndex >= 7) {
        this.rightTop = (this.rightSelectedIndex - 6) * 120 * -1
      }
    },
    destroyed () {
      clearInterval(this.timeId)
      clearTimeout(this.timer)
      this.timeId = null
    }
  }
</script>

<style scoped lang="scss">
@keyframes bgrepeat {
  0% {
    background-position-x: 0%;
  }
  50% {
    background-position-x: 50%;
  }
  100% {
    background-position-x: 100%;
  }
}
@keyframes turn {
  from {transform:rotate(0deg)}
  to {transform:rotate(360deg)}
}

.banner-rights {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  position: relative;
  top: 0;
  &.rotate1 {
    transform-origin: center;
    animation: turn1 1s linear 0s 1;
  }
}
.banner-right {
  width: 608px;
  height: 1040px;
  margin-top: 40px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
}
.banner-title {
  display: flex;
  height: 122px;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 37px;
  & > div {
    display: flex;
  }
  .banner-title-right {
    align-items: center;

  }
  .right {
    flex-direction: column;
    & > span:nth-child(1) {
      font-size: 65px;
      line-height: 48px;
      color: #ffffff;
      margin-top: 24px;
    }
    & > span:nth-child(2) {
      font-size: 20px;
      color: #fff;
      font-weight: 900;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      span:nth-child(1) {
        margin-right: 10px;
      }
    }
    span {
      display: flex;
    }
  }
  .near {
    font-size: 34px;
    color: #fff;
    margin-top: 36px;
  }
  .animate {
    margin-right: 50px;
    width: 40px;
    height: 40px;
    background: url(./images/icon_nearly_right.png) no-repeat;
    background-size: 200% 100%;
    animation: bgrepeat 2s linear 0s infinite alternate;
    margin-top: 36px;
  }
}

.outBox {
  height: 840px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 122px;
  right: 0;
  transition: all 1s ease;
  .banner-list {
    align-items: center;
    .item-list {
      height: 120px;
      color: #FFF;
      position: relative;
      border-width: 0;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0)) 30 30;
      &.active {
        background-image: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, .3),
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0));
      }
      .item-logo {
        font-size: 42px;
        color: #fff;
        position: absolute;
        top: 40px;
        left: 25px;
        transform: translate3d(0,0,0);
        &.play {
          animation:turn 2s infinite linear;
        }
      }
      .musicInfo {
        width: 380px;
        height: 100%;
        box-sizing: border-box;
        padding-top: 30px;
        position: absolute;
        left: 96px;
        .musicName {
          width: 100%;
          font-size: 28px;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          overflow: hidden;
        }
        .bookName {
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          opacity: 0.5;
          font-size: 22px;
          margin-top: 12px;
          overflow: hidden;
        }
      }
      .styleType {
          position: absolute;
          top:50%;
          transform: translate3d(0,-50%,0);
          width: 140px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          left: 480px;
          opacity: 0.55;
          font-size: 22px;
        }
    }

  }
}

@keyframes turn1 {
    0% {
        transform: rotateY(0deg);
    }

    49.9% {
        transform: rotateY(90deg);
    }

    50% {
        transform: rotateY(-90deg);
    }

    100% {
        transform: rotateY(0deg);
    }
}
</style>
