<template>
  <div class="container">
    <div class="title">
      <span class="current-month" v-text="month+'月'"></span>
      <span class="description">练琴日历</span>
    </div>
    <div class="content" :class="{'noActiva': !isActivation}">
      <ul>
        <li v-for="text in weekText" :key="text">
          <span v-text="text"></span>
        </li>
      </ul>
      <ul class="date-text" :class="{'noActiva': !isActivation}">
        <li v-for="(item,index) in placeHolderArr" :key="index">
          <span></span>
        </li>
        <li v-for="(date,index) in calendarData" :key="date.text" >
          <span v-text="date.date" :class="{'practiced': calendarData[index].practiced}"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'index-calendar',
    props: {
      setCalendarData: Function,
      isActivation: Boolean
    },
    data () {
      return {
        weekText: ['日', '一', '二', '三', '四', '五', '六'],
        month: '',
        calendarData: [],
        placeHolderArr: []
      }
    },
    computed: {

      ...mapState({
        playCalendar (state) {
          return state.storage.playCalendar
        },
        dateText (state) {
          let now = new Date()
          let day = now.getDate()
          let weekDay = new Date(now.setDate(1)).getDay() // 获取当前月的1号是星期几
          if (state.storage.playCalendar && state.storage.playCalendar[this.month]) {
            let placeholderDay = Array.from({ length: weekDay }).map(() => ({
              date: ''
            })) /// 生成日期占位符，用于对应星期几
            let playCalendar = [
              ...placeholderDay,
              ...state.storage.playCalendar[this.month]
            ]
            return playCalendar.map(value => {
              return {
                date: value.date,
                practiced: value.date > day - 1 /// 如果不是今天，设置为false ,即没有练习过
              }
            })
          }
          return []
        }
      })
    },
    watch: {
      playCalendar () {
        this.initCalender()
      }
    },
    methods: {
      /**
       *@desc 生成练琴日期
       * */
      generateDate () {
        let date = new Date()
        let dateText = []
        let totalDays = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate() // 获取当前月有多少天
        /// 生成当前月的所有日期以及是否练习
        while (totalDays--) {
          dateText.push({ date: totalDays + 1, practiced: false })
        }
        return dateText.reverse()
      },
      initCalender () {
        this.month = `${new Date().getMonth() + 1}`
        if (!this.playCalendar[this.month]) {
          let dateText = this.generateDate()
          this.calendarData = dateText
          this.setCalendarData({ [this.month]: dateText })
        } else {
          this.calendarData = this.playCalendar[this.month]
        }
        this.placeHolderArr = []
        let calDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        let calDayStr = calDay.getDay()
        for (let i = 0; i < calDayStr; i++) {
          this.placeHolderArr.push({text: ''})
        }
      }
    },
    created () {
      this.initCalender()
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  padding-left: 70px;
  text-align: left;
}

.title {
  padding-bottom: 10px;
  color: #fff;
}

.current-month {
  font-size: 50px;
  margin-left: 12px;
}

.description {
  font-size: 24px;
}

.content {
  @extend .title;
  font-size: 20px;
  &.noActiva {
    color: rgba(255,255,255,0.6)
  }
}

ul {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  li {
    display: inline-block;
    width: 40px;
    margin-right: 10px;
    text-align: center;
  }
}

.date-text {
  width: 96%;
  text-align: center;
  margin-top: 20px;
  li {
    margin-bottom: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    span.practiced {
      background: url('./images/calendar.png') 0 0 / cover no-repeat;
    }
  }
}
</style>
