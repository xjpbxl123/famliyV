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
      <popular-genre></popular-genre>
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
      [KEY82] () {
        this.buttonActions('ok')
      }
    },
    computed: {
      ...mapState({
        popularIndex: state => state.popular.popularIndex,
        popularTapIndex: state => state.popular.popularTapIndex
      }),
      ...mapGetters(['differList'])
    },
    methods: {
      getDiffer () {
        this.$store.dispatch({type: 'popular/getDiffer'})
      },
      /**
       * @desc 按钮组件按钮事件
       * */
      buttonActions (type) {
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
      }
    },
    created () {
      this.getDiffer()
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
    .differ {
      .title {
        position: absolute;
        top: 46px;
        left: 248px
      }
    }
  }
</style>
