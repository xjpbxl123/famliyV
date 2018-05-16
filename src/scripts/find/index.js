import {BACK_PRESSED} from 'vue-find'

export default {
  globalKeyEvents: {
    [BACK_PRESSED] () {
      this.$router.back()
    }
  }
}
