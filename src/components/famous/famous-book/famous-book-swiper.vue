<template>
  <div class="famous-book-wrap">
    <ul class="famous-book-swiper" :style="{ transform: `translateX(${left}px)` }">
      <famous-book-item v-for="(item,index) in famousBookList" :item='item' :index='index' :select="select"
                        :key="index" :setFamousBookSelect="setFamousBookSelect">
        <div class="famous-book-bar">
          {{item.desc}}
        </div>
      </famous-book-item>
    </ul>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .famous-book-wrap {
    overflow: hidden;
    position: absolute;
    top: 475px;
    width: 100%;
    height: 405px;
    .famous-book-swiper {
      display: flex;
      align-items: center;
      height: 405px;
      position: absolute;
      left: 1955px;
      transition: all .8s linear;
      .famous-book-bar {
        padding-top: 30px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        height: 130px;
        width: 100%;
        background: url("./image/pic_blue_small.png") no-repeat;
        text-align: center;
        font-size: 26px;
        color: #FFFFFF;
        letter-spacing: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
      }
      .active {
        .famous-book-bar {
          height: 140px;
          background: url("./image/pic_yellow_small.png") no-repeat;
          animation: fadeIn .7s forwards;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      background: url("./image/pic_blue_small.png") no-repeat;
    }
    to {
      background: url("./image/pic_yellow_small.png") no-repeat;
    }
  }
</style>
<script type="es6">
  import famousBookItem from './famous-book-item'

  export default {
    name: 'famous-book-swiper',
    props: {
      famousBookList: {
        type: Array
      },
      select: {
        type: Number
      },
      setFamousBookSelect: {
        type: Function
      }
    },
    data () {
      return {
      }
    },
    computed: {
      left: function () {
        let select = this.select
        return -460 * select - (select + select) * 40
      }
    },
    mounted () {
      console.log(this.famousBookList, 'sss')
    },
    watch: {
    },
    components: {
      famousBookItem
    }
  }
</script>
