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
  import {search, global} from 'find-sdk'
  import { KEY27, KEY28, KEY29, KEY30, KEY31, KEY32, KEY33, KEY34, LONG_KEY90, LONG_KEY92, KEY35, KEY36, KEY37, KEY38, KEY39, KEY40, KEY41, KEY42, KEY43, KEY44, KEY45, KEY46, KEY47, KEY48, KEY49, KEY50, KEY51, KEY52, KEY53, KEY54, KEY55, KEY56, KEY57, KEY58, KEY59, KEY60, KEY61, KEY62, KEY63, KEY64, KEY65, KEY66, KEY67, KEY68, KEY69, KEY70, KEY71, KEY72, KEY73, KEY74, KEY75, KEY76, KEY77, KEY78, KEY79, KEY80, KEY81, KEY82, KEY85, KEY90, KEY92, KEY94, TOOLBAR_PRESSED, PEDAL_PRESSED
  } from 'vue-find'
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
          delay: 1000,
          width: 640,
          height: 360
        },
        controlButtons: [
          {
            pianoKey: 27,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 28,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 29,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 30,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 31,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 32,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 33,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 34,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 35,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 36,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 37,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 38,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 39,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 40,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 41,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 42,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 43,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 44,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 45,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 46,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 47,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 48,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 49,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 50,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 51,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 52,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 53,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 54,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 55,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 56,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 57,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 58,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 59,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 60,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 61,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 62,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 63,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 64,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 65,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 66,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 67,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 68,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 69,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 70,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 71,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 72,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 73,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 74,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 75,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 76,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 77,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 78,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 79,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 80,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 81,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 82,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
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
            dotColor: '#fff',
            longClick: true
          },
          {
            pianoKey: 92,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            longClick: true
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
      [TOOLBAR_PRESSED] (data) {
        this.toolbarHidden = data.hidden
      },
      [KEY27] () {
        this.$refs.keyboard.clickKeyboard(0)
      },
      [KEY28] () {
        this.$refs.keyboard.clickKeyboard(1)
      },
      [KEY29] () {
        this.$refs.keyboard.clickKeyboard(2)
      },
      [KEY30] () {
        this.$refs.keyboard.clickKeyboard(3)
      },
      [KEY31] () {
        this.$refs.keyboard.clickKeyboard(4)
      },
      [KEY32] () {
        this.$refs.keyboard.clickKeyboard(5)
      },
      [KEY33] () {
        this.$refs.keyboard.clickKeyboard(6)
      },
      [KEY34] () {
        this.$refs.keyboard.clickKeyboard(7)
      },
      [KEY35] () {
        this.$refs.keyboard.clickKeyboard(8)
      },
      [KEY36] () {
        this.$refs.keyboard.clickKeyboard(9)
      },
      [KEY37] () {
        this.$refs.keyboard.clickKeyboard(10)
      },
      [KEY38] () {
        this.$refs.keyboard.clickKeyboard(11)
      },
      [KEY39] () {
        this.$refs.keyboard.clickKeyboard(12)
      },
      [KEY40] () {
        this.$refs.keyboard.clickKeyboard(13)
      },
      [KEY41] () {
        this.$refs.keyboard.clickKeyboard(14)
      },
      [KEY42] () {
        this.$refs.keyboard.clickKeyboard(15)
      },
      [KEY43] () {
        this.$refs.keyboard.clickKeyboard(16)
      },
      [KEY44] () {
        this.$refs.keyboard.clickKeyboard(17)
      },
      [KEY45] () {
        this.$refs.keyboard.clickKeyboard(18)
      },
      [KEY46] () {
        this.$refs.keyboard.clickKeyboard(19)
      },
      [KEY47] () {
        this.$refs.keyboard.clickKeyboard(20)
      },
      [KEY48] () {
        this.$refs.keyboard.clickKeyboard(21)
      },
      [KEY49] () {
        this.$refs.keyboard.clickKeyboard(22)
      },
      [KEY50] () {
        this.$refs.keyboard.clickKeyboard(23)
      },
      [KEY51] () {
        this.$refs.keyboard.clickKeyboard(24)
      },
      [KEY52] () {
        this.$refs.keyboard.clickKeyboard(25)
      },
      [KEY53] () {
        this.$refs.keyboard.clickKeyboard(26)
      },
      [KEY54] () {
        this.$refs.keyboard.clickKeyboard(27)
      },
      [KEY55] () {
        this.$refs.keyboard.clickKeyboard(28)
      },
      [KEY56] () {
        this.$refs.keyboard.clickKeyboard(29)
      },
      [KEY57] () {
        this.$refs.keyboard.clickKeyboard(30)
      },
      [KEY58] () {
        this.$refs.keyboard.clickKeyboard(31)
      },
      [KEY59] () {
        this.$refs.keyboard.clickKeyboard(32)
      },
      [KEY60] () {
        this.$refs.keyboard.clickKeyboard(33)
      },
      [KEY61] () {
        this.$refs.keyboard.clickKeyboard(34)
      },
      [KEY62] () {
        this.$refs.keyboard.clickKeyboard(35)
      },
      [KEY63] () {
        this.$refs.keyboard.clickKeyboard(36)
      },
      [KEY64] () {
        this.$refs.keyboard.clickKeyboard(37)
      },
      [KEY65] () {
        this.$refs.keyboard.clickKeyboard(38)
      },
      [KEY66] () {
        this.$refs.keyboard.clickKeyboard(39)
      },
      [KEY67] () {
        this.$refs.keyboard.clickKeyboard(40)
      },
      [KEY68] () {
        this.$refs.keyboard.clickKeyboard(41)
      },
      [KEY69] () {
        this.$refs.keyboard.clickKeyboard(42)
      },
      [KEY70] () {
        this.$refs.keyboard.clickKeyboard(43)
      },
      [KEY71] () {
        this.$refs.keyboard.clickKeyboard(44)
      },
      [KEY72] () {
        this.$refs.keyboard.clickKeyboard(45)
      },
      [KEY73] () {
        this.$refs.keyboard.clickKeyboard(46)
      },
      [KEY74] () {
        this.$refs.keyboard.clickKeyboard(47)
      },
      [KEY75] () {
        this.$refs.keyboard.clickKeyboard(48)
      },
      [KEY76] () {
        this.$refs.keyboard.clickKeyboard(49)
      },
      [KEY77] () {
        this.$refs.keyboard.clickKeyboard(50)
      },
      [KEY78] () {
        this.$refs.keyboard.clickKeyboard(51)
      },
      [KEY79] () {
        this.$refs.keyboard.clickKeyboard(52)
      },
      [KEY80] () {
        this.$refs.keyboard.clickKeyboard(53)
      },
      [KEY81] () {
        this.$refs.keyboard.clickKeyboard(54)
      },
      [KEY82] () {
        this.$refs.keyboard.clickKeyboard(55)
      },
      [KEY85] () {
        return this.buttonActions('delete')
      },
      [KEY90] () {
        return this.buttonActions('up')
      },
      [LONG_KEY90] () {
        this.buttonActions('up')
      },
      [KEY92] () {
        return this.buttonActions('down')
      },
      [LONG_KEY92] () {
        this.buttonActions('down')
      },
      [KEY94] () {
        return this.buttonActions('ok')
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键
            return this.buttonActions('up')
          case 117:
            // 踏板2号键
            return this.buttonActions('down')
          case 118:
            this.buttonActions('ok')
            break
          case 119:
            this.$router.back()
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
          self.initDataComplete = true
          if (data.code === 0) {
            // 成功
            self.promptInfo.text = '成功'
            self.promptInfo.icon = 'icon-grade-right'
            self.$refs.prompt.showPrompt()
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
            let self = this
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
                global.getStatusBarItem().then((data) => {
                  if (!bookData && !data.wifi.title) {
                    self.promptInfo.text = '网络连接失败，请检查网络'
                    self.promptInfo.icon = 'icon-sync-info'
                    self.$refs.prompt.showPrompt()
                    return
                  }
                  if (musicData.musicId) {
                    this.$router.push({path: '/scoreList', query: {book: JSON.stringify(bookData), musicId: musicData.musicId}})
                  } else {
                    this.$router.push({path: '/scoreList', query: {book: JSON.stringify(bookData)}})
                  }
                })
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
          this.listIndex = 0
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
    top: 500px;
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
