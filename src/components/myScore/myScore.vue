<template>
  <div class="myScore">
    <statusBar/>
    <find-wrap :title="title" :pagination=false>
        <div class="logo iconfont icon-logo"> </div>
        <find-localSource :localSource="localSource" v-show="myScoreTapIndex === 0" :localSourceIndex="localSourceIndex"/>
        <find-localMid :list="myRecord" v-show="myScoreTapIndex === 2" :listIndex="myRecordIndex"/>
        <find-localMid :list="myPlay" v-show="myScoreTapIndex === 3" :listIndex="myPlayIndex"/>
        <find-userMess v-show="myScoreTapIndex === 1"
        :list="isLogin?collectList:localCollect"
        :rightTitle="`收藏时间`"
        :listIndex="myCollectIndex"/>
        <find-userMess v-show="myScoreTapIndex === 4"
        :rightTitle="`最近打开时间`"
        :list="isLogin?recentOpenList:localRecent"
        :listIndex="myRecentIndex"/>
    </find-wrap>
    <find-tap-buttons :myScoreTapIndex="myScoreTapIndex"/>
    <toolbar :hidden="toolbarHidden">
        <icon-item v-for="(button) in controlButtons"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :hidden="!button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.id===myScoreTapIndex?button.activeColor: button.dotColor}"/>
    </toolbar>
  </div>

