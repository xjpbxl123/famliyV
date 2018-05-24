<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {},
    created () {
    }
  }
</script>
