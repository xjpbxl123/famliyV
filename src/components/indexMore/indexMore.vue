<template>
  <div class="banner-wrapper">
    <statusBar/>
    <div class="banner-content">
      <content-center
        :title="moreIndexTitle"
        :books="moreIndexTitle==='最近更新'?recentBooksAll:hotBooksAll"
        :selectedIndex="moreIndex"
        :setSelect="setSelect"
        />
    </div>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
      <icon-item v-for="button in controlButtons"
                 :key="button.id"
                 :id="button.id"
                 :icon="button.icon"
                 :pianoKey="button.pianoKey"
                 :longClick="button.longClick"
                 :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
      <icon-item
            key="70"
            id="115"
            icon="0xe6da"
            :text="moreIndexTitle"
            pianoKey="70"
            titlePosition="below"
            style="{backgroundColor:'#3000',color: '#fff',textColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import contentCenter from './indexMore-center'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../scripts/utils'
  import {
    KEY70,
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    LONG_KEY73,
    LONG_KEY75,
    KEY82,
    BACK_PRESSED,
    PEDAL_PRESSED
  } from 'vue-find'

  export default {
    data () {
      return {
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 110,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 111,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 112
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 113
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 114
          }
        ],
        toolbarHidden: false
      }
    },
    find: {
      [KEY70] () {
        this.buttonActions('changeData')
      },
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
      [LONG_KEY73] () {
        this.buttonActions('left')
      },
      [LONG_KEY75] () {
        this.buttonActions('right')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [BACK_PRESSED] () {
        this.goBack()
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
            this.goBack()
        }
      }
    },
    computed: {
      ...mapState({
        moreIndex (state) {
          return state.index.moreIndex
        },
        moreIndexTitle (state) {
          return state.index.moreIndexTitle
        },
        hotBooksAll: function (state) {
          let hotBooksAll = state.storage.cache.renderCache.hotBooksAll
          if (hotBooksAll.bookList.length > 0) {
            eventsHub.$emit('closeToast')
          }
          this.hasLoaded = !!hotBooksAll.bookList.length
          return hotBooksAll
        },
        recentBooksAll: function (state) {
          let recentBooksAll = state.storage.cache.renderCache.recentBooksAll
          if (recentBooksAll.bookList.length > 0) {
            eventsHub.$emit('closeToast')
          }
          this.hasLoaded = !!recentBooksAll.bookList.length
          return recentBooksAll
        }
      }),
      ...mapGetters([])
    },
    methods: {
      /**
       * @desc 鼠标事件
       * */
      setSelect (index) {
        let books = this.moreIndexTitle === '最近更新' ? this.recentBooksAll : this.hotBooksAll
        return this.$store.dispatch('index/setMoreIndex', index).then(() => {
          return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(books.bookList[index])}})
        })
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let indexx = this.moreIndex
        let books = this.moreIndexTitle === '最近更新' ? this.recentBooksAll : this.hotBooksAll
        if (books.bookList.length <= 0) {
          return
        }
        switch (type) {
          case 'changeData':
            let title = this.moreIndexTitle
            if (title === '最近更新') {
              title = '热门曲谱'
            } else {
              title = '最近更新'
            }
            return this.$store.dispatch('index/setMoreIndex', 0).then(() => {
              return this.$store.dispatch('index/setIndexMoreTitle', title)
            })
          case 'left':
            indexx = Math.max(indexx - 1, 0)
            return this.$store.dispatch('index/setMoreIndex', indexx)
          case 'right':
            indexx = Math.min(indexx + 1, 19)
            return this.$store.dispatch('index/setMoreIndex', indexx)
          case 'up':
            /// 处理热门曲谱的index
            if (indexx - 10 >= 0) {
              indexx = indexx - 10
            }
            return this.$store.dispatch('index/setMoreIndex', indexx)
          case 'down':
            /// 处理热门曲谱的index
            if (indexx + 10 < 20) {
              indexx = indexx + 10
            }
            return this.$store.dispatch('index/setMoreIndex', indexx)
          case 'ok':
            if (this.moreIndexTitle === '热门曲谱') {
              books = this.hotBooksAll
            }
            return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(books.bookList[this.moreIndex])}})

          default:
            console.log('108')
        }
        console.log(indexx)
      },
      goBack () {
        this.$store.dispatch('index/setMoreIndex', 0)
        this.$router.back()
      }
    },
    created () {
      if (this.moreIndexTitle === '最近更新') {
        return this.$store.dispatch({type: 'index/getRecentBooks'}).then((data) => {
          if (this.hasLoaded || (data && data.recentBooksAll)) {
            eventsHub.$emit('closeToast')
            return this.$store.dispatch({type: 'index/getHotBooks'}).then((data) => {
              if (this.hasLoaded || (data && data.hotBooksAll)) {
                eventsHub.$emit('closeToast')
              } else {
                errorHandling(data)
              }
            })
          } else {
            errorHandling(data)
          }
        })
      }
    },
    mounted () {
      eventsHub.$emit('toast')
    },
    beforeDestroy () {
      eventsHub.$emit('closeToast')
    },
    components: {
      statusBar,
      contentCenter
    }
  }
</script>
<style lang="scss" scoped>
  .banner-wrapper {
    height: 100%;
  .banner-content {
    display: flex;
    height: 100%;
  }

  }

</style>
