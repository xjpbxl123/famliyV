<template>
 <div class="scoreListLeft">
   <div class="title">
     <span>
       {{book.name}}
     </span>
   </div>
    <findImg :src="imgSrc" class="cover"></findImg>
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
          <span>
            {{book.type}}
          </span>
        </li>
        <li>
          <i class="iconfont icon-difficulty-level"></i>
          <span>
            难易级别:
          </span>
          <findStar :starNum="book.starNum" class="scrore-list-scroStar"></findStar>
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
    <div class="musicLabels">
      <i class="iconfont icon-label"></i>
      <span>
        曲谱标签：{{book.tagNames}}
      </span>
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
        imgSrc: require('../popular/images/pic_02.png')
      }
    },
    filters: {
      format (value) {
        let t = new Date(parseInt(value))
        return formatDate(t, 'yyyy-MM-dd')
      }
    },
    computed: {},
    methods: {},
    created () {},
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
    width: 448px;
    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
    &::after {
      content: "";
      position: absolute;
      width: 400px;
      height: 2px;
      bottom: 30px;
      background: -webkit-linear-gradient(left, white, rgba(255, 255, 255, 0));
      left: 106%;
    }
  }
  .cover {
    width: 295px;
    height: 358px;
    position: absolute;
    top: 190px;
    left: 100px;
  }
  .attribute {
    width: 400px;
    height: 358px;
    font-size: 24px;
    position: absolute;
    right: 0;
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
  .musicLabels {
    font-size: 24px;
    position: absolute;
    left: 100px;
    top: 580px;
    .iconfont {
      font-size: 24px;
    }
  }
  .introduce {
    text-indent: 2em;
    position: absolute;
    top: 650px;
    width: 800px;
    left: 50%;
    font-size: 24px;
    transform: translateX(-50%);
    line-height: 42px;

    height: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
</style>
