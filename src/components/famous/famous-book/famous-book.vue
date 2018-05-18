<template>
  <div :style="{background:`url(${cover})`}">
    <find-title :title="famousAuthor.courseSetList[0].authorName" :style="styles"></find-title>
    <famous-book-swiper :famousBookList="famousAuthor.courseSetList" :select="select"></famous-book-swiper>
    <toolbar>
      <icon-item v-for="button in famousButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 longClick="true"
                 :id="button.id"
                 :icon="button.icon"/>
    </toolbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import findButton from '../../common/find-button/find-button'
  import findTitle from '../../common/find-title/find-title'
  import famousBookSwiper from './famous-book-swiper'
  import { KEY78, KEY80, KEY82 } from 'vue-find'

  export default {
    name: 'famous-book',
    data () {
      return {
        styles: {
          background: '#094BA6'
        },
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
        select: 0,
        cover: '',
        authorList: {courseSetList: [{authorName: ''}]}
      }
    },
    computed: {
      ...mapState({
        'famousAuthor': function (state) {
          return state.storage.cache.renderCache.famousAuthor[this.$route.query.authorId] || {courseSetList: [{authorName: ''}]}
        }
      }),
      ...mapGetters([])
    },
    created () {
      this.getAnthor()
    },
    // watch: {
    //   famousAuthor (val) {
    //     if (val[this.getId()]) {
    //       this.authorList = val[this.getId()]
    //     }
    //   }
    // },
    methods: {
      getAnthor () {
        let cover = this.$route.query.cover
        let artistId = this.getId()
        this.cover = cover
        this.$store.dispatch('famous/getCourseSetByArtistToFamily', {artistId})
      },
      getId () {
        let artistId = JSON.parse(this.$route.query.authorId)
        return artistId
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
          case 'ok':
            this.$router.push({
              path: '/famous-play',
              query: {courseSetID: this.famousAuthor.courseSetList[this.select].courseSetId}
            })
        }
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
        this.action('ok')
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
