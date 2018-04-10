import {KEY108, KEY70} from 'vue-find'
export default {
  globalKeyEvents: {
    [KEY108] (key) {
      alert(key)
    },
    [KEY70] (key) {
      alert(key)
    }
  }
}
