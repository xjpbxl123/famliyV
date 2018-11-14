/**
 * Created by Tommy on 2018/5/23 .
 * */
// import { volume, modules } from 'find-sdk'
import { mapState } from 'vuex'
import {getCurEnvs} from 'scripts/utils'
export default {
  data () {
    return {
      mixerStyle: {
        right: 0,
        top: 280,
        width: 3840,
        height: 800
      }
    }
  },
  computed: {
    ...mapState({
      pianoType: state => state.storage.pianoType
    })
  },
  methods: {
    // vioceControl (data) {
    //   console.log(data)
    //   switch (data.name) {
    //     case 'setMute':
    //       console.log(data, 'data')
    //       volume.volumeMute(data.type, data.value)
    //       break
    //     case 'volumeSet':
    //       if (data.type === 'resetAll') {
    //         // 重置 直接调用这个
    //         return modules.volume.resetVolume()
    //       }
    //       volume.volumeSet(data.type, data.value, false)
    //       break
    //   }
    // },
    // listenVolumeOrMuteDidChange () {
    //   console.log('开始监听')
    //   modules.global.listenVolumeOrMuteDidChange()
    //   modules.notification.regist('VolumeChange', (data) => {
    //     console.log(data)
    //     this.$find.sendMessage({
    //       method: 'setVolumeData',
    //       params: {volumeData: data}
    //     })
    //   })
    // },
    openMixer () {
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        weexUrl = `${weexUrl}components/mixer/mixer.js`
        window.fp.utils.volumeManager.openSoundMix({weexUrl: weexUrl, pianoType: this.pianoType})
        // volume.getAllVolumeSize().then(data1 => {
        //   console.log(data1, '音量信息')
        //   // 发送位置信息给调音台
        //   modules.global.getKeyboardPosition().then((data) => {
        //     if (data) {
        //       let location = [data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX]
        //       modules.page.openWeexViewController(`${weexUrl}components/mixer/mixer.js`, {
        //         volumeValue: data1,
        //         location: location,
        //         pianoType: this.pianoType // real 真钢 electric 电钢
        //       }).then(res => {
        //         console.log(res)
        //         this.$store.dispatch('index/isMixerOpen', true)
        //         // this.listenVolumeOrMuteDidChange()
        //       })
        //     }
        //   })
        // })
      })
    }
    // closeMixer (data) {
    //   if (data.close) {
    //     console.log('停止监听')
    //     this.$store.dispatch('index/isMixerOpen', false)
    //     // modules.notification.remove('VolumeChange')
    //   }
    // }
  }
}
