<template>
  <div class="box">
    <div class="box-left">
      <contentLine name="最近更新"/>
      <div class="book-content">
        <div :class="{'margin-none':(index===3)}" v-for="(data,index) in recentBooks.bookList" :key="index">
          <contentBook :bookData="data" :class="{active:(index===selectedIndex)}"/>
          <findStar :starNum="data.starNum"/>
          <div class="slip-line"></div>
          <div class="date">{{ data.time | format}}</div>
        </div>
        <div class="margin-none">
          <contentBook :bookData="moreData" :class="{active:(recentMoreindex===selectedIndex)}"/>
        </div>
      </div>
    </div>
    <div class="box-right">
      <contentLine name="热门曲谱"/>
      <div class="book-content">
        <div :class="{'margin-none':(index===2)}" v-for="(data,index) in hotBooks.bookList" :key="index">
          <contentBook :bookData="data" :class="{active:(hotbookIndex+index)===selectedIndex}"/>
          <findStar :starNum="data.starNum"/>
          <div class="slip-line"></div>
          <div class="date">
            <span class="viewIcon iconfont icon-popularity"></span>
            <span>{{ data.hotNum }}</span>

          </div>
        </div>
        <div class="margin-none">
          <contentBook :bookData="moreData" :class="{active:(hotMoreindex===selectedIndex)}"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import contentBook from './index-content-book'
  import contentLine from './index-content-line'
  import { formatDate } from 'scripts/utils/index'
  import findStar from '../common/find-star/find-star'
  export default {
    props: {
      recentBooks: {
        type: Object,
        default: () => {
          return {bookList: []}
        }
      },
      hotBooks: {
        type: Object,
        default: () => {
          return {bookList: []}
        }
      },
      selectedIndex: {
        type: Number
      },
      endIndex: {
        type: Number
      }
    },
    components: {
      contentBook,
      contentLine,
      findStar
    },
    data () {
      return {
        moreData: {
          coverSmall: require('./images/more.png')
        },
        recentMoreindex: -1,
        hotMoreindex: -1,
        hotbookIndex: -1
      }
    },
    filters: {
      format (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'yyyy-MM-dd')
      }
    },
    watch: {
      recentBooks () {
        this.recentMoreindex = this.recentBooks.bookList.length
        this.hotbookIndex = this.recentMoreindex + 1
      },
      hotBooks () {
        this.hotMoreindex =
          this.hotBooks.bookList.length + this.recentBooks.bookList.length + 1
        this.$emit('update:endIndex', this.hotMoreindex)
      }
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
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
            .viewIcon {
              font-size: 24px;
              display: inline-block;
              transform: translateY(2px);
            }
          }
          .margin-none {
            margin-right: 0;
          .date {
            font-size: 22px;
            color: #fff;
            font-weight: 900;
            text-align: center;
            display: inline-block;
            span:nth-child(1) {
              font-size: 24px;
            }
          }
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

  .star-empty {
    font-size: 22px;
    transform: rotateZ(-45deg);
    color: #fff;
    margin-right: 8px;
  }

  .slip-line {
    margin-top: 5px;
    border-width: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
    ) 30 30;
  }

  .active {
    animation: shadowRepeat 1.2s linear 0s infinite alternate;
  }

  @keyframes shadowRepeat {
    0% {
      box-shadow: 0px 0px 80px 10px rgba(255, 255, 255, 1);
    }
    100% {
      box-shadow: 0px 0px 100px 30px rgba(255, 255, 255, 1);
    }
  }
</style>
