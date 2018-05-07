<template>
    <ul class="listBox">
        <li v-for="(item,index) of scoreSetList" :key="item.bookId" :class="{ active:index == scoreListIndex }">
            <findImg :src="item.coverSmall" ></findImg>
        </li>
    </ul>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'

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
      }
    },
    data () {
      return {}
    },
    methods: {},
    created () {
      let scoreSetList = this.scoreSetList
      console.log(scoreSetList)
    },
    components: {
      findImg
    }
  }
</script>
<style lang="scss" scoped>
  ul.listBox {
    position: absolute;
    top: 180px;
    left: 200px;
    li {
      color: #fff;
      font-size: 40px;
      width: 248px;
      height: 340px;
      box-sizing: border-box;
      margin-right: 102px;
      margin-bottom: 40px;
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        box-shadow: 0px 0px 50px 10px #fff;
      }
    }
  }
</style>
