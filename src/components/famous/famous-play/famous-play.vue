<template>
  <div>
    <h1>🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯🐯</h1>
  </div>
</template>
<style lang="scss" scoped type=text/scss>
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    created () {
      let courseSetID = this.$route.query.courseSetID
      this.getCoursesBySet(courseSetID)
    },
    methods: {
      /**
       * @desc 获取教程视频文件列表
       */
      getCoursesBySet (courseSetID) {
        this.$store.dispatch('famous/getCoursesBySet', {courseSetID})
      }
    },
    computed: {
      ...mapState({
        'famousPlayCoursesBySet': function (state) {
          return state.storage.cache.renderCache.famousPlayCoursesBySet[this.$route.query.courseSetID]
        }
      }),
      ...mapGetters([])
    }
  }
</script>
