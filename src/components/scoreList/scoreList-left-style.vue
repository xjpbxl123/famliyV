<template>
 <div class="scoreListLeft">
   <div class="title">
     <span>
       周杰伦钢琴演奏
     </span>
   </div>
    <findImg :src="imgSrc" class="cover"></findImg>
    <div class="attribute">
      <ul>
        <li>
          <i class="iconfont icon-author"></i>
          <span>
            作者:
          </span>
          <span>
            巴扎嘿
          </span>
        </li>
        <li>
          <i class="iconfont icon-period"></i>
          <span>
            时期:
          </span>
          <span>
            近现代
          </span>
        </li>
        <li>
          <i class="iconfont icon-country"></i>
          <span>
            国家:
          </span>
          <span>
            日不落帝国
          </span>
        </li>
        <li>
          <i class="iconfont icon-type"></i>
          <span>
            种类:
          </span>
          <span>
            属性2值
          </span>
        </li>
        <li>
          <i class="iconfont icon-difficulty-level"></i>
          <span>
            难易级别:
          </span>
          <findStar :starNum="3" class="scrore-list-scroStar"></findStar>
        </li>
        <li>
          <i class="iconfont icon-update-time"></i>
          <span>
            更新日期:
          </span>
          <span>
            2017-06-20
          </span>
        </li>
        <li>
          <i class="iconfont icon-performer"></i>
          <span>
            演奏家:
          </span>
          <span>
            流行音乐
          </span>
        </li>
      </ul>
    </div>
    <div class="musicLabels">
      <i class="iconfont icon-label"></i>
      <span>
        曲谱标签：港台  2000年后  男歌手  忧桑  抒情
      </span>
    </div>
    <div class="introduce">
      爵士乐（Jazz），于19世纪末20世纪初源于美国，诞生于南部港口城市新奥尔良，音乐根基来自布鲁斯（Blues）和拉格泰姆（Ragtime）。爵士乐讲究即兴，以具有摇摆特点的Shuffle节奏为基础，是非洲黑人文化和欧洲白人文化的结合。20世纪前十几年爵士乐主要集中在新奥尔良发展，1917年后转向芝加哥，30年代又转移至纽约，直至今天，爵士乐风靡全球。爵士乐的主要风格有：新奥尔良爵士、摇摆乐、比博普、冷爵士、自由爵士、拉丁爵士、融合爵士等。
    </div>
 </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  import findStar from '../common/find-star/find-star'
  export default {
    data () {
      return {
        imgSrc: require('../popular/images/pic_02.png')
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
    &::after {
      content: "";
      position: absolute;
      width: 400px;
      height: 2px;
      bottom: 10px;
      background: -webkit-linear-gradient(left, white, rgba(255, 255, 255, 0));
      left: 120%;
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
    background-color: skyblue;
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
