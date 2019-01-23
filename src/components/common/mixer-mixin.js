/**
 * Created by Tommy on 2018/5/23 .
 * */
import { mapState } from 'vuex'
import { modules } from 'find-sdk'
import { getCurEnvs } from 'scripts/utils'

export default {
  data () {
    return {
      clickMixer: false /// 是否打开调音台
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
      this.clickMixer = true
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        weexUrl = `${weexUrl}components/mixer/mixer.js`
        this.openSoundMix({weexUrl: weexUrl, pianoType: this.pianoType, showAll: showAll})
      })
    },
    openSoundMix (info) {
      let weexUrl = info.weexUrl
      let pianoType = info.pianoType
      let showAll = info.showAll || false
      if ((weexUrl === undefined) || (pianoType === undefined)) {
        console.warn('openSoundMix 参数错误' + info)
        return
      }
      // 发送位置信息给调音台
      modules.global.getKeyboardPosition().then((data) => {
        if (data) {
          let location = [data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX, data[74].centerX, data[79].centerX]
          modules.page.openWeexViewController(weexUrl, {
            location: location,
            pianoType: pianoType, // real 真钢 electric 电钢
            showAll: showAll
          }).then((res) => { // weex 创建成功回调
            this.clickMixer = true
          })
        }
      })
    },
    closeMixer (data) {
      typeof this.recoveryOptionsButton === 'function' && this.recoveryOptionsButton()
    }
  }
}
