import { mapState } from 'vuex'

export default {
  methods: {
    async initializeData () {
      this.$store.dispatch({ type: 'index/getRecentBooks' })
      this.$store.dispatch({ type: 'index/getHotBooks' })
    },
    keyIndex () {
      if (this.activeIndex === this.endIndex) {
        return
      }
      this.activeIndex++
    },
    keyBack () {
      if (this.activeIndex === 0) {
        return
      }
      this.activeIndex--
    }
  },
  computed: {
    ...mapState({
      recentBooks: state => state.index.recentBooks,
      hotBooks: state => state.index.hotBooks
    })
  }
}
