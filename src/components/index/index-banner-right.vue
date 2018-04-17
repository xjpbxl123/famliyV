<template>
  <div class="banner-rights">
      <div class="banner-right">
        <div class="banner-title">
          <div class="banner-title-right">
            <div class="animate"></div>
            <div class='near'>最近打开</div>
          </div>
          <div class="right">
            <span v-text="timeData"></span>
            <span>
              <span v-text="mounthData"></span>
              <span v-text="dayData">星期一</span>
            </span>
          </div>
        </div>
        <div class="banner-list">
          <div>
            <div class="top">第一级 01.G大调钢琴小曲</div>
            <div class="bottom">上海音乐学院钢琴考级名师讲解</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        timeData: '22:22',
        mounthData: '4月16日',
        lateMinute: -1,
        dayData: '三'
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
.banner-rights {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.banner-right {
  width: 688px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
}
.banner-title {
  display: flex;
  height: 142px;
  margin-top: 37px;
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
    }
    & > span:nth-child(2) {
      font-size: 20px;
      color: #fff;
      font-weight: 900;
      display: flex;
      justify-content: center;
      p:nth-child(1) {
        margin-right: 6px;
      }
    }
    span {
      display: flex;
    }
  }
  .near {
    font-size: 34px;
    color: #fff;
  }
  .animate {
    margin-right: 50px;
    width: 40px;
    height: 40px;
    background: url(./images/icon_nearly_right.png) no-repeat;
    background-size: 200% 100%;
    animation: bgrepeat 2s linear 0s infinite alternate;
  }
}

.banner-list {
  display: flex;
  height: 120px;
  background-image: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0)
  );
  align-items: center;
  &::before {
    display: inline-block;
    content: "";
    background: url("./images/icon_music_right.png") no-repeat center;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    margin-left: 30px;
    margin-right: 27px;
  }
  .top {
    font-size: 30px;
    color: #fff;
  }
  .bottom {
    font-size: 24px;
    opacity: 0.55;
    margin-top: 10px;
    color: #fff;
  }
}
</style>
