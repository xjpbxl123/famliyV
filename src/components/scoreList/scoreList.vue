<template>
  <div class="scoreList">
      <statusBar ref="statusBar"/>
      <div class="left">
        <scoreListLeftDeffer v-if="query.differ" :differ="JSON.parse(query.differ)"></scoreListLeftDeffer>
        <scoreListLeftYear v-if="query.year" :year="JSON.parse(query.year)"></scoreListLeftYear>
        <scoreListLeftStyle v-if="query.book" :book="JSON.parse(query.book)"></scoreListLeftStyle>
        <scoreListLeftFamous v-if="query.famous" :book="JSON.parse(query.famous)"></scoreListLeftFamous>
      </div>
      <scoreList-center ref="center" :scoreList="scoreList" :scoreIndex="scoreIndex" :setSelect="setSelect"/>
      <scoreList-music-detail :scoreList="scoreList" :scoreIndex="scoreIndex" v-show="!dataError"/>
      <find-cover :activeNamespace="namespace">
        <scoreList-choose-type  v-if="chooseType" :files="files" :bannerType="bannerType" :collect="collect" :clickPlay="clickPlay"/>
        <scoreList-choose-buttons  v-if="chooseType && !toolbarHidden" :files="files" :clickPlay="clickPlay"/>
      </find-cover>
      <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
                :hidden="chooseType"
                :key="index"
                :id="button.id"
                :icon="button.icon"
                :pianoKey="button.pianoKey"
                :longClick="button.longClick"
                :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
        <icon-item v-for="(button,index) in typeButtons"
              :hidden="!chooseType"
              :key="index"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
      </toolbar>
  </div>

