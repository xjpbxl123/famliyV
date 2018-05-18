<template>
  <div class='vidioPlay'>
    <h1>{{`正在下载中:${progress}%`}}</h1>
    <fh-player ref="player" :hidden="palyHidden" :source="playerSource" :style="{width:3840,height:1080}"
               @initComplete="playerInitComplete">
      <fh-video :style="{width:3840,height:1080}">
        <fh-weex :hidden="false" :style="weexStyle" ref="weex"/>
      </fh-video>
    </fh-player>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
  .vidioPlay {
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
    }
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import { download } from 'find-sdk'

  export default {
    data () {
      return {
        progress: 0,
        palyHidden: true,
        playerSource: {
          videoUrl: '/Users/tommy/Documents/Find Artist/cachedartist/15/约翰汤普森简易钢琴教程（一）01#~&lkYOE7-byQ9cAUetoeymgFF2_lz1.mp4',
          midiUrl: '/Users/tommy/Documents/Find Artist/cachedartist/15/约翰汤普森简易钢琴教程（一）01#~&FhlKwJ_Qtfmmc6XJlM_f2XB8Kgzd.mid'
        },
        weexStyle: {
          left: 100,
          top: 100,
          width: 3840,
          height: 1080,
          text: 'test',
          color: '#ef0000',
          fontSize: 30,
          borderWidth: 3,
          borderColor: '#000000'
        }
      }
    },
    created () {
      let courseSetID = this.$route.query.courseSetID
      /**
       * @desc 根据courseSetID获取教程视频文件列表
       */
      this.getCoursesBySet(courseSetID)
    },
    mounted () {
      this.$refs.weex.openUrl(`http://13.13.13.58:9090/dist/index.js`)
    },
    methods: {
      getCoursesBySet (courseSetID) {
        this.$store.dispatch('famous/getCoursesBySet', {courseSetID}).then(() => {
          let video = this.famousPlayCoursesBySet.courseList[0].data.videoHighBitRate
          let midi = this.famousPlayCoursesBySet.courseList[0].data.midiHighBitRate
          download.downloadAll([video, midi]).progress((process) => {
            this.progress = parseInt(process.allProgress * 100)
          }).then((data) => {
            this.palyHidden = false
            this.playerSource.videoUrl = data[0].path
            this.playerSource.midiUrl = data[1].path
          })
        })
      },
      playerInitComplete () {
        // this.$refs.player.play()
      }
    },
    computed: {
      ...mapState({
        'famousPlayCoursesBySet': function (state) {
          return state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID] || {courseList: []}
        }
      }),
      ...mapGetters([])
    },
    watch: {}
  }
</script>
