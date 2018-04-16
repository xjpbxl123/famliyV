<template>
  <div class="box">
    <div class="box-left">
      <contentLine :name="'热门歌曲'"></contentLine>
      <div class="book-content">
        <div :class="{marginNone:(index==3)}" v-for="(data,index) in recentBooks.bookList" :key="index">
          <contentBook :bookData="data"></contentBook>
          <div class="star">
            <div class="star-full iconfont icon-star-full" v-for="(num) in parseInt(data.starNum)" :key="num"></div>
            <div class="star-empty iconfont icon-star-empty" v-for="(nums) in parseInt(5-data.starNum)" :key="nums+7"></div>
          </div>
          <div class="slip-line"></div>
          <div class="date">{{ data.time | format}}</div>
        </div>
        <div class="marginNone">
          <contentBook :bookData="moreData"></contentBook>
        </div>
      </div>
    </div>

    <div class="box-right">
      <contentLine :name="'热门曲谱'"></contentLine>
      <div class="book-content">
        <div :class="{marginNone:(index==2)}" v-for="(data,index) in hotBooks.bookList" :key="index">
          <contentBook :bookData="data"></contentBook>
          <div class="star">
            <div class="star-full iconfont icon-star-full" v-for="(num) in parseInt(data.starNum)" :key="num"></div>
            <div class="star-empty iconfont icon-star-empty" v-for="(nums) in parseInt(5-data.starNum)" :key="nums+7"></div>
          </div>
          <div class="slip-line"></div>
          <div class="date">{{ data.time | format}}</div>
        </div>
        <div class="marginNone">
          <contentBook :bookData="moreData"></contentBook>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import contentBook from './index-content-book'
  import contentLine from './index-content-line'
  import { formatDate } from 'scripts/utils/index'
  export default {
    props: {
      recentBooks: {
        type: Object
      },
      hotBooks: {
        type: Object
      }
    },
    components: {
      contentBook,
      contentLine
    },
    data () {
      return {
        moreData: {
          coverSmall: require('./images/more.png')
        }
      }
    },
    filters: {
      format (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'yyyy-MM-dd')
      }
    },
    created () {
      console.dir(this.recentBooks)
      setTimeout(() => {
        console.dir(this.hotBooks)
      }, 3000)
    }
  }
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  div {
    display: flex;
    &.box-left,
    &.box-right {
      height: 80%;
      width: 1393px;
      display: flex;
      padding-left: 104px;
      padding-top: 23px;
      flex-direction: column;
      .book-content {
        margin-top: 45px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        & > div {
          margin-right: 118px;
          display: flex;
          flex-direction: column;
          margin-bottom: 7px;
          .star {
            display: flex;
            justify-content: center;
            margin-top: 15px;
          }
          .date {
            font-size: 22px;
            color: #fff;
            font-weight: 900;
            text-align: center;
            display: inline-block;
            margin-top: 10px;
          }
        }
        .marginNone {
          margin-right: 0;
        }
      }
    }
  }
  .box-right {
    width: 1200px !important;
  }
}
.star-full {
  font-size: 22px;
  transform: rotateZ(-45deg);
  color: #fff;
  margin-right: 8px;
}
.icon-star-full:before {
  content: "\e64b";
}
.star-empty {
  font-size: 22px;
  transform: rotateZ(-45deg);
  color: #fff;
  margin-right: 8px;
}
.icon-star-empty:before {
  content: "\e628";
}
.slip-line {
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-image: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    )
    30 30;
}
</style>
