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
      console.log('12volume打开调音台')
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
      console.log('12volume======打开调音台')
      this.$volume.volumeWatcher(this.mixerVolumeWatch)
      this.$volume.getAllVolumeSize().then((data1) => {
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
              volumeValue: data1,
              location: location,
              pianoType: pianoType, // real 真钢 electric 电钢
              showAll: showAll
            }).then((res) => { // weex 创建成功回调
              this.clickMixer = true
            })
          }
        })
      })
    },
    closeMixer (data) {
      this.$volume.removeVolumeWatcher(this.mixerVolumeWatch)
    },
    /// 监听音量改变
    mixerVolumeWatch (data) {
      console.log('监听音量改变mixerVolumeWatch', data)
      // if (this.clickMixer) {
      //   this.$find.sendMessage({
      //     method: 'setVolumeData',
      //     params: {volumeData: data}
      //   })
      // }
    },
    /// 注册调音台发过来的事件事件
    vioceControl (data1) {
      let data = data1
      switch (data.name) {
        case 'setMute':
          this.$volume.volumeMute({type: data.type, mute: !!data.value})
          break
        case 'volumeSet':
          if (data.type === 'resetAll') {
            // 重置 直接调用这个
            console.log('data.type === \'resetAll\'')
            this.$volume.resetVolume()
          } else {
            /// 设置
            this.$volume.registVolumeNotif(data)
          }
          break
      }
    },
    /// 调音台发过来的音量旋转按钮事件
    volumeWheelChange (data) {
      this.$volume.volumeWheelChange(data)
    }
  }
}
