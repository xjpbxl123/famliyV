<template>
  <div :style="{background:`url(${cover})`}">
    <statusBar/>
    <find-title :title="this.$route.query.name" :style="styles"></find-title>
    <famous-book-swiper :famousBookList="famousAuthor.courseSetList" :select="famousBookSelect" :setFamousBookSelect="setFamousBookSelect" v-show="hasLoaded"></famous-book-swiper>
    <toolbar :darkBgHidden="true">
      <icon-item v-for="button in famousButton"
        :pianoKey="button.pianoKey"
        :key="button.icon"
        :longClick="button.longClick"
        :id="button.id"
        :style="{backgroundColor:'#4000',dotColor:'#fff'}"
        :icon="button.icon"/>
    </toolbar>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import findTitle from '../../common/find-title/find-title'
  import famousBookSwiper from './famous-book-swiper'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../../scripts/utils'
  import { KEY78, KEY80, KEY82, LONG_KEY78, LONG_KEY80, BACK_PRESSED } from 'vue-find'

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
        cover: '',
        hasLoaded: false,
        authorList: {courseSetList: [{authorName: ''}]}
      }
    },
    computed: {
      ...mapState({
        'famousBookSelect': state => {
          return state.famous.famousBookSelect
        },
        'famousAuthor': function (state) {
          let famousAuthor = state.storage.cache.renderCache.famousAuthor[this.$route.query.authorId]
          if (famousAuthor) {
            // 有缓存
            this.hasLoaded = true
            eventsHub.$emit('closeToast')
          }
          return famousAuthor || {courseSetList: []}
        }
      }),
      ...mapGetters([])
    },
    created () {
      this.getAnthor()
    },
    mounted () {
      eventsHub.$emit('toast')
    },
    methods: {
      getAnthor () {
        let cover = this.$route.query.cover
        let artistId = this.getId()
        this.cover = cover
        if (cover) {
          window.fp.modules.file.cacheUrl(cover).then(data => {
            if (data.code === 0) {
              this.cover = data.url
            }
          })
        }
        this.$store.dispatch('famous/getCourseSetByArtistToFamily', {artistId}).then((data) => {
          if (this.hasLoaded || (data && data.famousAuthor)) {
            // 有缓存 或者有数据
            this.hasLoaded = true
            eventsHub.$emit('closeToast')
          } else {
            errorHandling(data)
          }
        })
      },
      getId () {
        let artistId = JSON.parse(this.$route.query.authorId)
        return artistId
      },
      action (type) {
        if (!this.hasLoaded) {
          return
        }
        switch (type) {
          case 'left':
            let selectd = this.famousBookSelect - 1
            console.log(selectd)
            selectd = selectd < 0 ? 0 : selectd
            this.$store.dispatch('famous/setFamousBookSelect', selectd)
            break
          case 'right':
            let sele = this.famousBookSelect + 1
            console.log(sele)
            sele = sele >= this.famousAuthor.courseSetList.length - 1 ? this.famousAuthor.courseSetList.length - 1 : sele
            this.$store.dispatch('famous/setFamousBookSelect', sele)
            break
          case 'ok':
            this.$router.push({
              path: '/famous-play',
              query: {courseSetID: this.famousAuthor.courseSetList[this.famousBookSelect].courseSetId, authorName: this.famousAuthor.courseSetList[this.famousBookSelect].authorName}
            })
        }
      },
      setFamousBookSelect (index) {
        this.$store.dispatch('famous/setFamousBookSelect', index).then(() => {
          this.action('ok')
        })
      }
    },
    find: {
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
        this.action('ok')
      },
      [BACK_PRESSED] () {
        this.$router.back()
        this.$store.dispatch('famous/setFamousBookSelect', 0)
      }
    },
    components: {
      findTitle,
      famousBookSwiper,
      statusBar
    }
  }
</script>

<style lang="scss" scoped type=text/scss>

</style>
