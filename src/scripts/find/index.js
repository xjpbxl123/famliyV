import {KEY108} from 'vue-find'
import routes from '../../routers/index'

export default {
  globalKeyEvents: {
    [KEY108] () {
      this.$router.back()
    }
  },
  finds: routes
}
