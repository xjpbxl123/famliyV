<template>
  <div>
    <famous-swiper :famousList="allArtists.authors" :select="famousSetSelect" :defaultLeft="defaultLeft"/>
    <find-title title="名师课程"></find-title>
    <toolbar>
      <icon-item v-for="button in famousButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 longClick="true"
                 :id="button.id"
                 :style="{backgroundColor:'#4467D4',dotColor:'#4467D4'}"
                 :icon="button.icon"/>
    </toolbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import famousSwiper from './famous-swiper'
  import findTitle from 'components/common/find-title/find-title'
  import { KEY78, KEY80, KEY82, BACK_PRESSED } from 'vue-find'

  export default {
    name: 'famous',
    data () {
      return {
        famousButton: [
          {
            pianoKey: 78,
            icon: '0xe660',
            id: 201
          },
          {
            pianoKey: 80,
            icon: '0xe65b',
            id: 202
          },
          {
            pianoKey: 82,
            icon: '0xe69a',
            id: 203
          }
        ],
        defaultLeft: 1293
      }
    },
    beforeCreate () {
      this.$store.dispatch({type: 'famous/getAllArtistsToFamily'})
    },
    computed: {
      ...mapState({
        'famousSetSelect': state => state.famous.famousSetSelect
      }),
      ...mapGetters(['allArtists'])
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
      gotoFamousBook () {
        let authorId = this.allArtists.authors[this.famousSetSelect].authorId
        let cover = this.allArtists.authors[this.famousSetSelect].bgCover
        this.$router.push({path: '/famous-book', query: {authorId, cover}})
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
      [KEY80] () {
        this.action('right')
      },
      [KEY82] () {
        this.gotoFamousBook()
      }
    },
    components: {
      famousSwiper,
      findTitle
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .famous {
    height: 100%;
    white-space: nowrap;
  }

</style>
