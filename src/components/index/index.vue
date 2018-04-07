<template>
  <div>
    <span @click="goTo">pianoKey demo</span>
  </div>
</template>
<style lang="scss" scoped>
span {
  color: red;
  font-size: 1.5rem;
}
</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    methods: {
      goTo () {
        this.$router.push('/home')
      }
    },
    created () {}
  }
</script>
