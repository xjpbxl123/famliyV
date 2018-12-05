<template>
  <div class="box">
    <contentLine :name="title"/>
    <div class="box-left">
      <div class="book-content">
        <div class="boxContent" :class="{'margin-none':(index===9)}" v-for="(data,index) in books.bookList" :key="index" @click="setSelect(index)">
          <contentBook :bookData="data" :class="{active:(index===selectedIndex)}"/>
          <div class="date" v-if="title==='最近更新'">{{ data.time | format}}</div>
          <div class="date" v-if="title==='热门曲谱'">
            <span class="viewIcon iconfont icon-popularity"></span>
            <span v-text="data.hotNum"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBook from './indexMore-book'
  import contentLine from './indexMore-line'
  import { formatDate } from 'scripts/utils/index'
  import findStar from '../common/find-star/find-star'
  export default {
    props: {
      books: {
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
      title: {
        type: String,
        default: () => {
          return ''
        }
      },
      setSelect: {
        type: Function
      }
    },
    components: {
      contentBook,
      contentLine,
      findStar
    },
    data () {
      return {
      }
    },
    filters: {
      format (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'yyyy-MM-dd')
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .box {
    display: flex;
    .box-left {
      display: flex;
      &.box-left,
      &.box-right {
        height: 80%;
        width: 3480;
        display: flex;
        margin-left: 398px;
        padding-top: 187px;
        flex-direction: column;
        .book-content {
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          & .boxContent {
            margin-right: 60px;
            display: flex;
            flex-direction: column;
            margin-bottom: 39px;
            position: relative;
            .star {
              display: flex;
              justify-content: center;
              margin-top: 10px;
            }
            .date {
              font-size: 22px;
              color: #fff;
              font-weight: 900;
              text-align: center;
              display: inline-block;
              width: 100%;
              position: absolute;
              bottom: 13px;
            }
            .viewIcon {
              font-size: 24px;
              display: inline-block;
              transform: translateY(2px);
            }
          }
          .margin-none {
            margin-right: 120px;
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
    border: 6px solid#00ff90;
    box-shadow: 0px 3px 40px 0px #00ff90;
  }
  @keyframes shadowRepeat {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
<style lang="scss" type=text/scss>
  .active {
    .imgBox {
      &::before {
        background: rgba(0,0,0,0) !important;
      }
    }
  }
</style>
