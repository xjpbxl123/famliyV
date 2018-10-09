<template>
 <div class="scoreListFamous">
   <div class="title">
     <span>
       名师课程相关练习
     </span>
   </div>
    <findImg :src="imgUrl" class="cover"></findImg>
    <div class="musicLabels">
      <span class="mess">
        教师：{{book.authorName}}
      </span>
      <span class="mess">
        教材：{{book.courseSetName}}
      </span>
      <span class="mess">
        课程：{{book.courseName}}
      </span>
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
    created () {},
    components: {
      findImg,
      findStar
    }
  }
</script>
<style lang="scss" scoped>
.scoreListFamous {
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
        height: 1px;
        bottom: 10px;
        background: -webkit-linear-gradient(left,#fff,hsla(0,0%,100%,0));
        left: 76%;
    }
  }
  .cover {
    width: 295px;
    height: 358px;
    position: absolute;
    top: 190px;
    left: 100px;
  }
  .musicLabels {
    font-size: 24px;
    position: absolute;
    left: 100px;
    top: 580px;
    color:rgba(255,255,255,1);
    .mess {
        display: block;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        margin-bottom: 22px;
    }
  }
}
</style>
