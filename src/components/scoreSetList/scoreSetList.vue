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
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../scripts/utils'
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
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 1,
            show: true,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 2,
            show: true,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 3,
            show: true,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 4,
            show: true,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 5,
            show: true
          }
        ],
        toolbarHidden: false,
        scoreSetListItem: [],
        hasLoaded: false,
        totalPage: 0
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
        scoreSetList: function (state) {
          let scoreSetList = state.storage.cache.renderCache.scoreSetList[this.$route.query.setId]
          if (scoreSetList) {
            eventsHub.$emit('closeToast')
          }
          this.hasLoaded = scoreSetList
          scoreSetList = scoreSetList || []
          this.totalPage = Math.ceil(scoreSetList.length / 20)
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
      getScoreSetList () {
        this.$store.dispatch({
          type: 'scoreSetList/getScoreSetList',
          setId: this.$route.query.setId
        }).then((data) => {
          if (this.hasLoaded || (data && data.scoreSetList)) {
            // 有缓存 或有数据
            eventsHub.$emit('closeToast')
          } else {
            errorHandling(data)
          }
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
              index = Math.min(index - 20, (this.scoreSetList.length) % 20 - 1)
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
      down () {

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
      this.getScoreSetList()
    },
    beforeDestroy () {
      eventsHub.$emit('closeToast')
    },
    mounted () {
      eventsHub.$emit('toast')
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
}
h1 {
  font-size: 60px;
  color: #fff;
}
</style>
