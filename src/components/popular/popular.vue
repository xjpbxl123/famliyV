<template>
  <div class="popular">
    <contentLine name="流行经典" class="title"/>
    <div class="year" v-show="(popularTapIndex===0)" >
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
    <div class="bottom">
      <popular-tap-button :popularTapIndex="popularTapIndex"/>
      <popular-control-button/>
    </div>
  </div>

</template>
<script type="text/javascript">
  import { mapState, mapGetters } from 'vuex'
  import contentLine from '../index/index-content-line'
  import popularTapButton from './popular-tap-buttons'
  import popularControlButton from './popular-control-buttons'
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
      return {}
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
        }
        this.$store.dispatch('setSelect', {popularGenreSelect: activeIndex}, {root: true})
      },
      yearButtonAction (type) {},
      differButtonAction (type) {},
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
        let popularTapIndex = this.popularTapIndex
        switch (popularTapIndex) {
          case 0:
            let yearIndex = this.yearIndex
            let len = this.yearList.length
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
                console.log('ok')
                break
              default:
                break
            }
            break
          case 1:
            let popularIndex = this.popularIndex
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
                break
              default:
                console.log('108')
            }
            break
          case 2:

            break
          default:
            break
        }
      }

    },
    created () {
      this.getDiffer().then(() => {
        this.getStyles()
        this.getCenturys()
      })
    },
    components: {
      contentLine,
      popularTapButton,
      popularControlButton,
      popularDifferList,
      popularDifferDetail,
      popularGenre,
      popularYearList
    }
  }
</script>
<style lang="scss" scoped type=text/scss>
  .popular {
    .style {
      position: absolute;
      top: 195px;
      left: 245px;
    }
    .differ {
      .title {
        position: absolute;
        top: 46px;
        left: 248px
      }
    }
  }
</style>
