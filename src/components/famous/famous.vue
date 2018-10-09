<template>
  <div>
    <statusBar/>
    <famous-swiper :famousList="allArtists.authors" :select="famousSetSelect" :defaultLeft="defaultLeft" :setFamousSetSelect="setFamousSetSelect"/>
    <find-title title="名师课程"></find-title>
    <toolbar :darkBgHidden="true">
      <icon-item v-for="button in famousButton"
        :pianoKey="button.pianoKey"
        :key="button.icon"
        :longClick="button.longClick"
        :id="button.id"
        :style="{backgroundColor:'#3000',dotColor:'#fff'}"
        :icon="button.icon"/>
    </toolbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import famousSwiper from './famous-swiper'
  import findTitle from 'components/common/find-title/find-title'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../scripts/utils'
  import { KEY78, KEY80, KEY82, BACK_PRESSED, LONG_KEY78, LONG_KEY80 } from 'vue-find'

  export default {
    name: 'famous',
    data () {
      return {
        famousButton: [
          {
            pianoKey: 78,
            icon: '0xe660',
            id: 201,
            longClick: true
          },
          {
            pianoKey: 80,
            icon: '0xe65b',
            id: 202,
            longClick: true
          },
          {
            pianoKey: 82,
            icon: '0xe69a',
            id: 203,
            longClick: false
          }
        ],
        defaultLeft: 1293,
        hasLoaded: false
      }
    },
    beforeCreate () {
      this.$store.dispatch({type: 'famous/getAllArtistsToFamily'}).then((data) => {
        if (this.hasLoaded || (data && data.allArtists)) {
          // 有缓存
          eventsHub.$emit('closeToast')
        } else {
          errorHandling(data)
        }
      })
    },
    mounted () {
      eventsHub.$emit('toast')
    },
    computed: {
      ...mapState({
        'famousSetSelect': state => state.famous.famousSetSelect,
        'allArtists': function (state) {
          let allArtists = state.storage.cache.renderCache.allArtists
          if (allArtists.authors.length > 0) {
            eventsHub.$emit('closeToast')
          }
          this.hasLoaded = !!allArtists.authors.length
          return allArtists
        }
      }),
      ...mapGetters([])
    },
    methods: {
      action (type) {
        switch (type) {
          case 'left':
            let selectd = this.famousSetSelect - 1
            selectd = selectd < 0 ? 0 : selectd
            this.$store.dispatch('famous/setFamousSetSelect', selectd)
            break
          case 'right':
            let sele = this.famousSetSelect + 1
            sele = sele >= this.allArtists.authors.length ? this.allArtists.authors.length - 1 : sele
            this.$store.dispatch('famous/setFamousSetSelect', sele)
            break
        }
      },
      setFamousSetSelect (index) {
        this.$store.dispatch('famous/setFamousSetSelect', index).then(() => {
          this.gotoFamousBook()
        })
      },
      gotoFamousBook () {
        if (this.allArtists.authors.length === 0) {
          return
        }
        let authorId = this.allArtists.authors[this.famousSetSelect].authorId
        let cover = this.allArtists.authors[this.famousSetSelect].bgCover
        let name = this.allArtists.authors[this.famousSetSelect].name
        this.$router.push({path: '/famous-book', query: {authorId, cover, name}})
      }
    },
    find: {
      [BACK_PRESSED] () {
        this.$router.back()
        this.$store.dispatch('famous/setFamousSetSelect', 0)
      },
      [KEY78] () {
        this.action('left')
      },
      [LONG_KEY78] () {
        this.action('left')
      },
      [KEY80] () {
        this.action('right')
      },
      [LONG_KEY80] () {
        this.action('right')
      },
      [KEY82] () {
        this.gotoFamousBook()
      }
    },
    components: {
      famousSwiper,
      findTitle,
      statusBar
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .famous {
    height: 100%;
    white-space: nowrap;
  }

</style>
