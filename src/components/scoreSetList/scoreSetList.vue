<template>
  <div class="scoreSetList">
    <statusBar/>
    <findTitle :title="setName"></findTitle>
    <listBox :scoreSetList="scoreSetListItem" :scoreListIndex="scoreListIndex" :setSelect="setSelect"></listBox>
    <pageNation  :totalPage="totalPage" :scoreListPageIndex="scoreListPageIndex"></pageNation>
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
  import {global} from 'find-sdk'
  import loadinMixins from '../common/loading-mixins.js'
  import toast from '../common/toast/toast.js'
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED, LONG_KEY73, LONG_KEY75, LONG_KEY78, LONG_KEY80, PEDAL_PRESSED } from 'vue-find'

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
        toolbarHidden: false,
        scoreSetListItem: [],
        instance: ''
      }
    },
    mixins: [loadinMixins],
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
        this.$store.dispatch('scoreSetList/setScoreListPageIndex', 0)
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键
            return this.buttonActions('left')
          case 117:
            // 踏板2号键
            return this.buttonActions('right')
          case 118:
            this.buttonActions('ok')
            break
          case 119:
            this.$router.back()
            this.$store.dispatch('scoreSetList/setScoreListIndex', 0)
        }
      }
    },
    computed: {
      ...mapState({
        scoreListIndex: state => state.scoreSetList.scoreListIndex,
        scoreListPageIndex: state => state.scoreSetList.scoreListPageIndex,
        totalPage: state => state.scoreSetList.totalPage,
        scoreSetList: function (state) {
          let scoreSetList = state.storage.cache.renderCache.scoreSetList[this.$route.query.setId]
          if (scoreSetList) {
            this.instance.close && this.instance.close()
          }
          scoreSetList = scoreSetList || []
          this.scoreSetListItem = scoreSetList.slice(this.scoreListPageIndex * 20, this.scoreListPageIndex * 20 + 20)
          return scoreSetList
        }
      }),
      ...mapGetters([])
    },
    watch: {
      scoreSetList (val) {
        this.scoreSetListItem = val.slice(this.scoreListPageIndex * 20, this.scoreListPageIndex * 20 + 20)
      },
      scoreListPageIndex (val) {
        this.scoreSetListItem = this.scoreSetList.slice(val * 20, val * 20 + 20)
      }
    },
    methods: {
      getScoreSetList (page) {
        this.$store.dispatch({
          type: 'scoreSetList/getScoreSetList',
          setId: this.$route.query.setId
        })
      },
      // 鼠标点击操作
      setSelect (index) {
        this.$store.dispatch('scoreSetList/setScoreListIndex', index).then(() => {
          this.buttonActions('ok')
        })
      },
      buttonActions (type) {
        let scoreListIndex = this.scoreListIndex
        let scoreSetListItem = this.scoreSetListItem
        if (scoreSetListItem.length === 0) {
          return
        }
        switch (type) {
          case 'up':
            console.log('up')
            scoreListIndex -= 10
            this.pre(scoreListIndex, 'up')
            break
          case 'down':
            console.log('down')
            scoreListIndex += 10
            this.next(scoreListIndex, 'down')
            break
          case 'left':
            console.log('left')
            scoreListIndex--
            this.pre(scoreListIndex, 'left')
            break
          case 'right':
            console.log('right')
            scoreListIndex++
            this.next(scoreListIndex, 'right')
            break
          case 'ok':
            let data = scoreSetListItem[scoreListIndex]
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
      next (scoreListIndex, type) {
        let index = scoreListIndex
        if (scoreListIndex > 19 && this.scoreListPageIndex + 1 !== this.totalPage) {
          console.log('nextPage')
          if (type === 'down') {
            if (this.scoreListPageIndex + 2 === this.totalPage) {
              index = Math.min(index, (this.scoreSetList.length) % 20 - 1)
            } else {
              index = scoreListIndex - 20
            }
          } else {
            index = 0
          }
          this.$store.dispatch('scoreSetList/setScoreListPageIndex', this.scoreListPageIndex + 1)
        }
        this.$store.dispatch('scoreSetList/setScoreListIndex', Math.min(index, this.scoreSetListItem.length - 1))
      },
      pre (scoreListIndex, type) {
        let index = scoreListIndex
        if (scoreListIndex < 0 && this.scoreListPageIndex !== 0) {
          console.log('prePage')
          type === 'up' ? index = 10 + this.scoreListIndex : index = 19
          this.$store.dispatch('scoreSetList/setScoreListPageIndex', this.scoreListPageIndex - 1)
        }
        this.$store.dispatch('scoreSetList/setScoreListIndex', Math.max(index, 0))
      }
    },
    created () {
      console.log('scoreSetList--created', window.location.href)
      this.getScoreSetList()
    },
    mounted () {
      global.getStatusBarItem().then((data) => {
        if (this.scoreSetList.length === 0 && !data.wifi.title) {
          // 断网
          this.instance.close && this.instance.close()
          this.instance = toast({text: '网络连接出错，请检查网络', icon: 'icon-sync-info', iconLoading: false, allExit: true})
        }
      })
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
