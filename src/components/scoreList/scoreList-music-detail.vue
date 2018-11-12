<template>
  <div class="musicDetail">
    <div class="contentBox">
      <div class="musicName">{{scoreList[scoreIndex]&&scoreList[scoreIndex].name}}</div>
      <div class="eachDetail eachDetail1">
        <span class="iconfont icon-composer"></span>
        <span class="author">作曲家：</span>
        <span>{{scoreList[scoreIndex]&&scoreList[scoreIndex].composer}}</span>
      </div>
      <div class="eachDetail eachDetail2">
        <span class="iconfont icon-star-empty"></span>
        <span>难易级别：</span>
        <find-star :starNum="scoreList[scoreIndex]&&scoreList[scoreIndex].starNum" />
      </div>
      <div class="eachDetail">
        <span class="iconfont icon-update-time"></span>
        <span>更新日期：</span>
        <span>{{scoreList[scoreIndex]&&scoreList[scoreIndex].lastUpdate | format}}</span>
      </div>
      <div class="eachDetail">
        <span class="iconfont icon-auto-play"></span>
        <span>演奏类型：</span>
        <span>{{playType}}</span>
      </div>
      <div class="eachDetail">
        <span class="iconfont icon-song-introduction"></span>
        <span>曲目介绍：</span>
        <div class="musicDesc">{{scoreList[scoreIndex]&&scoreList[scoreIndex].desc}}</div>
      </div>
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
        let formateStr = formatDate(t, 'yyyy-MM-dd')
        if (formateStr.indexOf('N') !== -1) {
          return ''
        }
        return formateStr
      }
    },
    data () {
      return {
        playType: ''
      }
    },
    methods: {
    },
    watch: {
      scoreIndex: function (val) {
        let musicData = this.scoreList[this.scoreIndex]
        if (!musicData || !musicData.files) {
          return
        }
        this.playType = ''
        musicData.files.forEach(item => {
          if (this.playType) {
            this.playType = this.playType + ' | ' + item.styleName
          } else {
            this.playType = item.styleName
          }
        })
      }
    },
    created () {
      let musicData = this.scoreList[this.scoreIndex]
      if (!musicData || !musicData.files) {
        return
      }
      musicData.files.forEach(item => {
        if (this.playType) {
          this.playType = this.playType + ' | ' + item.styleName
        } else {
          this.playType = item.styleName
        }
      })
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
      text-indent: 118px;
      color: #fff;
      .contentBox {
        width: 1682px;
        height: 784px;
        background:rgba(0,0,0,0.1);
        border-radius: 24px;
        float: left;
        margin-left: 162px;
        margin-top: 93px;
        .musicName {
          font-size: 48px;
          width: 100%;
          margin-top: 59px;
          word-spacing: 20px;
          position: relative;
          &::before {
            content: '';
            width: 40px;
            height: 59px;
            position: absolute;
            left: 55px;
            top: -4px;
            background: url('../popular/images/icon.png') no-repeat;
            background-size: cover;
          }
        }
        .eachDetail {
          font-size: 28px;
          font-size: 24px;
          font-family:PingFangSC-Regular;
          font-weight: 400;
          color: #fff;
          margin-top: 30px;
          span:nth-child(2) {
            margin-right: 40px;
          }
          span:nth-child(3) {
            margin-left: -50px;
          }
          .iconfont {
            font-size: 24px;
          }
          &.eachDetail1 {
            margin-top: 50px;
            .author {
              display: inline-block;
              letter-spacing: 6px;
              text-indent: 0;
            }
          }
          &.eachDetail2 {
            position: relative;
            span:nth-child(1) {
              display: inline-block;
              text-indent: 0;
            }
            .star {
              position: absolute;
              left: 268px;
              top: 0;
              display: flex;
              justify-content: center;
              text-indent: 0;
            }
          }
          .musicDesc {
            text-indent: 2rem;
            width: 1300px;
            margin-top: 40px;
            margin-left: 170px;
            line-height: 44px;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 6;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }
      }
  }
</style>