</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import findWrap from '../common/find-wrap/find-wrap'
  import findLocalSource from './find-localSource'
  import findLocalMid from './find-localMid'
  import findTapButtons from './find-tap-buttons'
  import findUserMess from './find-userMess'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import { file } from 'find-sdk'
  import {
    KEY39,
    KEY42,
    KEY46,
    KEY49,
    KEY54,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY90,
    BACK_PRESSED
  } from 'vue-find'
  export default {
    data () {
      return {
        toolbarHidden: true,
        controlButtons: [
          {
            pianoKey: 39,
            text: '',
            icon: '',
            dotColor: '#1bb3ff',
            activeColor: '#fff',
            id: 0,
            show: true
          },
          {
            pianoKey: 42,
            text: '',
            icon: '',
            dotColor: '#dc50ff',
            activeColor: '#fff',
            id: 1,
            show: true
          },
          {
            pianoKey: 46,
            text: '',
            icon: '',
            dotColor: '#00be93',
            activeColor: '#fff',
            id: 2,
            show: true
          },
          {
            pianoKey: 49,
            text: '',
            icon: '',
            dotColor: '#dfbb39',
            activeColor: '#fff',
            id: 3,
            show: true
          },
          {
            pianoKey: 54,
            text: '',
            icon: '',
            dotColor: '#941bff',
            activeColor: '#fff',
            id: 4,
            show: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 5,
            show: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 6,
            show: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#109892',
            dotColor: '#109892',
            id: 7,
            show: true
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe642',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 8,
            show: false
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63d',
            backgroundColor: '#8D45FF',
            dotColor: '#8D45FF',
            id: 9,
            show: false
          }
        ],
        title: '最近打开',
        dirName: ''
      }
    },
    find: {
      [KEY39] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 0)
        this.controlButtons[this.controlButtons.length - 2].show = false
        this.controlButtons[this.controlButtons.length - 1].show = false
      },
      [KEY42] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 1)
        this.controlButtons[this.controlButtons.length - 2].show = true
        this.controlButtons[this.controlButtons.length - 1].show = true
      },
      [KEY46] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 2)
        this.controlButtons[this.controlButtons.length - 2].show = true
        this.controlButtons[this.controlButtons.length - 1].show = false
      },
      [KEY49] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 3)
        this.controlButtons[this.controlButtons.length - 2].show = false
        this.controlButtons[this.controlButtons.legnth - 1].show = false
      },
      [KEY54] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 4)
        this.controlButtons[this.controlButtons.length - 2].show = false
        this.controlButtons[this.controlButtons.length - 1].show = true
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
        this.buttonActions('delete')
      },
      [KEY90] () {
        this.buttonActions('scoreList')
      },
      [BACK_PRESSED] () {
        this.buttonActions('back')
      }
    },
    computed: {
      ...mapState({
        myScoreTapIndex: function (state) {
          if (state.myScore.myScoreTapIndex === 1 || state.myScore.myScoreTapIndex === 2) {
            this.controlButtons[this.controlButtons.length - 2].show = true
          }
          if (state.myScore.myScoreTapIndex === 1 || state.myScore.myScoreTapIndex === 4) {
            this.controlButtons[this.controlButtons.length - 1].show = true
          }
          return state.myScore.myScoreTapIndex
        },
        localSourceIndex: state => state.myScore.localSourceIndex,
        localSourcePath: state => state.myScore.localSourcePath,
        localSource: state => state.myScore.localSource,
        myRecordIndex: state => state.myScore.myRecordIndex,
        myRecord: state => state.myScore.myRecord,
        myPlayIndex: state => state.myScore.myPlayIndex,
        myPlay: state => state.myScore.myPlay,
        myCollectIndex: state => state.myScore.myCollectIndex,
        myRecentIndex: state => state.myScore.myRecentIndex,
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        }
      }),
      ...mapGetters(['localCollect', 'collectList', 'recentOpenList', 'localRecent', 'bookInfo'])

    },
    watch: {
      localSource (value, old) {
        value.forEach((item, index) => {
          if (item.name === this.dirName) {
            this.$store.dispatch('myScore/setLocalSourceIndex', index)
          }
        })
      },
      myScoreTapIndex (value, old) {
        if (value !== old) {
          let dotColor = ['#1bb3ff', '#dc50ff', '#00be93', '#dfbb39', '#941bff']
          let title = ['本地资源', '我的收藏', '我的录音', '我的弹奏', '最近打开']
          this.controlButtons[value].dotColor = '#fff'
          this.controlButtons[old].dotColor = dotColor[value]
          this.title = title[value]
        }
      }
    },
    methods: {
      /**
       * @desc 右侧最近打开数据
       * */
      getRecentOpenList () {
        if (this.isLogin) {
          this.$store.dispatch({type: 'index/getRecentOpenList'})
        }
      },
      /**
       * @desc 右侧我的收藏数据
       * */
      getCollectList () {
        if (this.isLogin) {
          this.$store.dispatch({type: 'index/getCollectList'})
        }
      },
      getLocalSource () {
        return this.$store.dispatch('myScore/getLocalSource', this.localSourcePath)
      },
      getMyRecord () {
        return this.$store.dispatch('myScore/getMyRecord')
      },
      getMyPlay () {
        return this.$store.dispatch('myScore/getMyPlay')
      },
      /**
       * @desc 本地资源
       * */
      localSourceButtonAction (type) {
        let localSourceIndex = this.localSourceIndex
        let localSourcePath = this.localSourcePath
        let localSource = this.localSource
        let length = localSource.length
        let myScoreTapIndex = this.myScoreTapIndex
        switch (type) {
          case 'up':
            localSourceIndex--
            localSourceIndex = Math.max(localSourceIndex, 0)
            this.$store.dispatch('myScore/setLocalSourceIndex', localSourceIndex)
            break
          case 'down':
            localSourceIndex++
            localSourceIndex = Math.min(localSourceIndex, length - 1)
            this.$store.dispatch('myScore/setLocalSourceIndex', localSourceIndex)
            break
          case 'ok':
            let data = localSource[localSourceIndex]
            if (data) {
              if (data.type === 'dir') {
                let newPath = this.localSourcePath + '/' + data.name
                console.log(newPath)
                this.$store.dispatch('myScore/setLocalSourceIndex', 0)
                this.$store.dispatch('myScore/setLocalSourcePath', newPath)
                this.$store.dispatch('myScore/getLocalSource', newPath)
              } else {
                // 去打开文件
                if (data.typeName === 'picture') {
                  file.pathComplement(this.localSourcePath).then((res) => {
                    this.$router.push({path: '/openImg', query: {url: res + '/' + data.name}})
                  })
                }
              }
            }
            break
          case 'back':
            if (myScoreTapIndex === 0 && localSourcePath !== '$userUpload') {
              let pathArr = localSourcePath.split('/')
              this.dirName = pathArr.pop()
              let newPath = pathArr.join('/')
              this.$store.dispatch('myScore/setLocalSourcePath', newPath)
              this.$store.dispatch('myScore/getLocalSource', newPath)
            } else {
              this.$router.back()
              this.destroyedFunc()
            }
        }
      },
      /**
       * @desc 我的录音
       * */
      myRecordButtonAction (type) {
        let myRecordIndex = this.myRecordIndex
        let myRecord = this.myRecord
        let length = myRecord.length
        switch (type) {
          case 'up':
            myRecordIndex--
            myRecordIndex = Math.max(myRecordIndex, 0)
            this.$store.dispatch('myScore/setMyRecordIndex', myRecordIndex)
            break
          case 'down':
            myRecordIndex++
            myRecordIndex = Math.min(myRecordIndex, length - 1)
            this.$store.dispatch('myScore/setMyRecordIndex', myRecordIndex)
            break
          case 'ok':
            let data = myRecord[myRecordIndex]
            if (data) {
              //  去播放midi
            }
            break
          case 'delete':
            console.log('删除这条录音')
            break
          case 'back':
            this.$router.back()
            this.destroyedFunc()
        }
      },
      /**
       * @desc 我的弹奏
       * */
      myPlayButtonAction (type) {
        let myPlayIndex = this.myPlayIndex
        let myPlay = this.myPlay
        let length = myPlay.length
        switch (type) {
          case 'up':
            myPlayIndex--
            myPlayIndex = Math.max(myPlayIndex, 0)
            this.$store.dispatch('myScore/setMyPlayIndex', myPlayIndex)
            break
          case 'down':
            myPlayIndex++
            myPlayIndex = Math.min(myPlayIndex, length - 1)
            this.$store.dispatch('myScore/setMyPlayIndex', myPlayIndex)
            break
          case 'ok':
            let data = myPlay[myPlayIndex]
            if (data) {
              //  去播放midi
            }
            break
          case 'back':
            this.destroyedFunc()
            return this.$router.back()
        }
      },
      /**
       * @desc 我的收藏
       * */
      myCollectButtonAction (type) {
        let myCollectIndex = this.myCollectIndex
        let collectList1 = this.isLogin ? this.collectList : this.localCollect
        let collectList = [].concat(JSON.parse(JSON.stringify(collectList1)))
        let length = collectList.length
        if (length === 0) {
          return
        }
        let musicId = collectList[myCollectIndex].musicId
        let bookId = collectList[myCollectIndex].bookId
        switch (type) {
          case 'up':
            myCollectIndex--
            myCollectIndex = Math.max(myCollectIndex, 0)
            this.$store.dispatch('myScore/setMyCollectIndex', myCollectIndex)
            break
          case 'down':
            myCollectIndex++
            myCollectIndex = Math.min(myCollectIndex, length - 1)
            this.$store.dispatch('myScore/setMyCollectIndex', myCollectIndex)
            break
          case 'ok':
            let data = collectList[myCollectIndex]
            if (data) {
              //  去播放midi
            }
            break
          case 'scoreList':
            if (bookId && musicId) {
              if (!this.bookInfo[bookId]) {
                return
              }
              this.$store.dispatch('myScore/getBookInfo', bookId).then(() => {
                this.$router.push({path: '/scoreList', query: {book: JSON.stringify(this.bookInfo[bookId]), musicId: musicId}})
              })
            }
            break
          case 'delete':
            console.log('删除这条收藏的数据')
            if (!musicId || !bookId) {
              return
            }
            console.log(collectList)
            if (!this.isLogin) {
              collectList.splice(myCollectIndex, 1)
              this.$store.dispatch('index/localCollect', collectList)
            } else {
              this.$store.dispatch('scoreList/setCollect', {bookId: bookId, musicId: musicId, flag: 0})
              this.$store.dispatch({type: 'index/getCollectList'})
            }
            if (this.myCollectIndex - 1 >= 0) {
              this.$store.dispatch('myScore/setMyCollectIndex', myCollectIndex - 1)
            }
            break
          case 'back':
            this.destroyedFunc()
            return this.$router.back()
        }
      },
      /**
       * @desc 最近打开
       * */
      recentOpenButtonAction (type) {
        let myRecentIndex = this.myRecentIndex
        let recentList = this.isLogin ? this.recentOpenList : this.localRecent
        let length = recentList.length
        if (length === 0) {
          return
        }
        let bookId = recentList[myRecentIndex].bookId
        let musicId = recentList[myRecentIndex].musicId
        switch (type) {
          case 'up':
            myRecentIndex--
            myRecentIndex = Math.max(myRecentIndex, 0)
            this.$store.dispatch('myScore/setRecentIndex', myRecentIndex)
            break
          case 'down':
            myRecentIndex++
            myRecentIndex = Math.min(myRecentIndex, length - 1)
            this.$store.dispatch('myScore/setRecentIndex', myRecentIndex)
            break
          case 'ok':
            let data = recentList[myRecentIndex]
            if (data) {
              //  去播放midi
            }
            break
          case 'back':
            this.$router.back()
            return this.destroyedFunc()
          case 'scoreList':
            if (bookId && musicId) {
              this.$store.dispatch('myScore/getBookInfo', bookId).then(() => {
                if (!this.bookInfo[bookId]) {
                  return
                }
                this.$router.push({path: '/scoreList', query: {book: JSON.stringify(this.bookInfo[bookId]), musicId: musicId}})
              })
            }
            break
        }
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let myScoreTapIndex = this.myScoreTapIndex
        switch (myScoreTapIndex) {
          case 0:
            this.localSourceButtonAction(type)
            break
          case 1:
            this.myCollectButtonAction(type)
            break
          case 2:
            this.myRecordButtonAction(type)
            break
          case 3:
            this.myPlayButtonAction(type)
            break
          case 4:
            this.recentOpenButtonAction(type)
            break
        }
      },
      /**
       * @desc 退到首页的时候清空
       * */
      destroyedFunc () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 4)
        this.$store.dispatch('myScore/setLocalSourceIndex', 0)
        this.$store.dispatch('myScore/setMyRecordIndex', 0)
        this.$store.dispatch('myScore/setMyPlayIndex', 0)
        this.$store.dispatch('myScore/setMyCollectIndex', 0)
        this.$store.dispatch('myScore/setRecentIndex', 0)
      }

    },
    created () {
      this.getRecentOpenList()
      this.getCollectList()
      this.getLocalSource()
      this.getMyRecord()
      this.getMyPlay()
    },
    mounted () {
      setTimeout(() => {
        this.toolbarHidden = false
      }, 500)
    },
    components: {
      findWrap,
      findLocalSource,
      findTapButtons,
      findLocalMid,
      findUserMess,
      statusBar
    }
  }
</script>
<style lang="scss" scoped type=text/scss>
  .myScore {
    width: 100%;
    height: 100%;
    position: relative;
    .logo {
        font-size: 360px;
        position: absolute;
        top: 50%;
        left: 25%;
        color: rgba(255,255,255,0.6);
        transform: translate(-50%,-50%)
    }
  }
</style>
