<template>
  <div class="center">
    <ul>
        <score-list-list-eachItem v-for="(item,index) in scoreList"
        :key="index"
        :index="index"
        :data="item"
        :scoreIndex="scoreIndex"/>
    </ul>
  </div>

</template>
<script type="text/javascript">
  import scoreListListEachItem from './scoreList-list-eachItem'
  export default {
    props: {
      scoreList: {
        type: Array,
        default: () => ([])
      },
      scoreIndex: {
        type: Number,
        default: () => ([])
      }
    },
    data () {
      return {
      }
    },
    methods: {
      getDiffer () {
        this.$store.dispatch({type: 'popular/getDiffer'})
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let popularIndex = this.popularIndex
        switch (type) {
          case 'left' :
            console.log('left')
            popularIndex--
            popularIndex = Math.max(popularIndex, 0)
            this.$store.dispatch('popular/setPopularSelected', popularIndex)
            break
          case 'right':
            console.log('right')
            popularIndex++
            popularIndex = Math.min(popularIndex, 4)
            this.$store.dispatch('popular/setPopularSelected', popularIndex)
            break
          case 'ok':
            console.log('ok')
            break
          default:
            console.log('108')
            // this.goBack()
        }
      }
    },
    created () {
      this.getDiffer()
    },
    components: {
      scoreListListEachItem
    }
  }
</script>
<style lang="scss" scoped>
  .center {
      width: 976px;
      height: 807px;
      overflow: hidden;
      position: absolute;
      left: 850px;
      top: 94px;
      ul {
          width: 100%;
          height: 100%;
      }
  }
</style>
