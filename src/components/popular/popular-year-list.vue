<template>
    <ul>
        <li v-for="item of yearList" :key="item.name">

        </li>
    </ul>
</template>
<script type="text/javascript">
//   import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'popular-year-list',
    props: {
      yearList: {
        type: Array,
        default: () => []
      },
      yearIndex: {
        type: Number,
        default: () => 0
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
</style>
