/**
 * Created by Tommy on 2018/5/23 .
 * */
import { volume, modules } from 'find-sdk'
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
  watch: {
    mixerHidden: function (value) {
      if (value) {
        // 调音台关闭 停止监听音量设置
        console.log('调音台关闭 停止监听音量设置')
        modules.notification.remove('VolumeChange')
      } else {
        // 调音台开启 开启监听音量设置
        console.log('调音台开启 开启监听音量设置')
        this.listenVolumeOrMuteDidChange()
      }
    }
  },
  methods: {
    vioceControl (data) {
      console.log(data)
      switch (data.name) {
        case 'setMute':
          console.log(data, 'data')
          volume.volumeMute(data.type, data.value)
          break
        case 'volumeSet':
          volume.volumeSet(data.type, data.value, false).then(data => {
            console.log(data)
          })
          break
      }
    },
    initMixerData () {
      let self = this
      self.$refs.mixer.focus()
      volume.getAllVolumeSize().then(data => {
        console.log(data, '音量信息')
        self.$find.sendMessage({
          method: 'allVolumeSize',
          params: data
        })
        // 发送位置信息给调音台
        modules.global.getKeyboardPosition().then((data) => {
          if (data) {
            console.log([data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX])
            this.$find.sendMessage({
              method: 'location',
              params: {location: [data[50].centerX, data[57].centerX, data[62].centerX, data[69].centerX]}
            })
          }
        })
      })
      self.$find.sendMessage({
        method: 'controlButtons',
        params: {show: !self.mixerHidden}
      })
    },
    closeMixer () {
      this.$find.sendMessage({
        method: 'controlButtons',
        params: {show: !this.mixerHidden}
      })
    },
    listenVolumeOrMuteDidChange () {
      modules.global.listenVolumeOrMuteDidChange()
      modules.notification.regist('VolumeChange', (data) => {
        console.log(data)
        this.$find.sendMessage({
          method: 'setVolumeData',
          params: {volumeData: data}
        })
      })
    }
  }
}
