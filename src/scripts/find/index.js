import {KEY108} from 'vue-find'
export default {
  globalKeyEvents: {
    [KEY108] () {
      this.$router.back()
    }
  }
}
