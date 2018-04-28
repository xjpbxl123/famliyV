<template>
  <div :style="{background:`url(${cover})`}">
    <find-title :title="famousAuthor.courseSetList[0].authorName" :style="styles"></find-title>
    <famous-book-swiper :famousBookList="famousAuthor.courseSetList" :select="select"></famous-book-swiper>
    <div class="bottom">
      <find-button v-for="button in famousButton"
                   :className="button.className"
                   :iconClass="button.icon"
                   :action="action.bind(this,button.className[0])"
                   :key="button.icon"></find-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import findButton from '../../common/find-button/find-button'
  import findTitle from '../../common/find-title/find-title'
  import famousBookSwiper from './famous-book-swiper'
  import { KEY78, KEY80 } from 'vue-find'

  export default {
    name: 'famous-book',
    data () {
      return {
        styles: {
          background: '#094BA6'
        },
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
        select: 0,
        cover: ''
      }
    },
    computed: {...mapState({}), ...mapGetters(['famousAuthor'])},
    created () {
      this.getAnthor()
    },
    methods: {
      getAnthor () {
        let artistId = JSON.parse(this.$route.query.authorId)
        let cover = this.$route.query.cover
        this.cover = cover
        this.$store.dispatch('famous/getCourseSetByArtistToFamily', {artistId})
      },
      action (type) {
        switch (type) {
          case 'left':
            let selectd = this.select - 1
            this.select = selectd < 0 ? 0 : selectd
            break
          case 'right':
            let sele = this.select + 1
            this.select = sele >= this.famousAuthor.courseSetList.length - 1 ? this.famousAuthor.courseSetList.length - 1 : sele
            break
        }
      }
    },
    find: {
      [KEY78] () {
        this.action('left')
      },
      [KEY80] () {
        this.action('right')
      }
    },
    components: {
      findButton,
      findTitle,
      famousBookSwiper
    }
  }
</script>

<style lang="scss" scoped type=text/scss>

</style>
