<template>
  <div>
    <famous-swiper :famousList="allArtists.authors" :select="select" :defaultLeft="defaultLeft"/>
    <find-title title="名师课程"></find-title>
    <div class="bottom">
      <find-button v-for="button in famousButton"
                   :className="button.className"
                   :iconClass="button.icon"
                   :action="action.bind(this,button.className[0])"
                   :key="button.icon"/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import findButton from '../common/find-button/find-button'
  import famousSwiper from './famous-swiper'
  import findTitle from 'components/common/find-title/find-title'
  import { KEY78, KEY80, KEY82 } from 'vue-find'

  export default {
    name: 'famous',
    data () {
      return {
        select: 0,
        famousButton: [
          {
            icon: 'icon-left',
            className: ['left', 'key-78']
          },
          {
            icon: 'icon-right',
            className: ['right', 'key-80']
          },
          {
            icon: 'icon-ok',
            className: ['ok', 'key-82']
          }
        ],
        defaultLeft: 1293
      }
    },
    beforeCreate () {
      this.$store.dispatch({type: 'famous/getAllArtistsToFamily'})
    },
    computed: {
      ...mapState({}),
      ...mapGetters(['allArtists'])
    },
    methods: {
      action (type) {
        switch (type) {
          case 'left':
            let selectd = this.select - 1
            this.select = selectd < 0 ? 0 : selectd
            break
          case 'right':
            let sele = this.select + 1
            this.select = sele >= this.allArtists.authors.length ? this.allArtists.authors.length - 1 : sele
            break
        }
      },
      gotoFamousBook () {
        let authorId = this.allArtists.authors[this.select].authorId
        let cover = this.allArtists.authors[this.select].bgCover
        this.$router.push({path: '/famous-book', query: {authorId, cover}})
      }
    },
    find: {
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
      findButton,
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
