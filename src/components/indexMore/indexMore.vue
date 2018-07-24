<template>
  <div class="banner-wrapper">
    <statusBar/>
    <div class="banner-content">
      <content-center
        :title="title"
        :books="title==='最近更新'?recentBooksAll:hotBooksAll"
        :selectedIndex="moreIndex"/>
    </div>
    <toolbar :darkBgHidden="true">
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
  import {
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    LONG_KEY73,
    LONG_KEY75,
    KEY82,
    BACK_PRESSED
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
        title: this.$route.query.title
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
      isLogin (val) {
        if (val) {
          this.userActionButtons[1].text = '注销'
          this.getRecentOpenList()
        } else {
          this.userActionButtons[1].text = '登陆'
        }
      }
    },
    methods: {
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let moreIndex = this.moreIndex
        let books = this.recentBooksAll
        switch (type) {
          case 'left':
            moreIndex = Math.max(moreIndex - 1, 0)
            break
          case 'right':
            moreIndex = Math.min(moreIndex + 1, 19)
            break
          case 'up':
            /// 处理热门曲谱的index
            if (moreIndex - 10 >= 0) {
              moreIndex = this.moreIndex - 10
            }
            break
          case 'down':
            /// 处理热门曲谱的index
            if (moreIndex + 10 < 20) {
              moreIndex = moreIndex + 10
            }
            break
          case 'ok':
            if (this.title === '热门曲谱') {
              books = this.hotBooksAll
            }
            return this.$router.push({path: '/scoreList', query: {book: JSON.stringify(books.bookList[this.moreIndex])}})
          case 'back':
            moreIndex = 0
            this.$router.back()
            break
          default:
            console.log('108')
        }
        console.log(moreIndex)
        this.$store.dispatch('index/setMoreIndex', moreIndex)
      }
    },
    created () {
      if (this.title === '最近更新') {
        this.$store.dispatch({type: 'index/getRecentBooks'})
      } else {
        this.$store.dispatch({type: 'index/getHotBooks'})
      }
    },
    destroyed () {
      clearInterval(window.interval)
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
