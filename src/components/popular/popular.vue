<template>
  <div class="popular">
    <statusBar/>
    <div class="line">
      <div><span>流</span>行经典</div>
      <span class="line-icon"></span>
      <div class="color"></div>
    </div>
    <div class="year" v-show="(popularTapIndex===0)">
      <popular-year-list :yearList="yearList" :yearIndex="yearIndex" :setSelect="setSelect"></popular-year-list>
    </div>
    <div class="differ" v-show="popularTapIndex===1 && differList.length !== 0">
      <popular-differ-list
        :differList="differList"
        :popularIndex="popularIndex"
        :setSelect="setSelect"/>
      <popular-differ-detail
        :differList="differList"
        :popularIndex="popularIndex"/>
    </div>
    <div class="style" v-show="(popularTapIndex===2)">
      <popular-genre :popularGenre="popularGenre" :select="popularGenreSelect" :setSelect="setSelect"></popular-genre>
    </div>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text"  :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height" :allExit="true"></findPrompt>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
      <text-icon-item v-for="(button) in bigBUtton"
            :key="button.id"
            :id="button.id"
            :text="button.text"
            :pianoKey="button.pianoKey"
            :style="button.style"
            :positionPixels="button.positionPixels"
            :icon="button.icon"/>
     <icon-item v-for="(button) in controlButtons" :hidden="!button.show"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :longClick="button.longClick"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>

