<template>
  <div class="container">
    <div class="title">
      <span class="current-month" v-text="month+'月'"></span>
      <span class="description">练琴日历</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="text in weekText"  :key="text">
          <span v-text="text"></span>
        </li>
      </ul>
      <ul class="date-text">
        <li v-for="text in dateText" :key="text">
          <span v-text="text"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index-calendar',
    data () {
      return {
        weekText: ['日', '一', '二', '三', '四', '五', '六'],
        dateText: [],
        month: ''
      }
    },
    methods: {
      /**
       *@desc 生成练琴日期
       * */
      generateDate () {
        let date = new Date()
        let totalDays = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate() // 获取当前月有多少天
        this.month = `${date.getMonth() + 1}`
        /// 生成当前月的所有日期
        while (totalDays--) {
          this.dateText.push(totalDays + 1)
        }
        this.dateText.reverse()
      }
    },
    created () {
      this.generateDate()
      this.$store.dispatch('setNativeStorage', {
        playCalendar: { [this.month]: this.dateText }
      })
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 64px;
  padding-left: 35px;
  text-align: left;
}
.title {
  color: #fff;
}
.current-month {
  font-size: 25px;
}
.description {
  font-size: 12px;
}
.content {
  @extend .title;
  font-size: 10px;
}
ul {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  li {
    display: inline-block;
    width: 10px;
    margin-right: 15px;
  }
}
.date-text {
  width: 96%;
  text-align: center;
  li {
    margin-bottom: 10px;
  }
}
</style>
