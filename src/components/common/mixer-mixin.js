/**
 * Created by Tommy on 2018/5/23 .
 * */
import { mapState } from 'vuex'
import {getCurEnvs} from 'scripts/utils'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      pianoType: state => state.storage.pianoType
    })
  },
  methods: {
    openMixer (data) {
      let showAll = false
      if (data && data.showAll) {
        showAll = data.showAll
      }
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        weexUrl = `${weexUrl}components/mixer/mixer.js`
        console.log(weexUrl)
        window.fp.utils.volumeManager.openSoundMix({weexUrl: weexUrl, pianoType: this.pianoType, showAll: showAll})
      })
    }
  }
}