</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import popularDifferList from './popular-differ-list'
  import popularDifferDetail from './popular-differ-detail'
  import popularGenre from './popular-genre/popular-genre'
  import popularYearList from './popular-year-list'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import findPrompt from '../common/find-prompt/find-prompt'
  import {global} from 'find-sdk'
  import {
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY51,
    KEY49,
    KEY54,
    LONG_KEY73,
    LONG_KEY75,
    LONG_KEY78,
    LONG_KEY80,
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
            id: 11,
            show: true,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 12,
            show: true,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 13,
            show: true,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 14,
            show: true,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 15,
            show: true
          }
        ],
        bigBUtton: [
          {id: 200, pianoKey: 49, text: '年代', icon: '0xe6b4', positionPixels: -30, style: {backgroundColor: '#2582c4', dotColor: '#2582c4'}},
          {id: 201, pianoKey: 51, text: '难度', icon: '0xe6a2', positionPixels: 30, style: {backgroundColor: '#2582c4', dotColor: '#2582c4'}},
          {id: 202, pianoKey: 54, text: '曲风', icon: '0xe6a8', positionPixels: 40, style: {backgroundColor: '#d86d0a', dotColor: '#d86d0a'}}
        ],
        promptInfo: {
          text: '网络连接出错，请检查网络',
          icon: 'icon-sync-info',
          delay: 1000,
          width: 640,
          height: 360
        },
        toolbarHidden: false,
        loadTime: 0
      }
    },
    find: {
      [KEY49] () {
        this.$store.dispatch('popular/setPopularTapSelected', 0)
      },
      [KEY51] () {
        this.$store.dispatch('popular/setPopularTapSelected', 1)
      },
      [KEY54] () {
        this.$store.dispatch('popular/setPopularTapSelected', 2)
      },
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
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
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
            this.goBack()
        }
      },
      [BACK_PRESSED] () {
        if (+new Date() - this.loadTime < 500) {
          return
        }
        this.goBack()
      }
    },
    computed: {
      ...mapState({
        popularIndex: state => state.popular.popularIndex,
        popularTapIndex: state => state.popular.popularTapIndex,
        yearIndex: state => state.popular.yearIndex,
        popularGenreSelect: state => state.popularGenreSelect
      }),
      ...mapGetters(['differList', 'popularGenre', 'yearList'])
    },
    watch: {
      popularTapIndex (value, old) {
        if (value === 2) {
          this.controlButtons[2].show = true
          this.controlButtons[3].show = true
        } else {
          this.controlButtons[2].show = false
          this.controlButtons[3].show = false
        }
        this.bigBUtton[value].style = {backgroundColor: '#d86d0a', dotColor: '#d86d0a'}
        this.bigBUtton[old].style = {backgroundColor: '#2582c4', dotColor: '#2582c4'}
      }
    },
    methods: {
      getDiffer () {
        return this.$store.dispatch({type: 'popular/getDiffer'})
      },
      /**
       * @desc 获取年代数据
       */
      getCenturys () {
        this.$store.dispatch({type: 'popular/getCenturys'})
      },
      getStyles () {
        return this.$store.dispatch('popular/getStyles')
      },
      goBack () {
        //        this.$store.dispatch('popular/setPopularTapSelected', 2)
        //        this.$store.dispatch('popular/setYearSelected', 0)
        //        this.$store.dispatch('popular/setPopularSelected', 0)
        //        this.$store.dispatch('setSelect', {popularGenreSelect: 0}, {root: true})
        this.$router.back()
      },
      // 鼠标操作
      setSelect (index) {
        if (this.popularTapIndex === 0) {
          this.$store.dispatch('popular/setYearSelected', index).then(() => {
            this.yearButtonAction('ok')
          })
        } else if (this.popularTapIndex === 1) {
          this.$store.dispatch('popular/setPopularSelected', index).then(() => {
            this.differButtonAction('ok')
          })
        } else {
          this.$store.dispatch('setSelect', {popularGenreSelect: index}, {root: true}).then(() => {
            this.stylesButtonAction('ok')
          })
        }
      },
      stylesButtonAction (type) {
        let popularGenreLen = this.popularGenre.length - 1
        if (popularGenreLen <= 0) {
          return
        }
        let activeIndex = this.popularGenreSelect
        switch (type) {
          case 'right':
            popularGenreLen > activeIndex && activeIndex++
            break
          case 'left':
            activeIndex > 0 && activeIndex--
            break
          case 'down':
            if (popularGenreLen >= activeIndex + 4) {
              activeIndex += 4
            } else {
              activeIndex = popularGenreLen
            }
            break
          case 'up':
            if (activeIndex - 4 >= 0) activeIndex -= 4
            break
          case 'ok':
            let data = this.popularGenre
            this.$router.push({path: '/scoreSetList', query: {setName: data[activeIndex].name, setId: data[activeIndex].id}})
        }
        this.$store.dispatch('setSelect', {popularGenreSelect: activeIndex}, {root: true})
      },
      yearButtonAction (type) {
        let yearIndex = this.yearIndex
        let len = this.yearList.length
        if (len <= 0) {
          return
        }
        let yearList = this.yearList
        switch (type) {
          case 'left':
            console.log('left')
            void (yearIndex > 0 ? yearIndex-- : 0)
            this.$store.dispatch('popular/setYearSelected', yearIndex)
            break
          case 'right':
            console.log('right')
            void (yearIndex < len - 1 ? yearIndex++ : len - 1)
            this.$store.dispatch('popular/setYearSelected', yearIndex)
            break
          case 'ok':
            this.$router.push({path: '/scoreList', query: {year: JSON.stringify(yearList[yearIndex])}})
            break
          default:
            break
        }
      },
      differButtonAction (type) {
        let popularIndex = this.popularIndex
        let differList = this.differList
        if (differList.length <= 0) {
          return
        }
        switch (type) {
          case 'left' :
            console.log('left')
            popularIndex--
            popularIndex = Math.max(popularIndex, 0)
            this.$store.dispatch('popular/setPopularSelected', popularIndex)
            break
          case 'right':
            console.log('right')
            popularIndex++
            popularIndex = Math.min(popularIndex, 4)
            this.$store.dispatch('popular/setPopularSelected', popularIndex)
            break
          case 'ok':
            console.log('ok')
            console.log(differList[popularIndex])
            this.$router.push({path: '/scoreList', query: {differ: JSON.stringify(differList[popularIndex])}})
            break
          default:
            console.log('108')
        }
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let popularTapIndex = this.popularTapIndex
        switch (popularTapIndex) {
          case 0:
            this.yearButtonAction(type)
            break
          case 1:
            this.differButtonAction(type)
            break
          case 2:
            this.stylesButtonAction(type)
            break
        }
      }

    },
    created () {
      this.loadTime = +new Date()
      this.getDiffer()
      this.getStyles()
      this.getCenturys()
      if (this.popularTapIndex === 2) {
        this.controlButtons[2].show = true
        this.controlButtons[3].show = true
      } else {
        this.controlButtons[2].show = false
        this.controlButtons[3].show = false
      }

      this.bigBUtton.forEach((item, index) => {
        console.log(this.popularTapIndex)
        if (index === this.popularTapIndex) {
          item.style = {backgroundColor: '#d86d0a', dotColor: '#d86d0a'}
        } else {
          item.style = {backgroundColor: '#2582c4', dotColor: '#2582c4'}
        }
      })
    },
    mounted () {
      // 断网提醒
      global.getStatusBarItem().then((data) => {
        if (this.popularGenre.length === 0 && !data.wifi.title) {
          this.$refs.prompt.showPrompt()
        }
      })
    },
    components: {
      popularDifferList,
      popularDifferDetail,
      popularGenre,
      popularYearList,
      statusBar,
      findPrompt
    }
  }
</script>
<style lang="scss" scoped type=text/scss>
  .popular {
    .find-prompt {
      width: 750px;
      height: 450px;
      position: absolute;
      top: 500px;
      left: 2043px;
    }
    .line {
      position: absolute;
      top: 55px;
      left: 260px;
      div:nth-child(1) {
        color: #fff;
        font-size: 30px;
        span {
          font-size: 48px;
        }
      }
      .line-icon {
        width: 40px;
        height: 60px;
        position: absolute;
        left: -42px;
        top: -2px;
        background: url('./images/icon.png') no-repeat;
        background-size: cover;
        }
      .color {
        width: 800px;
        height: 1px;
        margin-left: 0px;
        margin-bottom: 7px;
        background-image: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.6) 50%,
          rgba(255, 255, 255, 0.1)
        );
      }
    }
    .title {
        position: absolute;
        top: 46px;
        left: 248px
      }
    .style {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
