<template>
  <div>
    <find-staff :musicId="musicId" />
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