</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import scoreListCenter from './scoreList-center'
  import scoreListMusicDetail from './scoreList-music-detail'
  import scoreListChooseType from './scoreList-choose-type'
  import scoreListChooseButtons from './scoreList-choose-buttons'
  import scoreListLeftDeffer from './scoreList-left-deffer'
  import scoreListLeftFamous from './scoreList-left-famous'
  import scoreListLeftYear from './scoreList-left-year'
  import scoreListLeftStyle from './scoreList-left-style'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import {modules} from 'find-sdk'
  import {errorHandling} from '../../scripts/utils'
  import eventsHub from 'scripts/eventsHub'
  import {
    KEY73,
    KEY75,
    KEY70,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY92,
    KEY99,
    LONG_KEY73,
    LONG_KEY75,
    LONG_KEY78,
    LONG_KEY80,
    BACK_PRESSED,
    PEDAL_PRESSED,
    TOOLBAR_PRESSED
  } from 'vue-find'

  export default {
    data () {
      return {
        chooseType: false,
        bannerType: '',
        query: this.$route.query,
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe636',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe64c',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 12,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 13,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 14,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 15
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe653',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 16
          }
        ],
        typeButtons: [
          {
            pianoKey: 70,
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
            pianoKey: 85,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 92,
            text: '',
            icon: '',
            dotColor: '#0000'
          },
          {
            pianoKey: 99,
            text: '',
            icon: '',
            dotColor: '#0000'
          }
        ],
        toolbarHidden: false,
        dataError: true,
        stopEvent: false,
        loading: false,
        hasLoaded: false
      }
    },
    watch: {
      scoreIndex: function (value) {
        this.collet = this.scoreList[this.scoreIndex] ? this.scoreList[this.scoreIndex].collect : []
        let flag = false
        this.collet && this.collet.forEach((item) => {
          if (item.collection) { flag = true }
        })
        if (flag) {
          this.controlButtons[5].icon = '0xe656'
        } else {
          this.controlButtons[5].icon = '0xe653'
        }
      }
    },
    find: {
      [KEY73] () {
        this.buttonActions('prevPage')
      },
      [KEY75] () {
        this.buttonActions('nextPage')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [LONG_KEY73] () {
        this.buttonActions('prevPage')
      },
      [LONG_KEY75] () {
        this.buttonActions('nextPage')
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [KEY85] () {
        console.log('tapppppp')
        this.buttonActions('collect')
      },
      [BACK_PRESSED] () {
        this.buttonActions('back')
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
            this.buttonActions('back')
        }
      },
      chooseType: {
        [TOOLBAR_PRESSED] ({hidden}) {
          this.toolbarHidden = hidden
        },
        [KEY70] () {
          this.buttonActions('choseType', 1)
        },
        [KEY78] () {
          this.buttonActions('choseType', 2)
        },
        [KEY85] () {
          this.buttonActions('choseType', 3)
        },
        [KEY92] () {
          this.buttonActions('choseType', 4)
        },
        [KEY99] () {
          this.buttonActions('choseType', 5)
        },
        [BACK_PRESSED] () {
          if (this.toolbarHidden) this.toolbarHidden = false
          this.chooseType = false
        },
        [PEDAL_PRESSED] (key) {
          if (key.id === 119) {
            if (this.toolbarHidden) this.toolbarHidden = false
            this.chooseType = false
          }
        }
      }
    },
    computed: {
      ...mapState({
        scoreIndex: state => {
          return state.scoreList.scoreIndex
        },
        scoreList: function (state) {
          let query = this.query
          let arr = ''
          if (query.differ) {
            arr = state.storage.cache.renderCache.scoreList[JSON.parse(query.differ).id]
          } else if (query.year) {
            arr = state.storage.cache.renderCache.scoreList[JSON.parse(query.year).id]
          } else if (query.famous) {
            arr = state.storage.cache.renderCache.scoreList[JSON.parse(query.famous).id]
          } else {
            arr = state.storage.cache.renderCache.scoreList[JSON.parse(query.book).bookId]
          }
          this.hasLoaded = arr
          if (arr) {
            eventsHub.$emit('closeToast')
            arr = arr || []
            if (arr.length > 0) {
              this.dataError = false
              this.collet = arr[this.scoreIndex] ? arr[this.scoreIndex].collect : []
              let flag = false
              this.collet && this.collet.forEach((item) => {
                if (item.collection) { flag = true }
              })
              if (flag) {
                this.controlButtons[5].icon = '0xe656'
              } else {
                this.controlButtons[5].icon = '0xe653'
              }
            }
          }
          return arr || []
        },
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        },
        localCollect: state => state.storage.localCollect
      }),
      ...mapGetters([]),
      files () {
        return this.scoreList[this.scoreIndex] ? this.scoreList[this.scoreIndex].files : []
      },
      collect () {
        return this.scoreList[this.scoreIndex] ? this.scoreList[this.scoreIndex].collect : []
      },
      namespace () {
        return this.chooseType ? 'chooseType' : ''
      }
    },
    methods: {
      getScoreList () {
        console.log(this.$route.query, 'this.$route')
        let query = this.query
        let id = 0
        let typeName = 'other'
        if (query.differ) {
          id = JSON.parse(query.differ).id
        } else if (query.year) {
          id = JSON.parse(query.year).id
        } else if (query.famous) {
          typeName = 'musicScore'
          id = JSON.parse(query.famous).id
        } else {
          id = JSON.parse(query.book).bookId
          typeName = 'musicScore'
        }
        this.$store.dispatch({type: 'scoreList/getScoreList', typeName: typeName, id: id}).then((data) => {
          if (this.hasLoaded || data.scoreList) {
            // 有缓存
            eventsHub.$emit('closeToast')
            let musicId = parseInt(this.query.musicId)
            if (musicId) {
              // 光标定到指定曲目
              this.scoreList.forEach((item, index) => {
                if (item.files) {
                  item.files.forEach((item1) => {
                    if (item1.musicId === musicId) {
                      return this.$store.dispatch('scoreList/setScoreListIndex', index)
                    }
                  })
                }
              })
            }
          } else {
            errorHandling(data)
          }
        })
      },
      /**
       * @desc 设置选中并点击
       * */
      setSelect (index) {
        this.$store.dispatch('scoreList/setScoreListIndex', index).then(() => {
          this.buttonActions('ok')
        })
      },
      /**
       * @desc 鼠标点击操作
       * */
      clickPlay (index) {
        this.buttonActions('choseType', index)
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type, typeNum) {
        let scoreIndex = this.scoreIndex
        let scoreList = [].concat(JSON.parse(JSON.stringify(this.scoreList)))
        let files = this.files
        let isLogin = this.isLogin
        if (scoreList.length === 0 && type !== 'back') {
          return
        }
        switch (type) {
          case 'prevPage' :
            console.log('prevPage')
            scoreIndex -= 10
            scoreIndex = Math.max(scoreIndex, 0)
            this.$store.dispatch('scoreList/setScoreListIndex', scoreIndex)
            break
          case 'nextPage':
            console.log('nextPage')
            scoreIndex += 10
            scoreIndex = Math.min(scoreIndex, scoreList.length - 1)
            this.$store.dispatch('scoreList/setScoreListIndex', scoreIndex)
            break
          case 'up' :
            console.log('up')
            scoreIndex--
            scoreIndex = Math.max(scoreIndex, 0)
            this.$store.dispatch('scoreList/setScoreListIndex', scoreIndex)
            break
          case 'down':
            console.log('down')
            scoreIndex++
            scoreIndex = Math.min(scoreIndex, scoreList.length - 1)
            this.$store.dispatch('scoreList/setScoreListIndex', scoreIndex)
            break
          case 'ok':
            console.log('ok')
            if (scoreList[scoreIndex].files.length > 1) {
              this.chooseType = true
              this.bannerType = 'play'
              return
            }
            console.log('直接去播放曲谱')
            this.player(scoreList[scoreIndex], 1)
            this.addRecentOpen(scoreList[scoreIndex], 1)
            this.$store.dispatch('addPractice')
            break
          case 'back':
            this.$router.back()
            this.$store.dispatch('scoreList/setScoreListIndex', 0)
            break
          case 'collect':
            console.log('tapptap')
            if (scoreList[scoreIndex].files.length > 1) {
              // 多版本收藏
              this.chooseType = true
              this.bannerType = 'collect'
            } else {
              // 单版本收藏
              this.bannerType = 'collect'
              this.buttonActions('choseType', 1)
            }
            break
          case 'choseType':
            if (files.length < typeNum) {
              return
            }
            let bookId = scoreList[scoreIndex].bookId
            let id = 0
            if (this.query.book) {
              id = JSON.parse(this.query.book).bookId
            } else if (this.query.differ) {
              id = JSON.parse(this.query.differ).id
            } else if (this.query.year) {
              id = JSON.parse(this.query.year).id
            } else if (this.query.famous) {
              id = JSON.parse(this.query.famous).id
            }

            let hasCollected = false
            let musicId = scoreList[scoreIndex].files[typeNum - 1].musicId
            let flag = 0
            if (scoreList[scoreIndex].collect) flag = scoreList[scoreIndex].collect[typeNum - 1].collection
            if (flag) {
              this.controlButtons[5].icon = '0xe653'
            } else {
              this.controlButtons[5].icon = '0xe656'
            }
            let musicData = {
              musicId: musicId,
              bookId: bookId,
              name: scoreList[scoreIndex].name,
              bookName: scoreList[scoreIndex].bookName,
              time: new Date().getTime(),
              styleName: [scoreList[scoreIndex].files[typeNum - 1].styleName] || []
            }
            if (this.bannerType === 'collect') {
              if (!isLogin) {
                // 没有登录的话 操作本地收藏列表
                let localCollect = [].concat(JSON.parse(JSON.stringify(this.localCollect)))
                let localCollectIndex = 0
                localCollect.forEach((value, index) => {
                  if (value.musicId === files[typeNum - 1].musicId) {
                    hasCollected = true
                    localCollectIndex = index
                  }
                })
                if (!scoreList[scoreIndex].collect[typeNum - 1].collection) {
                  // 加入收藏
                  localCollect.unshift(musicData)
                } else {
                  if (hasCollected) {
                    // 删除这一条数据
                    localCollect.splice(localCollectIndex, 1)
                  }
                }
                localCollect = localCollect.slice(0, 20)
                this.$store.dispatch('index/localCollect', localCollect).then(() => {
                  scoreList[scoreIndex].collect[typeNum - 1].collection = !flag
                  console.log(flag)
                  this.$store.dispatch('scoreList/setCollect', {scoreList: scoreList, bookId: id})
                })
                return
              }
              scoreList[scoreIndex].collect[typeNum - 1].collection = !flag
              this.$store.dispatch('scoreList/setCollect', {scoreList: scoreList, bookId: id, musicId: musicId, flag: scoreList[scoreIndex].collect[typeNum - 1].collection})
            } else {
              console.log('去播放曲谱')
              this.addRecentOpen(scoreList[scoreIndex], typeNum)
              this.player(scoreList[scoreIndex], typeNum)
              this.$store.dispatch('addPractice')
            }
            break
          default:
            console.log('108')
        }
      },
      // 播放曲谱
      player (musicObj, typeNum) {
        this.chooseType = false
        if (this.stopEvent) {
          return
        }
        this.stopEvent = true
        let musicId = parseInt(musicObj.files[typeNum - 1].musicId)
        let musicIds = []
        let allMusics = []
        let styleId = musicObj.files[typeNum - 1].styleId
        this.scoreList.forEach((data) => {
          let id = data.musicId
          let eachMusic = {}
          let musicVersions = []
          eachMusic.bookName = data.bookName || ''
          eachMusic.musicOrigin = 'bookList'
          eachMusic.musicId = data.musicId
          eachMusic.musicName = data.name
          eachMusic.curMusicId = data.files[0].musicId
          eachMusic.styleId = data.files[0].styleId
          eachMusic.styleName = data.files[0].styleName
          data.files.forEach((item) => {
            if (styleId === item.styleId) {
              eachMusic.curMusicId = item.musicId
              eachMusic.styleId = item.styleId
              id = item.musicId
              eachMusic.styleName = item.styleName
            }
            musicVersions.push({musicId: item.musicId, version: item.styleName || ''})
          })
          musicIds.push(parseInt(id))
          eachMusic.musicVersions = musicVersions
          allMusics.push(eachMusic)
        })
        console.log({info: {musicId, musicIds, allMusics}})
        this.$nextTick(() => {
          modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics})
        })
      },
      // 加入最近打开
      addRecentOpen (musicObj, typeNum) {
        let recentObj = {
          musicId: musicObj.files[typeNum - 1].musicId,
          bookId: musicObj.bookId,
          bookName: musicObj.bookName,
          name: musicObj.name,
          styleName: [musicObj.files[typeNum - 1].styleName || ''],
          practiceTime: +new Date()
        }
        if (recentObj) {
          if (!this.isLogin) {
            this.$store.dispatch('index/localRecent', recentObj)
          } else {
            this.$store.dispatch('index/addRecentOpen', recentObj)
          }
          // 重新拿数据
          this.getScoreList()
        }
      },
      addBookViewMount (bookId) {
        let book = this.query.book
        if (book) {
          if (JSON.parse(book).bookId) {
            this.$store.dispatch('scoreList/addBookViewMount', {bookId: JSON.parse(book).bookId})
          }
        }
      },
      adjustPlayer () {
        modules.notification.regist('pageLifecycle', data => {
          console.log(data)
          // 曲谱关闭
          if (data.case === 'resume') {
            this.stopEvent = false
          }
        })
      }
    },
    created () {
      this.getScoreList()
      this.addBookViewMount()
    },
    beforeDestroy () {
      eventsHub.$emit('closeToast')
    },
    mounted () {
      eventsHub.$emit('toast')
      this.adjustPlayer()
    },
    components: {
      scoreListCenter,
      scoreListMusicDetail,
      scoreListChooseType,
      scoreListLeftDeffer,
      scoreListLeftYear,
      scoreListLeftStyle,
      scoreListChooseButtons,
      statusBar,
      scoreListLeftFamous
    }
  }
</script>
<style lang="scss" scoped>
  .scoreList {
      width: 100%;
      height: 100%;
    .left {
      position: absolute;
      width: 860px;
      height: 100%;
      top: 0;
      left: 0;
      background:rgba(0,0,0,0.1);
      &::before {
        content: '';
        position: absolute;
        top: 255px;
        right: 0;
        width: 3px;
        height: 570px;
        background: url('./images/line.png');
        background-size: cover;

      }
    }
  }
</style>
