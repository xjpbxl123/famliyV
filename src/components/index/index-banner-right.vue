<template>
  <div class="banner-rights">
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
            <div class="item-list" v-for="(data,index) in recentOpenList" :key="index" :class="{active:(index === rightSelectedIndex)}" >
              <div class="item-logo iconfont icon-song" :class="{'play': isPlayingMusicId===data.musicId && isPlaying,'icon-playing':isPlayingMusicId===data.musicId && isPlaying}"></div>
              <div class="musicInfo">
                <div class="musicName">{{data.musicName || data.name}}</div>
                <div class="bookName">{{data.bookName}}</div>
              </div>
              <div class="styleType">{{data.styleName?data.styleName[0]:''}}</div>
            </div>
          </div>
          <div class="banner-list" :style="{'margin-top':rightTop+'px'}" v-else>
            <div class="item-list" v-for="(data,index) in collectList" :key="index" :class="{active:(index === rightSelectedIndex)}" >
              <div class="item-logo iconfont icon-song " :class="{'play': isPlayingMusicId===data.musicId && isPlaying,'icon-playing':isPlayingMusicId===data.musicId && isPlaying}"></div>
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
        timeData: '22:22',
        mounthData: '4月16日',
        lateMinute: -1,
        dayData: '三',
        rightTop: 0,
        title: ''
      }
    },
    methods: {
      getTime () {
        let timeId = setTimeout(() => {
          this.getDate()
          this.lateMinute--
          if (this.lateMinute === 0) {
            this.getDays()
          }
          clearTimeout(timeId)
        }, 60000)
      },
      getDate () {
        let t = new Date()
        this.timeData =
          t
            .getHours()
            .toString()
          .padStart(2, '0') +
          ':' +
          t
            .getMinutes()
            .toString()
            .padStart(2, '0')
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
}
.banner-right {
  width: 688px;
  height: 1040px;
  margin-top: 40px;
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
  overflow: hidden;
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
        left: 35px;
        &.play {
          animation:turn 2s infinite linear;
        }
      }
      .musicInfo {
        width: 406px;
        height: 100%;
        box-sizing: border-box;
        padding-top: 30px;
        position: absolute;
        left: 106px;
        .musicName {
          width: 100%;
          font-size: 30px;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          overflow: hidden;
        }
        .bookName {
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          opacity: 0.5;
          font-size: 24px;
          margin-top: 12px;
          overflow: hidden;
        }
      }
      .styleType {
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          right: 40px;
          opacity: 0.55;
          font-size: 24px;
        }

    }

  }
}
</style>
