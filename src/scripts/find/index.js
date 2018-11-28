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
      console.log(window.location.href, 'window.location.href')
      console.log(this.$route.path, 'this.$route.path')
      console.log(window.location.hash, 'window.location.hash')
    }
  }
}
