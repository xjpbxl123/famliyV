<template>
  <div>
    <find-staff :musicId="musicId" v-on:loaded="svgLoaded" />
  </div>
</template>
<script>
  import findStaff from '../common/find-staff/find-staff'
  export default {
    name: 'staff',
    data () {
      return {
        musicId: null
      }
    },
    methods: {
      svgLoaded () {

      }
    },
    created () {
      this.musicId = 2416
    },
    components: {
      findStaff
    }
  }
</script>
<style scoped>
</style>
