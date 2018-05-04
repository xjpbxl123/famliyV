<template>
  <div class="scoreList">
      <div class="left"></div>
      <scoreList-center :scoreList="scoreList" :scoreIndex="scoreIndex"/>
      <scoreList-music-detail :scoreList="scoreList" :scoreIndex="scoreIndex"/>
  </div>

</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import scoreListCenter from './scoreList-center'
  import scoreListMusicDetail from './scoreList-music-detail'
  import {
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY90
  } from 'vue-find'
  export default {
    data () {
      return {
      }
    },
    find: {
      [KEY73] () {
        this.buttonActions('prevPage')
      },
      [KEY75] () {
        this.buttonActions('nextPage')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [KEY85] () {
        this.buttonActions('collect')
      },
      [KEY90] () {
        this.buttonActions('favo')
      }
    },
    computed: {
      ...mapState({
        scoreIndex: state => state.scoreList.scoreIndex
      }),
      ...mapGetters(['scoreList'])
    },
    methods: {
      getScoreList () {
        this.$store.dispatch({type: 'scoreList/getScoreList', bookId: 334})
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
      this.getScoreList()
    },
    components: {
      scoreListCenter,
      scoreListMusicDetail

    }
  }
</script>
<style lang="scss" scoped>
  .scoreList {
      width: 100%;
      height: 100%;
    .left {
      position: absolute;
      width: 850px;
      height: 100%;
      top: 0;
      left: 0;
      background: burlywood;
    }

  }
</style>
