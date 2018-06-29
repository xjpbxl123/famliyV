<template>
  <div class="scoreList">
      <div class="left">
        <scoreListLeftDeffer v-if="query.differ" :differ="JSON.parse(query.differ)"></scoreListLeftDeffer>
        <scoreListLeftYear v-if="query.year" :year="JSON.parse(query.year)"></scoreListLeftYear>
        <scoreListLeftStyle v-if="!query.differ && !query.year" :book="JSON.parse(query.book)"></scoreListLeftStyle>
      </div>
      <scoreList-center :scoreList="scoreList" :scoreIndex="scoreIndex"/>
      <scoreList-music-detail :scoreList="scoreList" :scoreIndex="scoreIndex"/>

      <find-cover :activeNamespace="namespace">
        <scoreList-choose-type  v-if="chooseType" :files="files" :bannerType="bannerType" :collect="collect"/>
        <scoreList-choose-buttons  v-if="chooseType" :files="files" />
      </find-cover>
      <toolbar :hidden="chooseType">
        <icon-item v-for="(button,index) in controlButtons"
                :key="index"
                :id=button.id
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
  import scoreListLeftYear from './scoreList-left-year'
  import scoreListLeftStyle from './scoreList-left-style'
  import {
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    INTERCEPT_DOWN,
    BACK_PRESSED
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
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 11
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe64c',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 12
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 13
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 14
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#109892',
            dotColor: '#109892',
            id: 15
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe653',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 16
          }
        ]
      }
    },
    watch: {
      scoreList: function (value, old) {
        this.collet = value[this.scoreIndex] ? value[this.scoreIndex].collect : []
        let flag = false
        this.collet && this.collet.forEach((item) => {
          if (item.collection) { flag = true }
        })
        if (flag) {
          this.controlButtons[5].icon = '0xe656'
        } else {
          this.controlButtons[5].icon = '0xe653'
        }
      },
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
      [KEY82] () {
        this.buttonActions('ok')
      },
      [KEY85] () {
        this.buttonActions('collect')
      },
      [BACK_PRESSED] () {
        this.buttonActions('back')
      },
      chooseType: {
        [INTERCEPT_DOWN] (key) {
          if (key >= 67 && key <= 72) {
            this.buttonActions('choseType', 1)
          } else if (key >= 74 && key <= 79) {
            this.buttonActions('choseType', 2)
          } else if (key >= 81 && key <= 86) {
            this.buttonActions('choseType', 3)
          } else if (key >= 88 && key <= 93) {
            this.buttonActions('choseType', 4)
          } else if (key >= 95 && key <= 100) {
            this.buttonActions('choseType', 5)
          } else if (key === 108) {
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
          if (query.differ) {
            return state.storage.cache.renderCache.scoreList[JSON.parse(query.differ).id] || [{name: ''}]
          } else if (query.year) {
            return state.storage.cache.renderCache.scoreList[JSON.parse(query.year).id] || [{name: ''}]
          } else {
            return state.storage.cache.renderCache.scoreList[JSON.parse(query.book).bookId] || [{name: ''}]
          }
        },
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        }
      }),
      ...mapGetters(['localCollect']),
      files () {
        return this.scoreList[this.scoreIndex] ? this.scoreList[this.scoreIndex].files : []
      },
      collect () {
        return this.scoreList[this.scoreIndex] ? this.scoreList[this.scoreIndex].collect : []
      },
      namespace () {
        console.log(this.chooseType)
        return this.chooseType ? 'chooseType' : ''
      }
    },
    methods: {
      getScoreList () {
        console.log(this.$route.query, 'this.$route')
        let query = this.query
        let id = 0
        let typeName = ''
        if (query.differ) {
          id = JSON.parse(query.differ).id
        } else if (query.year) {
          id = JSON.parse(query.year).id
        } else {
          id = JSON.parse(query.book).bookId
          typeName = 'musicScore'
        }
        this.$store.dispatch({type: 'scoreList/getScoreList', typeName: typeName, id: id}).then(() => {
          let musicId = parseInt(this.query.musicId)
          if (musicId) {
            // 光标定到指定曲目
            this.scoreList.forEach((item, index) => {
              if (item.files) {
                item.files.forEach((item1) => {
                  console.log(item1.musicId)
                  if (item1.musicId === musicId) {
                    return this.$store.dispatch('scoreList/setScoreListIndex', index)
                  }
                })
              }
            })
          }
        })
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type, typeNum) {
        let scoreIndex = this.scoreIndex
        let scoreList = [].concat(JSON.parse(JSON.stringify(this.scoreList)))
        let files = this.files
        let isLogin = this.isLogin
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
            break
          case 'back':
            this.$router.back()
            this.$store.dispatch('scoreList/setScoreListIndex', 0)
            break
          case 'collect':
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

            console.log('choseType')
            let bookId = scoreList[scoreIndex].bookId
            let id = 0
            if (this.query.book) {
              id = JSON.parse(this.query.book).bookId
            } else if (this.query.differ) {
              id = JSON.parse(this.query.differ).id
            } else if (this.query.year) {
              id = JSON.parse(this.query.year).id
            }

            let hasCollected = false
            let musicId = scoreList[scoreIndex].files[typeNum - 1].musicId
            let flag = scoreList[scoreIndex].collect[typeNum - 1].collection
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
            if (files.length >= typeNum) {
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
                console.log('去播放')
              }
            }
            break
          default:
            console.log('108')

            // this.goBack()
        }
      }
    },
    created () {
      this.getScoreList()
    },
    components: {
      scoreListCenter,
      scoreListMusicDetail,
      scoreListChooseType,
      scoreListLeftDeffer,
      scoreListLeftYear,
      scoreListLeftStyle,
      scoreListChooseButtons
    }
  }
</script>
<style lang="scss" scoped>
  .scoreList {
      width: 100%;
      height: 100%;
    .left {
      position: absolute;
      width: 850px;
      height: 100%;
      top: 0;
      left: 0;
    }

  }
</style>
