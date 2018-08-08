<template>
  <div class="myScore">
    <statusBar/>
    <find-wrap :title="title" :pagination=false>
        <div class="logo iconfont icon-logo"> </div>
        <find-localSource :localSource="localSource" v-show="myScoreTapIndex === 0" :localSourceIndex="localSourceIndex" :setSelect="setSelect"/>
        <find-localMid :list="myRecord" v-show="myScoreTapIndex === 2" :listIndex="myRecordIndex" :setSelect="setSelect"/>
        <find-localMid :list="myPlay" v-show="myScoreTapIndex === 3" :listIndex="myPlayIndex" :setSelect="setSelect"/>
        <find-userMess v-show="myScoreTapIndex === 1"
        :list="isLogin?collectList:localCollect"
        :rightTitle="`收藏时间`"
        :listIndex="myCollectIndex"
        :setSelect="setSelect"/>
        <find-userMess v-show="myScoreTapIndex === 4"
        :rightTitle="`最近打开时间`"
        :list="isLogin?recentOpenList:localRecent"
        :listIndex="myRecentIndex"
        :setSelect="setSelect"/>
    </find-wrap>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text" :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height" :allExit="true"></findPrompt>
    <find-tap-buttons :myScoreTapIndex="myScoreTapIndex" :show="!toolbarHidden" :setTapSelect="setTapSelect"/>
    <toolbar :hidden="toolbarHidden" :darkBgHidden="true">
        <icon-item v-for="(button) in controlButtons"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :hidden="!button.show || !deleteCover"
            :longClick="button.longClick"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.id===myScoreTapIndex?button.activeColor: button.dotColor}"/>
        <icon-item v-for="(button,index) in logoutButtons"
            :hidden="deleteCover"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            v-if="button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
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
  import {modules} from 'find-sdk'
  import findPrompt from '../common/find-prompt/find-prompt'
  import {
    KEY39,
    KEY42,
    KEY46,
    KEY49,
    KEY54,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY85,
    KEY90,
    LONG_KEY78,
    LONG_KEY80,
    BACK_PRESSED,
    TOOLBAR_PRESSED,
    PEDAL_PRESSED
  } from 'vue-find'
  export default {
    data () {
      return {
        toolbarHidden: false,
        controlButtons: [
          {
            pianoKey: 39,
            text: '',
            icon: '',
            dotColor: '#fff',
            activeColor: '#FF7E1B',
            id: 0,
            show: true
          },
          {
            pianoKey: 42,
            text: '',
            icon: '',
            dotColor: '#fff',
            activeColor: '#FF7E1B',
            id: 1,
            show: true
          },
          {
            pianoKey: 46,
            text: '',
            icon: '',
            dotColor: '#fff',
            activeColor: '#FF7E1B',
            id: 2,
            show: true
          },
          {
            pianoKey: 49,
            text: '',
            icon: '',
            dotColor: '#fff',
            activeColor: '#FF7E1B',
            id: 3,
            show: true
          },
          {
            pianoKey: 54,
            text: '',
            icon: '',
            dotColor: '#fff',
            activeColor: '#FF7E1B',
            id: 4,
            show: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 5,
            show: true,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 6,
            show: true,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 7,
            show: true
          },
          {
            pianoKey: 85,
            text: '',
            icon: '0xe642',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 8,
            show: true
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63d',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 9,
            show: false
          }
        ],
        logoutButtons: [
          {
            pianoKey: 78,
            text: '取消',
            icon: '0xe60a',
            id: 288,
            backgroundColor: '#3000',
            show: true
          },
          {
            pianoKey: 75,
            text: '删除',
            icon: '0xe642',
            id: 289,
            backgroundColor: '#3000',
            show: true
          }
        ],
        deleteCover: true,
        title: '最近打开',
        dirName: '',
        myRecordDirName: '',
        myPlayDirName: '',
        promptInfo: {
          text: '确认删除吗？',
          icon: 'icon-sync-info',
          delay: 1000,
          width: 640,
          height: 360
        }
      }
    },
    find: {
      [TOOLBAR_PRESSED] ({hidden}) {
        this.toolbarHidden = hidden
      },
      [KEY39] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 0)
        this.controlButtons[this.controlButtons.length - 2].show = true
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
        this.controlButtons[this.controlButtons.length - 2].show = true
        this.controlButtons[this.controlButtons.length - 1].show = false
      },
      [KEY54] () {
        this.$store.dispatch('myScore/setMyScoreTapIndex', 4)
        this.controlButtons[this.controlButtons.length - 2].show = false
        this.controlButtons[this.controlButtons.length - 1].show = true
      },
      [KEY75] () {
        if (!this.deleteCover) this.buttonActions('delete')
      },
      [KEY78] () {
        if (!this.deleteCover) {
          this.deleteCover = !this.deleteCover
          this.$refs.prompt.hidePrompt()
        } else {
          this.buttonActions('up')
        }
      },
      [KEY80] () {
        this.buttonActions('down')
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
        this.buttonActions('delete')
      },
      [KEY90] () {
        this.buttonActions('scoreList')
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
      }
    },
    computed: {
      ...mapState({
        myScoreTapIndex: function (state) {
          if (state.myScore.myScoreTapIndex === 4) {
            this.controlButtons[this.controlButtons.length - 2].show = false
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
        myRecordPath: state => state.myScore.myRecordPath,
        myPlayIndex: state => state.myScore.myPlayIndex,
        myPlay: state => state.myScore.myPlay,
        myPlayPath: state => state.myScore.myPlayPath,
        myCollectIndex: state => state.myScore.myCollectIndex,
        myRecentIndex: state => state.myScore.myRecentIndex,
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        },
        scoreList: function (state) {
          return state.storage.cache.renderCache.scoreList
        }
      }),
      ...mapGetters(['localCollect', 'collectList', 'recentOpenList', 'localRecent', 'bookInfo'])

    },
    watch: {
      localSource (value) {
        value.forEach((item, index) => {
          if (item.name === this.dirName) {
            this.$store.dispatch('myScore/setLocalSourceIndex', index)
          }
        })
      },
      myRecord (value) {
        value.forEach((item, index) => {
          if (item.name === this.myRecordDirName) {
            this.$store.dispatch('myScore/setMyRecordIndex', index)
          }
        })
      },
      myPlay (value) {
        value.forEach((item, index) => {
          if (item.name === this.myPlayDirName) {
            this.$store.dispatch('myScore/setMyPlayIndex', index)
          }
        })
      },
      myScoreTapIndex (value, old) {
        if (value !== old) {
          let title = ['本地资源', '我的收藏', '我的录音', '我的弹奏', '最近打开']
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
      // 鼠标事件
      setSelect (index) {
        switch (this.myScoreTapIndex) {
          case 0:
            this.$store.dispatch('myScore/setLocalSourceIndex', index).then(() => {
              this.localSourceButtonAction('ok')
            })
            break
          case 1:
            this.$store.dispatch('myScore/setMyCollectIndex', index).then(() => {
              this.myCollectButtonAction('ok')
            })
            break
          case 2:
            this.$store.dispatch('myScore/setMyRecordIndex', index).then(() => {
              this.myRecordButtonAction('ok')
            })
            break
          case 3:
            this.$store.dispatch('myScore/setMyPlayIndex', index).then(() => {
              this.myPlayButtonAction('ok')
            })
            break
          case 4:
            this.$store.dispatch('myScore/setRecentIndex', index).then(() => {
              this.recentOpenButtonAction('ok')
            })
            break
        }
      },
      // 鼠标按钮事件
      setTapSelect (index) {
        this.$store.dispatch('myScore/setMyScoreTapIndex', index)
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
        return this.$store.dispatch('myScore/getMyRecord', this.myRecordPath)
      },
      getMyPlay () {
        return this.$store.dispatch('myScore/getMyPlay', this.myPlayPath)
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
            localSourceIndex = Math.max(localSourceIndex, 0)
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
                console.log(data)
                // 去打开文件
                if (data.typeName === 'picture') {
                  this.$router.push({path: '/openImg', query: {url: data.http}})
                } else if (data.typeName === 'pdf') {
                  modules.file.pathComplement(this.localSourcePath + '/' + data.name).then((res) => {
                    if (!res.path) {
                      return
                    }
                    modules.nativeRouter.openPDFFile({'path': res.path})
                  })
                } else if (data.typeName === 'song') {
                  // 合成曲谱播放
                  let scoreObj = {}
                  let houzhuiArr = []
                  let houzhui = ''
                  let eachName = ''
                  let type = {
                    mid: 'midiPath',
                    mp4: 'videoPath',
                    mp3: 'mp3Path',
                    xml: 'xmlPath'
                  }
                  modules.file.pathComplement(this.localSourcePath).then((res) => {
                    if (!res.path) {
                      return
                    }
                    data.filesName.forEach((item, index) => {
                      houzhuiArr = item.split('.')
                      houzhui = houzhuiArr[houzhuiArr.length - 1]
                      eachName = houzhuiArr[0]
                      if (eachName.indexOf('_video_4k') !== -1) {
                        // 4k视频
                        scoreObj.videoPath4k = res.path + '/' + item
                      } else if (eachName.indexOf('_sp') !== -1) {
                        // videoMidi
                        scoreObj.videoMidiPath = res.path + '/' + item
                      } else {
                        let name = type[houzhui]
                        if (name) {
                          scoreObj[name] = res.path + '/' + item
                        }
                      }
                    })
                    console.log(scoreObj)
                    modules.nativeRouter.openMidiPlayer({isLocal: true, 'localDic': scoreObj})
                  })
                } else if (data.typeName === 'midi') {
                  this.playMidi(this.localSourcePath + '/' + data.name)
                  break
                }
              }
            }
            break
          case 'delete':
            let data1 = localSource[localSourceIndex]
            if (!data1) {
              return
            }
            if (this.deleteCover) {
              this.deleteCover = !this.deleteCover
              this.$refs.prompt.showPrompt()
            } else {
              modules.file.removeFile(this.localSourcePath + '/' + data1.name).then(res => {
                if (res) {
                  this.deleteCover = !this.deleteCover
                  this.$refs.prompt.hidePrompt()
                  this.getLocalSource()
                  if (this.localSourceIndex - 1 >= 0) {
                    this.$store.dispatch('myScore/setLocalSourceIndex', localSourceIndex - 1)
                  }
                }
              })
            }
            break
          case 'back':
            if (this.toolbarHidden) this.toolbarHidden = false
            if (!this.deleteCover) {
              // 选择框弹出
              this.deleteCover = true
              this.$refs.prompt.hidePrompt()
              return
            }
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
        let myScoreTapIndex = this.myScoreTapIndex
        let myRecordPath = this.myRecordPath
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
            if (data.type === 'dir') {
              //  去打开文件
              this.$store.dispatch('myScore/setMyRecordPath', this.myRecordPath + '/' + data.name).then(() => {
                this.getMyRecord()
                this.$store.dispatch('myScore/setMyRecordIndex', 0)
              })
            } else {
              //  去播放midi
              this.playMidi(this.myRecordPath + '/' + data.name)
            }
            break
          case 'delete':
            let data1 = myRecord[myRecordIndex]
            if (!data1) {
              return
            }
            if (this.deleteCover) {
              this.deleteCover = !this.deleteCover
              this.$refs.prompt.showPrompt()
            } else {
              modules.file.removeFile(this.myRecordPath + '/' + data1.name).then(res => {
                if (res) {
                  this.deleteCover = !this.deleteCover
                  this.$refs.prompt.hidePrompt()
                  this.getMyRecord()
                  if (this.myRecordIndex - 1 >= 0) {
                    this.$store.dispatch('myScore/setMyRecordIndex', myRecordIndex - 1)
                  }
                }
              })
            }
            break
          case 'back':
            if (this.toolbarHidden) this.toolbarHidden = false
            if (!this.deleteCover) {
              // 选择框弹出
              this.deleteCover = true
              this.$refs.prompt.hidePrompt()
              return
            }
            if (myScoreTapIndex === 2 && myRecordPath !== '$userRecord') {
              let pathArr = myRecordPath.split('/')
              this.myRecordDirName = pathArr.pop()
              let newPath = pathArr.join('/')
              this.$store.dispatch('myScore/setMyRecordPath', newPath)
              this.$store.dispatch('myScore/getMyRecord', newPath)
            } else {
              this.$router.back()
              this.$store.dispatch('myScore/setMyRecordPath', '$userRecord')
              this.destroyedFunc()
            }
        }
      },
      /**
       * @desc 我的弹奏
       * */
      myPlayButtonAction (type) {
        let myPlayIndex = this.myPlayIndex
        let myPlay = this.myPlay
        let length = myPlay.length
        let myPlayPath = this.myPlayPath
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
            if (data.type === 'dir') {
              //  去打开文件
              this.$store.dispatch('myScore/setMyPlayPath', this.myPlayPath + '/' + data.name).then(() => {
                this.getMyPlay()
                this.$store.dispatch('myScore/setMyPlayIndex', 0)
              })
            } else {
              //  去播放midi
              this.playMidi(this.myPlayPath + '/' + data.name)
            }
            break
          case 'delete':
            let data1 = myPlay[myPlayIndex]
            if (!data1) {
              return
            }
            if (this.deleteCover) {
              this.deleteCover = !this.deleteCover
              this.$refs.prompt.showPrompt()
            } else {
              modules.file.removeFile(this.myPlayPath + '/' + data1.name).then(res => {
                if (res) {
                  this.deleteCover = !this.deleteCover
                  this.$refs.prompt.hidePrompt()
                  this.getMyPlay()
                  if (this.myPlayIndex - 1 >= 0) {
                    this.$store.dispatch('myScore/setMyPlayIndex', myPlayIndex - 1)
                  }
                }
              })
            }
            break
          case 'back':
            if (this.toolbarHidden) this.toolbarHidden = false
            if (!this.deleteCover) {
              // 选择框弹出
              this.deleteCover = true
              this.$refs.prompt.hidePrompt()
              return
            }
            if (this.myScoreTapIndex === 3 && this.myPlayPath !== '$userHistory') {
              let pathArr = myPlayPath.split('/')
              this.myPlayDirName = pathArr.pop()
              let newPath = pathArr.join('/')
              this.$store.dispatch('myScore/setMyPlayPath', newPath)
              this.$store.dispatch('myScore/getMyPlay', newPath)
            } else {
              this.$router.back()
              this.$store.dispatch('myScore/setMyPlayPath', '$userHistory')
              this.destroyedFunc()
            }
        }
      },
      /**
       * @desc 我的收藏
       * */
      myCollectButtonAction (type) {
        if (type === 'back') {
          this.destroyedFunc()
          return this.$router.back()
        }
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
              //  去播放曲谱
              this.player(data)
              // modules.nativeRouter.openMidiPlayer({isLocal: false, musicId: musicId})
              this.addRecentOpen(data)
              this.$store.dispatch('addPractice')
            }
            break
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
        }
      },
      /**
       * @desc 最近打开
       * */
      recentOpenButtonAction (type) {
        if (type === 'back') {
          this.destroyedFunc()
          return this.$router.back()
        }
        let myRecentIndex = this.myRecentIndex
        let recentList = this.isLogin ? this.recentOpenList : this.localRecent
        let length = recentList.length
        if (length === 0 && type !== 'back') {
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
              //  去播放曲谱
              this.player(data)
              // modules.nativeRouter.openMidiPlayer({isLocal: false, musicId: musicId})
              this.$store.dispatch('myScore/setRecentIndex', 0)
              this.addRecentOpen(data)
              this.$store.dispatch('addPractice')
            }
            break
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
      // 加入最近打开
      addRecentOpen (musicObj, typeNum) {
        let recentObj = {
          musicId: musicObj.musicId,
          bookId: musicObj.bookId,
          bookName: musicObj.bookName,
          name: musicObj.name,
          styleName: musicObj.styleName,
          practiceTime: +new Date()
        }
        if (recentObj) {
          if (!this.isLogin) {
            this.$store.dispatch('index/localRecent', recentObj)
          } else {
            this.$store.dispatch('index/addRecentOpen', recentObj)
          }
        }
      },
      playMidi (path) {
        modules.file.pathComplement(path).then((res) => {
          if (res.path) {
            modules.nativeRouter.openMidiPlayer({isLocal: true, 'localDic': {'midiPath': res.path}})
          }
        })
      },
      player (musicObj) {
        let musicId = parseInt(musicObj.musicId)
        let bookId = parseInt(musicObj.bookId)
        let musicIds = []
        let allMusics = []
        let styleId = null
        let styleName = ''
        if (musicObj.styleName !== '') {
          styleName = musicObj.styleName[0]
        }
        switch (musicObj.styleName[0]) {
          case '钢琴独奏版':
            styleId = 1
            break
          case '器乐合奏版':
            styleId = 2
            break
          case '器乐弹唱版':
            styleId = 6
            break
          case '钢琴弹唱版':
            styleId = 5
            break
          case '初练版':
            styleId = 7
            break
        }
        this.$store.dispatch({type: 'scoreList/getScoreList', typeName: 'musicScore', id: bookId}).then(() => {
          let list = this.scoreList[bookId]
          if (list) {
            // 有缓存
            list.forEach((data) => {
              let eachMusic = {}
              let musicVersions = []
              let id = data.musicId
              eachMusic.bookName = data.bookName || ''
              eachMusic.musicOrigin = 'bookList'
              eachMusic.musicId = data.musicId
              eachMusic.musicName = data.name
              eachMusic.curMusicId = data.files[0].musicId
              eachMusic.styleName = data.files[0].styleName
              eachMusic.styleId = data.files[0].styleId
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
            console.log({musicId, musicIds, allMusics})
            modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics})
          } else {
            // 无缓存
            let musicInfo = {}
            musicInfo.bookName = musicObj.bookName || ''
            musicInfo.musicOrigin = 'bookList'
            musicInfo.musicId = musicId
            musicInfo.musicName = musicObj.name || musicObj.musicName
            musicInfo.curMusicId = musicId
            musicInfo.styleId = styleId
            musicInfo.styleName = styleName
            musicInfo.musicVersions = [[musicId, styleName]]
            allMusics.push(musicInfo)
            musicIds.push(musicId)
            console.log({musicId, musicIds, allMusics})
            modules.nativeRouter.openMidiPlayQueue({musicId, musicIds, allMusics})
          }
        })
      },
      setTitle () {
        let title = ['本地资源', '我的收藏', '我的录音', '我的弹奏', '最近打开']
        this.title = title[this.myScoreTapIndex]
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
        this.$store.dispatch('myScore/setLocalSourcePath', '$userUpload')
        this.$store.dispatch('myScore/setMyPlayPath', '$userHistory')
        this.$store.dispatch('myScore/setMyRecordPath', '$userRecord')
      }

    },
    created () {
      this.getRecentOpenList()
      this.getCollectList()
      this.getLocalSource()
      this.getMyRecord()
      this.getMyPlay()
      this.setTitle()
    },
    components: {
      findWrap,
      findLocalSource,
      findTapButtons,
      findLocalMid,
      findUserMess,
      statusBar,
      findPrompt
    }
  }
</script>
<style lang="scss" scoped type=text/scss>
  .myScore {
    width: 100%;
    height: 100%;
    position: relative;
    .find-prompt {
      width: 750px;
      height: 450px;
      position: absolute;
      top: 500px;
      left: 2043px;
    }
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
