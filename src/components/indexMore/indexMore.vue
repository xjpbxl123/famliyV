<template>
  <div class="banner-wrapper">
    <statusBar/>
    <div class="banner-content">
      <content-center
        :title="title"
        :books="title==='最近更新'?recentBooksAll:hotBooksAll"
        :selectedIndex="indexx"
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
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import contentCenter from './indexMore-center'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import {global} from 'find-sdk'
  import loadinMixins from '../common/loading-mixins.js'
  import toast from '../common/toast/toast.js'
  import {
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
        title: this.$route.query.title,
        toolbarHidden: false,
        indexx: 0,
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
        this.buttonActions('back')
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
            this.buttonActions('back')
        }
      }
    },
    computed: {
      ...mapState({
        moreIndex (state) {
          return state.index.moreIndex
        }
      }),
      ...mapGetters(['hotBooksAll', 'recentBooksAll'])
    },
    watch: {
      hotBooksAll (val, old) {
        if (this.title === '热门曲谱' && val.bookList.length >= 0) {
          this.instance.close && this.instance.close()
        }
      },
      recentBooksAll (val, old) {
        if (this.title === '最近更新' && val.bookList.length >= 0) {
          this.instance.close && this.instance.close()
        }
      }
    },
    methods: {
      /**
       * @desc 鼠标事件
       * */
      setSelect (index) {
        let books = this.title === '最近更新' ? this.recentBooksAll : this.hotBooksAll
        return this.$store.dispatch('index/setMoreIndex', index).then(() => {
          return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(books.bookList[index])}})
        })
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let indexx = this.indexx
        let books = this.title === '最近更新' ? this.recentBooksAll : this.hotBooksAll
        if (books.bookList.length <= 0 && type !== 'back') {
          return
        }
        switch (type) {
          case 'left':
            this.indexx = Math.max(indexx - 1, 0)
            break
          case 'right':
            this.indexx = Math.min(indexx + 1, 19)
            break
          case 'up':
            /// 处理热门曲谱的index
            if (indexx - 10 >= 0) {
              this.indexx = this.indexx - 10
            }
            break
          case 'down':
            /// 处理热门曲谱的index
            if (indexx + 10 < 20) {
              this.indexx = indexx + 10
            }
            break
          case 'ok':
            if (this.title === '热门曲谱') {
              books = this.hotBooksAll
            }
            return this.$store.dispatch('index/setMoreIndex', this.indexx).then(() => {
              return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(books.bookList[this.moreIndex])}})
            })
          case 'back':
            this.$store.dispatch('index/setMoreIndex', 0)
            this.$router.back()
            break
          default:
            console.log('108')
        }
        console.log(indexx)
      }
    },
    created () {
      if (this.title === '最近更新') {
        this.$store.dispatch({type: 'index/getRecentBooks'})
      } else {
        this.$store.dispatch({type: 'index/getHotBooks'})
      }
    },
    mounted () {
      this.indexx = this.moreIndex
      console.log(this.title)
      console.log(this.hotBooksAll)
      // 断网提醒
      global.getStatusBarItem().then((data) => {
        let books = []
        this.title === '最近更新' ? books = this.recentBooksAll : books = this.hotBooksAll
        if (books.length === 0 && !data.wifi.title) {
          this.instance.close && this.instance.close()
          this.instance = toast({text: '网络连接出错，请检查网络', icon: 'icon-sync-info', iconLoading: false, allExit: true})
        }
      })
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
