/**
 * Created by Tommy on 2018/5/23 .
 * */
import { volume } from 'find-sdk'
export default {
  methods: {
    vioceControl (data) {
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
      volume.getAllVolumeSize().then(data => {
        self.$find.sendMessage({
          method: 'allVolumeSize',
          params: data
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
    }

  },
  created () {

  }
}
