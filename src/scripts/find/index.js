import {BACK_PRESSED, ANY_KEY} from 'vue-find'
import {formatDate} from '../utils'
export default {
  globalKeyEvents: {
    [BACK_PRESSED] () {
      this.$router.back()
    },
    [ANY_KEY] (key) {
      let dd = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss:S')
      console.log('KEY' + key, dd)
    }
  }
}
