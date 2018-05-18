<template>
  <div class="popular">
    <contentLine name="流行经典" class="title"/>
    <div class="year" v-show="(popularTapIndex===0)">
      <popular-year-list :yearList="yearList" :yearIndex="yearIndex"></popular-year-list>
    </div>
    <div class="differ" v-show="(popularTapIndex===1)">
      <popular-differ-list
        :differList="differList"
        :popularIndex="popularIndex"/>
      <popular-differ-detail
        :differList="differList"
        :popularIndex="popularIndex"/>
    </div>
    <div class="style" v-show="(popularTapIndex===2)">
      <popular-genre :popularGenre="popularGenre" :select="popularGenreSelect"></popular-genre>
    </div>
    <toolbar>
      <text-icon-item v-for="(button) in bigBUtton"
            :key="button.id"
            :id="button.id"
            :text="button.text"
            :pianoKey="button.pianoKey"
            :style="button.style"
            :icon="button.icon"/>
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
  import contentLine from '../index/index-content-line'
  import popularDifferList from './popular-differ-list'
  import popularDifferDetail from './popular-differ-detail'
  import popularGenre from './popular-genre/popular-genre'
  import popularYearList from './popular-year-list'
  import {
    KEY73,
    KEY75,
    KEY78,
    KEY80,
    KEY82,
    KEY46,
    KEY49,
    KEY54
  } from 'vue-find'

  export default {
    data () {
      return {
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#6f24d2',
            dotColor: '#6f24d2',
            id: 11,
            show: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#c72bbb',
            dotColor: '#c72bbb',
            id: 12,
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
        bigBUtton: [
          {id: 200, pianoKey: 46, text: '年代', icon: '0xe6b4', style: {backgroundColor: '#2582c4', dotColor: '#2582c4'}},
          {id: 201, pianoKey: 49, text: '难度', icon: '0xe6a2', style: {backgroundColor: '#2582c4', dotColor: '#2582c4'}},
          {id: 202, pianoKey: 54, text: '曲风', icon: '0xe6a8', style: {backgroundColor: '#d86d0a', dotColor: '#d86d0a'}}
        ]
      }
    },
    find: {
      [KEY46] () {
        this.$store.dispatch('popular/setPopularTapSelected', 0)
      },
      [KEY49] () {
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
      [KEY82] () {
        this.buttonActions('ok')
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
        // if (value === 2) {
        //   this.controlButtons[2].show = true
        //   this.controlButtons[3].show = true
        // } else {
        //   this.controlButtons[2].show = false
        //   this.controlButtons[3].show = false
        // }
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
      stylesButtonAction (type) {
        let activeIndex = this.popularGenreSelect
        let popularGenreLen = this.popularGenre.length - 1
        switch (type) {
          case 'right':
            popularGenreLen > activeIndex && activeIndex++
            break
          case 'left':
            activeIndex > 0 && activeIndex--
            break
          case 'down':
            if (popularGenreLen >= activeIndex + 4) activeIndex += 4
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
            this.$router.push({path: '/scoreList', query: {year: yearList[yearIndex]}})
            break
          default:
            break
        }
      },
      differButtonAction (type) {
        let popularIndex = this.popularIndex
        let differList = this.differList
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
            this.$router.push({path: '/scoreList', query: {differ: differList[popularIndex]}})
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
      console.log(this.popularGenre, 'popularGenre')
      this.getDiffer()
      this.getStyles()
      this.getCenturys()
    },
    components: {
      contentLine,
      popularDifferList,
      popularDifferDetail,
      popularGenre,
      popularYearList
    }
  }
</script>
<style lang="scss" scoped type=text/scss>
  .popular {
    .title {
        position: absolute;
        top: 46px;
        left: 248px
      }
    .style {
      position: absolute;
      top: 195px;
      left: 245px;
    }
  }
</style>
