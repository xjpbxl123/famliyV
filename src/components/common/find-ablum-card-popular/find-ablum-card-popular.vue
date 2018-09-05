<template>
  <div class='find-ablum-card'  :class="{active:select === index}"  @click="setSelect(index)">
    <findAblumTitle :name="ablum.name" class="white" :isActive="select === index" :typeN="2"></findAblumTitle>
    <findAlbum :albumArr="ablum.bookCover" :typeN="2" :type="type"></findAlbum>
  </div>
</template>
<style lang=scss scoped type=text/scss>
  .find-ablum-card {
    width: 660px;
    height: 268px;
    background: url("./images/img_popbg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: flex;
    position: relative;
    border: 6px solid rgba(255,255,255,0.28);
    border-radius:16px;
    transition: all 0.4s linear;

    &.active{
      border:6px solid #00FF90;
      box-shadow: 0px 0px 60px 0px #00FF90;
      transform: scale(1.2)
    }

    &.styleActive{
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      border: 6px solid #A6FFFA;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -36px;
      left: 50%;
      transform: translateX(-50%);
      width:660px;
      height:20px;
      background:linear-gradient(180deg,rgba(255,255,255,0.3) 10%,rgba(255,255,255,0));
      opacity:0.6;
      border-radius:10px;
    }
    ul {
      position: absolute;
      height: 226px;
      right: 70px;
      top: 14px;
    }
    .find-ablum-title {
      position: absolute;
      left: 40px;
      top: 115px;
    }
  }
</style>

<script>
  import findAlbum from 'components/common/find-Album/find-Album'
  import findAblumTitle from 'components/common/find-ablum-title/find-ablum-title'
  import findImg from '../find-img/find-img'
  export default {
    name: 'popular',
    props: {
      ablum: Object,
      index: Number,
      setSelect: Function,
      select: {
        type: Number,
        default: () => {
          return 0
        }
      }
    },
    data () {
      return {
        defaultImg: require('../../popular/images/pic_books_nomal.png'),
        type: {
          maxHeight: 220,
          differHeight: 12,
          over: 90
        }
      }
    },
    components: {
      findAlbum,
      findAblumTitle,
      findImg
    }
  }
</script>
