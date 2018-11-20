<template>
    <div class="maxBox">
      <div class="listBox">
        <ul>
          <li v-for="(item,index) of scoreSetList" :key="item.bookId" :class="{ active:index == scoreListIndex }" @click="setSelect(index)">
            <div class="imgBox">
              <findImg :src="item.coverSmall" :text="item.name"></findImg>
            </div>
            <findStar :starNum="item.starNum" :grade="item.grade" class="scrore-list-scroStar" :type="item.detail.type"></findStar>
          </li>
        </ul>
      </div>
    </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  import findStar from '../common/find-star/find-star'
  export default {
    name: 'scoreSetList-listbox',
    props: {
      scoreSetList: {
        type: Array,
        default: () => {
          return []
        }
      },
      scoreListIndex: {
        type: Number,
        default: () => {
          return 0
        }
      },
      setSelect: {
        type: Function
      }
    },
    data () {
      return {}
    },
    watch: {
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
  .maxBox {
    position: absolute;
    top: 87px;
    left: 348px;
    width: 3202px;
    height: 912px;
    padding: 50px;
    overflow: hidden;
    .listBox {
      width: 100%;
      height: 100%;
      position: relative;
      margin-top: 50px;
      ul {
        position: absolute;
        top: 0;
        left: 0;
        li {
          color: #fff;
          font-size: 40px;
          width: 250px;
          height: 360px;
          box-sizing: border-box;
          margin-right: 60px;
          margin-bottom: 40px;
          background:rgba(255,255,255,0.1);
          border-radius: 8px;
          position: relative;
          .imgBox {
            width: 220px;
            height: 300px;
            margin: 0 auto;
            margin-top: 11px;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            &::before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: rgba(0,0,0,0.3);
              z-index: 10;
            }
          }
          .star {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
          }
          &.active {
            border: 6px solid#00ff90;
            box-shadow: 0px 3px 40px 0px #00ff90;
            .imgBox {
              &::before {
                background: rgba(0,0,0,0);
              }
            }
          }
        }
      }
    }
  }
</style>
