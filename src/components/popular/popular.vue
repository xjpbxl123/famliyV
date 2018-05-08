<template>
  <div class="popular">
    <contentLine name="流行经典" class="title"/>
    <div class="differ" v-show="(popularTapIndex===1)">
      <popular-differ-list
        :differList="differList"
        :popularIndex="popularIndex"/>
      <popular-differ-detail
        :differList="differList"
        :popularIndex="popularIndex"/>
    </div>
    <div class="year" v-show="(popularTapIndex===0)">year</div>
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
        popularGenreSelect: state => state.popularGenreSelect
      }),
      ...mapGetters(['differList', 'popularGenre'])
    },
    methods: {
      getDiffer () {
        return this.$store.dispatch({type: 'popular/getDiffer'})
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
      this.getDiffer().then(() => {
        this.getStyles()
      })
    },
    components: {
      contentLine,
      popularTapButton,
      popularControlButton,
      popularDifferList,
      popularDifferDetail,
      popularGenre
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
