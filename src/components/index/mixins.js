
import { mapState } from 'vuex'
export default {
  methods: {
    async initializeData () {
      this.$store.dispatch({type: 'index/getRecentBooks'})
      this.$store.dispatch({type: 'index/getHotBooks'})
    }
  },
  computed: {
    ...mapState({
      recentBooks: state => state.index.recentBooks,
      hotBooks: state => state.index.hotBooks
    })
  }
}
