<template>
  <div class="musicDetail">
    <div class="musicName">{{scoreList[scoreIndex].name}}</div>
    <div class="eachDetail eachDetail1">
      <span class="iconfont icon-composer"></span>
      <span class="author">作曲家：</span>
      <span>{{scoreList[scoreIndex].composer}}</span>
    </div>
    <div class="eachDetail eachDetail2">
      <span class="iconfont icon-star-full"></span>
      <span>难易级别：</span>
      <!-- <find-star starNum=5 /> -->
    </div>
    <div class="eachDetail">
      <span class="iconfont icon-update-time"></span>
      <span>更新日期：</span>
      <span>{{scoreList[scoreIndex].lastUpdate | format}}</span>
    </div>
    <div class="eachDetail">
      <span class="iconfont icon-song-introduction"></span>
      <span>曲目介绍：</span>
      <span>{{scoreList[scoreIndex].desc}}</span>
    </div>

  </div>

</template>
<script type="text/javascript">
  import scoreListListEachItem from './scoreList-list-eachItem'
  import findStar from '../common/find-star/find-star'
  import { formatDate } from 'scripts/utils/index'
  export default {
    props: {
      scoreList: {
        type: Array,
        default: () => ({})
      },
      scoreIndex: {
        type: Number,
        default: () => ({})
      }
    },
    filters: {
      format (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'yyyy-MM-dd')
      }
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    },
    components: {
      scoreListListEachItem,
      findStar
    }
  }
</script>
<style lang="scss" scoped>
  .musicDetail {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      border: 1px solid red;
      text-indent: 176px;
      color: #fff;
      .musicName {
        font-size: 48px;
        width: 100%;
        text-overflow:ellipsis;
        overflow: hidden;
        margin-top: 106px;
        white-space: nowrap;
        word-spacing: 20px;
      }
      .eachDetail {
        font-size: 28px;
        margin-bottom: 40px;
        font-weight: 600;
        span:nth-child(2) {
          margin-right: 40px;
        }
        .iconfont {
          font-size: 26px;
        }
        &.eachDetail1 {
          margin-top: 60px;
          .author {
            word-spacing: 20px;
          }
        }
        &.eachDetail2 {
          .star {
            display: inline;
          }
        }

      }
  }
</style>
