import Vue from 'vue'
let app = window.app

class Find extends Vue {
  init () {
    app.keyEvent = data => {
      this.$emit('pianoClick', data.keys[0])
    }
  }
}

export default new Find()
