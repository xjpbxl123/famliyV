<template>
  <div class="popular">
    <div class="differ" v-show="(popularTapIndex===1)">
      <contentLine name="热门曲谱" class="title"/>
      <popular-differ-list
      :differList="differList"
      :popularIndex="popularIndex"/>
      <popular-differ-detail
      :differList="differList"
      :popularIndex="popularIndex"/>
    </div>
    <div class="year">year</div>
    <div class="style">style</div>
    <div class="bottom">
        <popular-tap-button :popularTapIndex="popularTapIndex"/>
        <popular-control-button />
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
      return {
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
            // this.goBack()
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
      popularDifferDetail
    }
  }
</script>
<style lang="scss" scoped>
  .differ {
    .title {
      position: absolute;
      top: 46px;
      left: 248px
    }

  }
</style>
