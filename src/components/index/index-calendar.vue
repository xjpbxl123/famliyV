<template>
  <div class="container">
    <div class="title">
      <span class="current-month" v-text="month+'月'"></span>
      <span class="description">练琴日历</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="text in weekText" :key="text">
          <span v-text="text"></span>
        </li>
      </ul>
      <ul class="date-text">
        <li v-for="date in dateText" :key="date.text">
          <span v-text="date.date"></span>
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
      setCalendarData: Function
    },
    data () {
      return {
        weekText: ['日', '一', '二', '三', '四', '五', '六'],
        month: ''
      }
    },
    computed: mapState({
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
    }),
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
      }
    },
    created () {
      this.month = `${new Date().getMonth() + 1}`
      let { storage } = this.$store.state
      if (!storage.playCalendar[this.month]) {
        let dateText = this.generateDate()
        this.setCalendarData({ [this.month]: dateText })
      }
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
}

.description {
  font-size: 24px;
}

.content {
  @extend .title;
  font-size: 20px;
}

ul {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  li {
    display: inline-block;
    width: 20px;
    margin-right: 30px;
  }
}

.date-text {
  width: 96%;
  text-align: center;
  margin-top: 20px;
  li {
    margin-bottom: 20px;
  }
}
</style>
