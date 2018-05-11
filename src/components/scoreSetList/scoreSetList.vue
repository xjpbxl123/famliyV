<template>
  <div class="scoreSetList">
    <findTitle :title="'巴托克小宇宙'"></findTitle>
    <listBox :scoreSetList="scoreSetList" :scoreListIndex="scoreListIndex"></listBox>
    <pageNation :currentPage="currentPage" :totalPage="totalPage"></pageNation>
  </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  import findTitle from '../common/find-title/find-title'
  import pageNation from './scoreSetList-pagenation'
  import listBox from './scoreSetList-listbox'
  import { mapState, mapGetters } from 'vuex'
  import { KEY73, KEY75, KEY78, KEY80, KEY82 } from 'vue-find'

  export default {
    data () {
      return {}
    },
    find: {
      [KEY73] () {
        this.buttonActions('left')
      },
      [KEY75] () {
        this.buttonActions('right')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      }
    },
    computed: {
      ...mapState({
        scoreListIndex: state => state.scoreSetList.scoreListIndex,
        currentPage: state => state.scoreSetList.currentPage,
        totalPage: state => state.scoreSetList.totalPage
      }),
      ...mapGetters(['scoreSetList'])
    },
    methods: {
      getScoreSetList (page) {
        this.$store.dispatch({type: 'scoreSetList/getScoreSetList', page, setId: this.$route.query.setId})
      },
      buttonActions (type) {
        let scoreListIndex = this.scoreListIndex
        switch (type) {
          case 'up':
            console.log('up')
            scoreListIndex -= 10
            this.pre(scoreListIndex)
            break
          case 'down':
            console.log('down')
            scoreListIndex += 10
            this.next(scoreListIndex)
            break
          case 'left':
            console.log('left')
            scoreListIndex--
            this.pre(scoreListIndex)
            break
          case 'right':
            console.log('right')
            scoreListIndex++
            this.next(scoreListIndex)
            break
          case 'ok':
            console.log('ok')
            break
          default:
            break
        }
      },
      next (scoreListIndex) {
        let len = this.scoreSetList.length
        let currentPage = this.currentPage
        let totalPage = this.totalPage
        if (scoreListIndex > len - 1) {
          if (currentPage < totalPage) {
            this.getScoreSetList(++currentPage)
            scoreListIndex = scoreListIndex - 20
          } else {
            scoreListIndex = len - 1
          }
        }
        this.$store.dispatch('scoreSetList/setScoreListIndex', scoreListIndex)
      },
      pre (scoreListIndex) {
        let currentPage = this.currentPage
        if (scoreListIndex < 0) {
          if (currentPage > 1) {
            this.getScoreSetList(--currentPage)
            scoreListIndex = scoreListIndex + 20
          } else {
            scoreListIndex = 0
          }
        }
        this.$store.dispatch('scoreSetList/setScoreListIndex', scoreListIndex)
      }
    },
    created () {
      this.getScoreSetList(1)
    },
    components: {
      findImg,
      findTitle,
      pageNation,
      listBox
    }
  }
</script>
<style lang="scss" scoped>
  .scoreSetList {
    color: #fff;

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

  &
  .active {
    box-shadow: 0px 0px 50px 10px #fff;
  }

  }
  }
  }
  h1 {
    font-size: 60px;
    color: #fff;
  }
</style>
