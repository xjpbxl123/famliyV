<template>
  <div class="scoreList">
      <div class="left">
        <!-- <scoreListLeftDeffer></scoreListLeftDeffer> -->
        <!-- <scoreListLeftYear></scoreListLeftYear> -->
        <scoreListLeftStyle :book="book"></scoreListLeftStyle>
      </div>
      <scoreList-center :scoreList="scoreList" :scoreIndex="scoreIndex"/>
      <scoreList-music-detail :scoreList="scoreList" :scoreIndex="scoreIndex"/>
      <!-- <div class="bottom">
        <scoreList-control-buttons :collect="collect"/>
      </div> -->
      <find-cover :activeNamespace="namespace" v-if="chooseType">
        <scoreList-choose-type :files="files" :bannerType="bannerType" :collect="collect"/>
        <scoreList-choose-button :files="files" />
      </find-cover>
      <toolbar v-if="!chooseType">
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
  import scoreListControlButtons from './scoreList-control-buttons'
  import scoreListChooseType from './scoreList-choose-type'
  import scoreListChooseButton from './scoreList-choose-button'
  import scoreListLeftDeffer from './scoreList-left-deffer'
  import scoreListLeftYear from './scoreList-left-year'
  import scoreListLeftStyle from './scoreList-left-style'
  import {
    KEY67,
    KEY68,
    KEY69,
    KEY70,
    KEY71,
    KEY72,
    KEY73,
    KEY74,
    KEY75,
    KEY76,
    KEY77,
    KEY78,
    KEY79,
    KEY80,
    KEY81,
    KEY82,
    KEY83,
    KEY84,
    KEY85,
    KEY86,
    KEY88,
    KEY89,
    KEY90,
    KEY91,
    KEY92,
    KEY93,
    KEY95,
    KEY96,
    KEY97,
    KEY98,
    KEY99,
    KEY100,
    KEY108
  } from 'vue-find'
  export default {
    data () {
      return {
        chooseType: false,
        bannerType: '',
        book: this.$route.query.book,
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
            id: 15
          }
        ]
      }
    },
    watch: {
      scoreList: function (value) {
        console.log(value, 'value')
        this.collet = value[this.scoreIndex] ? value[this.scoreIndex].collect : []
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
      [KEY108] () {
        this.buttonActions('back')
      },
      chooseType: {
        [KEY67] () {
          this.buttonActions('choseType', 1)
        },
        [KEY68] () {
          this.buttonActions('choseType', 1)
        },
        [KEY69] () {
          this.buttonActions('choseType', 1)
        },
        [KEY70] () {
          this.buttonActions('choseType', 1)
        },
        [KEY71] () {
          this.buttonActions('choseType', 1)
        },
        [KEY72] () {
          this.buttonActions('choseType', 1)
        },
        [KEY74] () {
          this.buttonActions('choseType', 2)
        },
        [KEY75] () {
          this.buttonActions('choseType', 2)
        },
        [KEY76] () {
          this.buttonActions('choseType', 2)
        },
        [KEY77] () {
          this.buttonActions('choseType', 2)
        },
        [KEY78] () {
          this.buttonActions('choseType', 2)
        },
        [KEY79] () {
          this.buttonActions('choseType', 2)
        },
        [KEY81] () {
          this.buttonActions('choseType', 3)
        },
        [KEY82] () {
          this.buttonActions('choseType', 3)
        },
        [KEY83] () {
          this.buttonActions('choseType', 3)
        },
        [KEY84] () {
          this.buttonActions('choseType', 3)
        },
        [KEY85] () {
          this.buttonActions('choseType', 3)
        },
        [KEY86] () {
          this.buttonActions('choseType', 3)
        },
        [KEY88] () {
          this.buttonActions('choseType', 4)
        },
        [KEY89] () {
          this.buttonActions('choseType', 4)
        },
        [KEY90] () {
          this.buttonActions('choseType', 4)
        },
        [KEY91] () {
          this.buttonActions('choseType', 4)
        },
        [KEY92] () {
          this.buttonActions('choseType', 4)
        },
        [KEY93] () {
          this.buttonActions('choseType', 4)
        },
        [KEY95] () {
          this.buttonActions('choseType', 5)
        },
        [KEY96] () {
          this.buttonActions('choseType', 5)
        },
        [KEY97] () {
          this.buttonActions('choseType', 5)
        },
        [KEY98] () {
          this.buttonActions('choseType', 5)
        },
        [KEY99] () {
          this.buttonActions('choseType', 5)
        },
        [KEY100] () {
          this.buttonActions('choseType', 5)
        },
        [KEY108] () {
          console.log('108')
          this.chooseType = false
        }
      }
    },
    computed: {
      ...mapState({
        scoreIndex: state => state.scoreList.scoreIndex,
        scoreList: function (state) {
          return state.storage.cache.renderCache.scoreList[this.$route.query.book.bookId] || [{name: ''}]
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
        return this.chooseType ? 'chooseType' : ''
      }
    },
    methods: {
      getScoreList () {
        let bookId = this.$route.query.book.bookId
        this.$store.dispatch({type: 'scoreList/getScoreList', bookId: bookId})
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
            this.$router.push('/')
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
            let hasCollected = false
            let musicId = scoreList[scoreIndex].files[typeNum - 1].musicId
            let flag = scoreList[scoreIndex].collect[typeNum - 1].collection
            let musicData = {
              musicId: musicId,
              bookId: bookId,
              musicName: scoreList[scoreIndex].name,
              bookName: scoreList[scoreIndex].bookName,
              time: new Date().getTime(),
              styleName: [scoreList[scoreIndex].files[typeNum - 1].styleName]
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
                  this.$store.dispatch('index/localCollectList', localCollect).then(() => {
                    scoreList[scoreIndex].collect[typeNum - 1].collection = !flag
                    this.$store.dispatch('scoreList/setCollect', {scoreList: scoreList, bookId: bookId})
                  })
                  return
                }
                scoreList[scoreIndex].collect[typeNum - 1].collection = !flag
                this.$store.dispatch('scoreList/setCollect', {scoreList: scoreList, bookId: bookId, musicId: musicId, flag: scoreList[scoreIndex].collect[typeNum - 1].collection})
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
      scoreListControlButtons,
      scoreListChooseType,
      scoreListChooseButton,
      scoreListLeftDeffer,
      scoreListLeftYear,
      scoreListLeftStyle
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
