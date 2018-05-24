<template>
  <div class="myScore">
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
    <toolbar>
        <icon-item v-for="(button) in controlButtons" v-if="button.show"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
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
  import {
    INTERCEPT_DOWN
  } from 'vue-find'
  export default {
    data () {
      return {
        controlButtons: [
          {
            pianoKey: 39,
            text: '',
            icon: '',
            dotColor: '#1bb3ff',
            id: 12,
            show: true
          },
          {
            pianoKey: 42,
            text: '',
            icon: '',
            dotColor: '#dc50ff',
            id: 11,
            show: true
          },
          {
            pianoKey: 46,
            text: '',
            icon: '',
            dotColor: '#00be93',
            id: 10,
            show: true
          },
          {
            pianoKey: 49,
            text: '',
            icon: '',
            dotColor: '#dfbb39',
            id: 9,
            show: true
          },
          {
            pianoKey: 54,
            text: '',
            icon: '',
            dotColor: '#941bff',
            id: 8,
            show: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 13,
            show: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 14,
            show: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#109892',
            dotColor: '#109892',
            id: 15,
            show: true
          }
        ],
        title: '最近打开',
        dirName: ''
      }
    },
    find: {
      [INTERCEPT_DOWN] (key) {
        switch (key) {
          case 39:
            this.$store.dispatch('myScore/setMyScoreTapIndex', 0)
            break
          case 42:
            this.$store.dispatch('myScore/setMyScoreTapIndex', 1)
            break
          case 46:
            this.$store.dispatch('myScore/setMyScoreTapIndex', 2)
            break
          case 49:
            this.$store.dispatch('myScore/setMyScoreTapIndex', 3)
            break
          case 54:
            this.$store.dispatch('myScore/setMyScoreTapIndex', 4)
            break
          case 78:
            this.buttonActions('up')
            break
          case 80:
            this.buttonActions('down')
            break
          case 82:
            this.buttonActions('ok')
            break
          case 108:
            this.buttonActions('back')
        }
      }
    },
    computed: {
      ...mapState({
        myScoreTapIndex: state => state.myScore.myScoreTapIndex,
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
          console.log(state)
          let {storage} = state
          return storage.isLogin
        }
      }),
      ...mapGetters(['localCollect', 'collectList', 'recentOpenList', 'localRecent'])

    },
    watch: {
      myScoreTapIndex (value, old) {
        if (value !== old) {
          let dotColor = ['#1bb3ff', '#dc50ff', '#00be93', '#dfbb39', '#941bff']
          let title = ['本地资源', '我的收藏', '我的录音', '我的弹奏', '最近打开']
          this.controlButtons[value].dotColor = '#fff'
          this.controlButtons[old].dotColor = dotColor[value]
          this.title = title[value]
        }
      },
      localSource (value, old) {
        value.forEach((item, index) => {
          if (item.name === this.dirName) {
            this.$store.dispatch('myScore/setLocalSourceIndex', index)
          }
        })
      },
      isLogin (val) {
      }
    },
    methods: {
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
       * @desc 最近打开数据
       * */
      getMyRecentOpen () {
        this.$store.dispatch({type: 'index/getRecentOpenList'})
        this.$store.dispatch('index/localRecent', this.localRecent || [])
      },
      /**
       * @desc 我的收藏数据
       * */
      getMyCollect () {
        this.$store.dispatch({type: 'index/getCollectList'})
        this.$store.dispatch('index/localCollect', this.localCollect || [])
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
              console.log(data)
              if (data.type === 'dir') {
                let newPath = this.localSourcePath + '/' + data.name
                console.log(newPath)
                this.$store.dispatch('myScore/setLocalSourceIndex', 0)
                this.$store.dispatch('myScore/setLocalSourcePath', newPath)
                this.$store.dispatch('myScore/getLocalSource', newPath)
              } else {
                // 去打开文件
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
              this.destroyedFunc()

              this.$router.back()
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
          case 'back':
            this.destroyedFunc()
            return this.$router.back()
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
        let collectList = this.isLogin ? this.collectList : this.localCollect
        let length = collectList.length
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
            this.destroyedFunc()
            return this.$router.back()
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
        this.$store.dispatch('myScore/setMyScoreTapIndex', 0)
        this.$store.dispatch('myScore/localSourceIndex', 0)
        this.$store.dispatch('myScore/myRecordIndex', 0)
        this.$store.dispatch('myScore/myPlayIndex', 0)
      }

    },
    created () {
      this.getLocalSource()
      this.getMyRecord()
      this.getMyPlay()
      this.getMyCollect()
      this.getMyRecentOpen()
    },
    components: {
      findWrap,
      findLocalSource,
      findTapButtons,
      findLocalMid,
      findUserMess
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
