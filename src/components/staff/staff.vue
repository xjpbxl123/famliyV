<template>
  <div>
    <demo :src="src" />
  </div>
</template>
<script>
  import findStaff from '../common/find-staff/find-staff'
  import demo from './demo'
  export default {
    name: 'staff',
    data () {
      return {
        musicId: null,
        src: ''
      }
    },
    methods: {
      svgLoaded () {

      }
    },
    created () {
      this.musicId = 2416
      setTimeout(() => {
        this.src = 'Moersing'
      }, 1000)
    },
    components: {
      findStaff,
      demo
    }
  }
</script>
<style scoped>
</style>
