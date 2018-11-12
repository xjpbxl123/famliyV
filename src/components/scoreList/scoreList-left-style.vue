<template>
 <div class="scoreListLeft">
   <div class="title">
     <span>
       {{book.name}}
     </span>
   </div>
    <findImg :src="imgUrl" class="cover"></findImg>
    <div class="attribute">
      <ul>
        <li>
          <i class="iconfont icon-author"></i>
          <span>
            作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者:
          </span>
          <span>
           {{book.authorName}}
          </span>
        </li>
        <li>
          <i class="iconfont icon-period"></i>
          <span>
            时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期:
          </span>
          <span>
            {{book.period}}
          </span>
        </li>
        <li>
          <i class="iconfont icon-country"></i>
          <span>
            国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家:
          </span>
          <span>
            {{book.country}}
          </span>
        </li>
        <li>
          <i class="iconfont icon-type"></i>
          <span>
            种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:
          </span>
          <span v-text="book.detail.type === 1 ? '流行&经典': '古典陪练'"></span>
        </li>
        <li>
          <i class="iconfont icon-star-empty"></i>
          <span>
            难易级别:
          </span>
          <findStar :starNum="book.starNum" :grade="book.grade" class="scrore-list-scroStar"></findStar>
        </li>
        <li>
          <i class="iconfont icon-update-time"></i>
          <span>
            更新日期:
          </span>
          <span>
            {{book.time | format}}
          </span>
        </li>
        <li>
          <i class="iconfont icon-performer"></i>
          <span>
            演&nbsp;奏&nbsp;家:
          </span>
          <span>
            {{book.performer}}
          </span>
        </li>
      </ul>
    </div>
    <div class="introduce">
      {{book.desc}}
    </div>
 </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  import findStar from '../common/find-star/find-star'
  import { formatDate } from 'scripts/utils/index'
  export default {
    props: {
      book: {
        type: Object,
        default: () => { return {} }
      }
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
    computed: {
      imgUrl: function () {
        if (this.book.coverSmall) {
          let timestamp = `t=${Date.now()}`
          return this.book.coverSmall + `&${timestamp}`
        }
      }
    },
    methods: {},
    created () {
    },
    components: {
      findImg,
      findStar
    }
  }
</script>
<style lang="scss" scoped>
.scoreListLeft {
  color: #fff;
  .title {
    font-size: 40px;
    font-weight: 700;
    position: absolute;
    top: 85px;
    left: 100px;
    width: 650px;
    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
  .cover {
    width: 264px;
    height: 340px;
    position: absolute;
    top: 190px;
    left: 100px;
  }
  .attribute {
    width: 400px;
    height: 358px;
    font-size: 24px;
    position: absolute;
    right: 30px;
    top: 190px;
    font-weight: 700;
    li {
      margin-bottom: 12px;
      margin-top: 12px;
      width: 100%;
      position: relative;
      .iconfont {
        font-size: 24px;
      }
      .star {
        display: flex;
        position: absolute;
        left: 150px;
        top: 0;
      }
    }
  }

  .introduce {
    text-indent: 2em;
    position: absolute;
    top: 603px;
    width: 800px;
    left: 50%;
    font-size: 24px;
    transform: translateX(-50%);
    line-height: 42px;
    height: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
</style>
