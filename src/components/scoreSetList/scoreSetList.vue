<template>
  <div class="scoreSetList">
    <statusBar/>
    <findTitle :title="setName"></findTitle>
    <listBox :scoreSetList="scoreSetList" :scoreListIndex="scoreListIndex"></listBox>
    <pageNation :currentPage="currentPage" :totalPage="totalPage"></pageNation>
    <toolbar :darkBgHidden="true">
     <icon-item v-for="(button) in controlButtons" v-if="button.show"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  import findTitle from '../common/find-title/find-title'
  import pageNation from './scoreSetList-pagenation'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import listBox from './scoreSetList-listbox'
  import { mapState, mapGetters } from 'vuex'
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED } from 'vue-find'

  export default {
    data () {
      return {
        setName: this.$route.query.setName,
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 1,
            show: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 2,
            show: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 3,
            show: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 4,
            show: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 5,
            show: true
          }
        ]
      }
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
      },
      [BACK_PRESSED] () {
        this.$router.back()
        this.$store.dispatch('scoreSetList/setScoreListIndex', 0)
        this.$store.dispatch('scoreSetList/setCurrentPage', 1)
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
        this.$store.dispatch({
          type: 'scoreSetList/getScoreSetList',
          page,
          setId: this.$route.query.setId
        })
      },
      buttonActions (type) {
        let scoreListIndex = this.scoreListIndex
        let scoreSetList = this.scoreSetList
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
            let data = scoreSetList[scoreListIndex]
            console.log(data)
            this.$router.push({
              path: '/scoreList',
              query: { book: JSON.stringify(data) }
            })
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
        this.$store.dispatch('scoreSetList/setCurrentPage', currentPage)
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
        this.$store.dispatch('scoreSetList/setCurrentPage', currentPage)
      }
    },
    created () {
      this.getScoreSetList(this.currentPage)
      console.log(this.scoreSetList, 'scoreSetList')
    },
    components: {
      findImg,
      findTitle,
      pageNation,
      listBox,
      statusBar
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

      & .active {
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
