<template>
  <div>
    <demo :src="src" />
  </div>
</template>
<script>
  import findStaff from '../common/find-staff/find-staff'
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
      findStaff
    }
  }
</script>
<style scoped>
</style>
