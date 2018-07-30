<template>
  <div class="scoreSetList">
    <statusBar/>
    <findTitle :title="setName"></findTitle>
    <listBox :scoreSetList="scoreSetList" :scoreListIndex="scoreListIndex" ></listBox>
    <pageNation  :totalPage="totalPage" :scoreListIndex="scoreListIndex"></pageNation>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text" :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height" :allExit="true"></findPrompt>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
     <icon-item v-for="(button) in controlButtons" v-if="button.show"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :longClick="button.longClick"
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
  import findPrompt from '../common/find-prompt/find-prompt'
  import {global} from 'find-sdk'
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED, LONG_KEY73, LONG_KEY75, LONG_KEY78, LONG_KEY80 } from 'vue-find'

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
            show: true,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 2,
            show: true,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 3,
            show: true,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 4,
            show: true,
            longClick: true
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
        ],
        promptInfo: {
          text: '网络连接出错，请检查网络',
          icon: 'icon-sync-info',
          delay: 1000,
          width: 750,
          height: 450
        },
        toolbarHidden: false
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
      [LONG_KEY73] () {
        this.buttonActions('left')
      },
      [LONG_KEY75] () {
        this.buttonActions('right')
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [BACK_PRESSED] () {
        this.$router.back()
        this.$store.dispatch('scoreSetList/setScoreListIndex', 0)
      }
    },
    computed: {
      ...mapState({
        scoreListIndex: state => state.scoreSetList.scoreListIndex,
        totalPage: state => state.scoreSetList.totalPage,
        scoreSetList: function (state) {
          return state.storage.cache.renderCache.scoreSetList[this.$route.query.setId] || []
        }
      }),
      ...mapGetters([])
    },
    methods: {
      getScoreSetList (page) {
        this.$store.dispatch({
          type: 'scoreSetList/getScoreSetList',
          setId: this.$route.query.setId
        })
      },
      buttonActions (type) {
        let scoreListIndex = this.scoreListIndex
        let scoreSetList = this.scoreSetList
        if (scoreSetList.length === 0) {
          return
        }
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
        if (scoreListIndex <= len - 1) {
          this.$store.dispatch('scoreSetList/setScoreListIndex', scoreListIndex)
        }
      },
      pre (scoreListIndex) {
        if (scoreListIndex >= 0) {
          this.$store.dispatch('scoreSetList/setScoreListIndex', scoreListIndex)
        }
      }
    },
    created () {
      this.getScoreSetList()
    },
    mounted () {
      global.getStatusBarItem().then((data) => {
        if (this.scoreSetList.length === 0 && !data.wifi.title) {
          // 断网
          this.$refs.prompt.showPrompt()
        }
      })
    },
    components: {
      findImg,
      findTitle,
      pageNation,
      listBox,
      statusBar,
      findPrompt
    }
  }
</script>
<style lang="scss" scoped>
.scoreSetList {
  color: #fff;
  .find-prompt {
        width: 750px;
        height: 450px;
        position: absolute;
        top: 275px;
        left: 2043px;
    }
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
        border:4px solid #ff7e1b;
        box-shadow: 0 0 20px 6px #ff7e1b;
      }
    }
  }
}
h1 {
  font-size: 60px;
  color: #fff;
}
</style>
