<template>
  <div class="search">
    <statusBar/>
    <find-keyboard ref="keyboard" :setValue="setValue" v-if="!toolbarHidden"/>
    <musicList :list="musicList" :listIndex="listIndex"/>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text" :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height"></findPrompt>
    <span class="searchIcon iconfont icon-search" v-show="initDataComplete"></span>
    <input type="text" class="searchInput" placeholder="曲谱或作者首字母搜索"  v-show="initDataComplete" v-model="searchName" autoFocus="true">
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
              :key="index"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :longClick="button.longClick"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>
</template>

<script>
  import findKeyboard from '../common/find-keyboard/find-keyboard'
  import findPrompt from '../common/find-prompt/find-prompt'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import musicList from './musicList'
  import {search} from 'find-sdk'
  import {INTERCEPT_DOWN} from 'vue-find'
  import { mapGetters } from 'vuex'
  export default {
    name: 'search',
    data () {
      return {
        value: '',
        initDataComplete: false,
        listIndex: 0,
        musicList: [],
        toolbarHidden: false,
        promptInfo: {
          text: '成功',
          icon: 'icon-grade-right',
          delay: 2000,
          width: 750,
          height: 450
        },
        controlButtons: [
          {
            pianoKey: 85,
            text: '',
            icon: '0xe608',
            backgroundColor: '#3000',
            dotColor: '#fff'
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff'

          },
          {
            pianoKey: 92,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff'
          },
          {
            pianoKey: 94,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff'
          }
        ],
        searchName: ''
      }
    },
    find: {
      /**
       * @desc 处理所有按键
       * */
      [INTERCEPT_DOWN] (key) {
        if (key === 21) {
          this.toolbarHidden = !this.toolbarHidden
          return
        }
        if (this.toolbarHidden && key !== 108) {
          return
        }
        if (key >= 27 && key <= 82) {
          /// 钢琴上的27是左边的按键,所以要减去27
          key = key - 27
          this.$refs.keyboard.clickKeyboard(key)
        }
        switch (key) {
          case 85:
            /// delete
            return this.buttonActions('delete')
          case 90:
            /// up
            return this.buttonActions('up')
          case 92:
            /// down
            return this.buttonActions('down')
          case 94:
            /// ok
            return this.buttonActions('ok')
          case 108:
            return this.$router.back()
        }
      }
    },
    computed: {
      ...mapGetters(['bookInfo'])
    },
    methods: {
      initData () {
        let self = this
        search.loadSearchData().then(data => {
          if (data.code === 0) {
            // 成功
            self.promptInfo.text = '成功'
            self.promptInfo.icon = 'icon-grade-right'
            self.$refs.prompt.showPrompt()
            setTimeout(function () {
              self.initDataComplete = true
            }, 2000)
          } else {
            console.log(data.desc)
            self.promptInfo.text = data.desc || '拉取数据出错'
            self.promptInfo.icon = 'icon-wrong'
            self.$refs.prompt.showPrompt()
          }
          console.log(data, 'loadSearchData')
        })
      },
      setValue (value) {
        this.searchName = this.searchName + value
      },
      buttonActions (type) {
        switch (type) {
          case 'delete':
            this.searchName = this.searchName.slice(0, this.searchName.length - 1)
            break
          case 'up':
            if (this.musicList.length === 0) {
              return
            }
            this.listIndex = Math.max(this.listIndex - 1, 0)
            break
          case 'down':
            if (this.musicList.length === 0) {
              return
            }
            this.listIndex = Math.min(this.listIndex + 1, this.musicList.length - 1)
            break
          case 'ok':
            if (this.musicList.length === 0) {
              return
            }
            console.log(this.musicList[this.listIndex])
            let musicData = this.musicList[this.listIndex]
            let bookId = musicData.bookId
            if (musicData.bookId) {
              // 去曲谱列表
              this.$store.dispatch('myScore/getBookInfo', bookId).then(() => {
                let bookData = this.bookInfo[bookId]
                if (!bookData) {
                  return
                }
                if (musicData.musicId) {
                  this.$router.push({path: '/scoreList', query: {book: JSON.stringify(bookData), musicId: musicData.musicId}})
                } else {
                  this.$router.push({path: '/scoreList', query: {book: JSON.stringify(bookData)}})
                }
              })
            }
            break
        }
      }
    },
    watch: {
      searchName (val) {
        search.searchMusicName(val).then(data => {
          this.musicList = data
          console.log(data, 'musicList')
        })
      }
    },
    created () {
      this.initData()
    },
    components: {
      findKeyboard,
      findPrompt,
      musicList,
      statusBar
    }
  }
</script>

<style scoped>
  .find-prompt {
    width: 750px;
    height: 450px;
    position: absolute;
    top: 275px;
    left: 2043px;
  }

  .searchInput {
    width: 1500px;
    position: absolute;
    top: 480px;
    left: 302px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    font-size: 64px;
    text-indent: 166px;
    color: #fff;
    height: 160px;
  }

  input::placeholder {
    color:#fff !important;
  }

  .searchIcon {
    font-size: 120px;
    color: #fff;
    position: absolute;
    top: 480px;
    left: 302px;

  }
</style>
