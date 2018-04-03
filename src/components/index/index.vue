<template>
  <div>

  </div>
</template>
<style lang="scss">

</style>
<script type="text/javascript">
  import Find from '../../javascripts/apis/index'
  export default {
    data () {
      return {}
    },
    methods: {},
    components: {},
    created () {
      Find.$on('pianoClick', key => {
        if (key === 37) {
          this.index++
        }
      })
    },
    destroyed () {
      Find.$off('pianoClick')
    }
  }
</script>
