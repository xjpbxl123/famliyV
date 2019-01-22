<template>
  <div class="mixer">
    <div class="box">
      <image :src="back" class="back" />
      <div class="vioceBox vioceBox1" :style="{left: left1 + 'px'}">
        <text class="text1"  :style="{color: mute1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}" >{{mute1 ? '总音量' : '总音量 '}}</text>
        <text class="value" :style="{color: mute1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute1 ? value1 : value1 + ' '}}</text>
        <image :src="bar" class="vioceBar"/>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop1+'px'}" />
        </div>
      </div>
      <div class="vioceBox vioceBox2" :style="{left: left2 + 'px'}" v-if="pianoType === 'real'">
        <text class='text1' :style="{color: mute2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}" >{{mute2 ? '自动演奏' : '自动演奏 '}}</text>
        <text class='value' :style="{color: mute2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute2 ? value2 : value2 + ' '}}</text>
        <image :src="bar1" class="vioceBar"/>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop2+'px'}" />
        </div>
      </div>
      <div class="vioceBox vioceBox3" :style="{left: left3 + 'px'}">
        <text class="text1" :style="{color: mute3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute3 ? '电子音源' : '电子音源 '}}</text>
        <text class="value" :style="{color: mute3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute3 ? value3 : value3 + ' '}}</text>
        <image :src="bar" class="vioceBar"/>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop3+'px'}" />
        </div>
      </div>
      <div class="vioceBox vioceBox4" :style="{left: left4 + 'px'}">
        <text class="text1" :style="{color: mute4 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute4 ? '音频' : '音频 '}}</text>
        <text class="value unmute" :style="{color: mute4 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute4 ? value4 : value4 + ' '}}</text>
        <image :src="bar" class="vioceBar" />
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop4+'px'}" />
        </div>
      </div>
      <div class="vioceBox vioceBox5" v-if="showAll" :style="{left: left5 + 'px'}">
        <text class="text1 textA" :style="{color: mute5 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}" >{{mute5 ? '音频' : '音频 '}} </text>
        <text class="text2" :style="{color: mute5 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute5 ? '(人声)' : '(人声) '}}</text>
        <text class="value valueA" :style="{color: mute5 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute5 ? value5 + '%' : value5 + '% '}}</text>
        <image :src="bar2" class="vioceBar" />
        <div class="bar barA">
          <image :src="slider" class="slider1 slider2" :style="{top: sliderTop5 + 'px'}" />
        </div>
      </div>
      <div class="vioceBox vioceBox6" v-if="showAll" :style="{left: left6}">
        <text class="text1 textA" :style="{color: mute6 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute6 ? '音频' : '音频 '}} </text>
        <text class="text2" :style="{color: mute6 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}" >{{mute6 ? '(配乐)' : '(配乐) '}}</text>
        <text class="value valueA" :style="{color: mute6 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,1)'}">{{mute6 ? value6 + '%' : value6 + '% '}}</text>
        <image :src="bar2" class="vioceBar"/>
        <div class="bar barA">
          <image :src="slider" class="slider1 slider2" :style="{top: sliderTop6+'px'}"/>
        </div>
      </div>
      <toolbar :hidden="toolbarHidden">
        <group id="400">
          <icon-item v-for="button in buttons1"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="500" :hidden="pianoType !== 'real'">
          <icon-item v-for="button in buttons2"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="600">
          <icon-item v-for="button in buttons3"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="700">
          <icon-item v-for="button in buttons4"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="800" :hidden="!showAll">
          <icon-item v-for="button in buttons5"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="900" :hidden="!showAll">
          <icon-item v-for="button in buttons6"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <icon-item
                  pianoKey="85"
                  key="100"
                  id="100"
                  :style="{color:'#fff',backgroundColor:'#6000',textColor: '#fff',fontSize: '14'}"
                  titlePosition='below'
                  icon="0xe676"
                  text="重置"/>
      </toolbar>
    </div>
  </div>
</template>

<script>
  import * as toolbar from 'find-toolbar'
  import mixins from '../mixin.js'
  import {throttle} from 'lodash'
  const globalEvent = weex.requireModule('globalEvent')
  const find = weex.requireModule('find')
  export default {
    name: 'mixer',
    mixins: [mixins],
    data () {
      return {
        mute2Name: '自动演奏',
        show: false,
        buttons1: [
          {
            id: 401,
            pianoKey: '49',
            icon: '0xe601'
          },
          {
            id: 402,
            pianoKey: '50',
            icon: '0xe68c'
          },
          {
            id: 403,
            pianoKey: '51',
            icon: '0xe605'
          }
        ],
        buttons2: [
          {
            id: 501,
            pianoKey: '56',
            icon: '0xe601'
          },
          {
            id: 502,
            pianoKey: '57',
            icon: '0xe68c'
          },
          {
            id: 503,
            pianoKey: '58',
            icon: '0xe605'
          }
        ],
        buttons3: [
          {
            id: 601,
            pianoKey: '61',
            icon: '0xe601'
          },
          {
            id: 602,
            pianoKey: '62',
            icon: '0xe68c'
          },
          {
            id: 603,
            pianoKey: '63',
            icon: '0xe605'
          }
        ],
        buttons4: [
          {
            id: 701,
            pianoKey: '68',
            icon: '0xe601'
          },
          {
            id: 702,
            pianoKey: '69',
            icon: '0xe68c'
          },
          {
            id: 703,
            pianoKey: '70',
            icon: '0xe605'
          }
        ],
        buttons5: [
          {
            id: 801,
            pianoKey: '73',
            icon: '0xe601'
          },
          {
            id: 802,
            pianoKey: '74',
            icon: '0xe68c'
          },
          {
            id: 803,
            pianoKey: '75',
            icon: '0xe605'
          }
        ],
        buttons6: [
          {
            id: 901,
            pianoKey: '78',
            icon: '0xe601'
          },
          {
            id: 902,
            pianoKey: '79',
            icon: '0xe68c'
          },
          {
            id: 903,
            pianoKey: '80',
            icon: '0xe605'
          }
        ],
        value1: 15,
        value2: 15,
        value3: 15,
        value4: 15,
        value5: 100,
        value6: 100,
        bar: require('./images/bar.png'),
        bar1: require('./images/bar1.png'),
        bar2: require('./images/bar3.png'),
        slider: require('./images/slider.png'),
        back: require('./images/pic_background.png'),
        sliderTop1: 0,
        sliderTop2: 0,
        sliderTop3: 0,
        sliderTop4: 0,
        sliderTop5: 0,
        sliderTop6: 0,
        mute1: true,
        mute2: true,
        mute3: true,
        mute4: true,
        mute5: true,
        mute6: true,
        color1: 'rgba(255,255,255,1)',
        offset1: 0,
        offset2: 0,
        offset3: 0,
        offset4: 0,
        left1: 1188,
        left2: 1490,
        left3: 1706,
        left4: 2008,
        left5: 2203,
        left6: 2419,
        notAutoSet: true,
        pianoType: 'real',
        toolbarHidden: false,
        reset: false,
        showAll: true
      }
    },
    methods: {
      controlButtons ({show, pianoType}) {
        this.show = show
        this.pianoType = pianoType
      },
      allVolumeSize (data) {
        let electronic = data.electronic
        let autoPlay = data.autoPlay
        let media = data.media
        let all = data.all
        let humanVolume = data.humanVolume
        let mediaAccompany = data.mediaAccompany
        // 初始化数据
        this.notAutoSet = true
        if (all) {
          this.value1 = all.value
          this.mute1 = all.mute
        }
        if (autoPlay) {
          this.value2 = autoPlay.value
          this.mute2 = autoPlay.mute
        }
        if (electronic) {
          this.value3 = electronic.value
          this.mute3 = electronic.mute
        }
        if (media) {
          this.value4 = media.value
          this.mute4 = media.mute
        }
        if (humanVolume) {
          this.value5 = humanVolume.value * 10
          this.mute5 = humanVolume.mute
        }
        if (mediaAccompany) {
          this.value6 = mediaAccompany.value * 10
          this.mute6 = mediaAccompany.mute
        }
      },
      setLocation (data) {
        this.left1 = data[0] - 103
        this.left2 = data[1] - 103
        this.left3 = data[2] - 103
        this.left4 = data[3] - 103
        this.left5 = data[4] - 123
        this.left6 = data[5] - 123
      },
      setVolumeData ({volumeData}) {
        // 监听到的音量设置
        // case SpeakerVolumeStep    电子音源音量    0
        // case MediaVolumeStep     音频音量      1
        // case AutoplayVolumeStep  自动演奏   2
        // case VolumeStep      总音量         3
        // case mediaAccompany  配乐              4
        // case humanVolume  人声              5
        this.reset = false
        this.notAutoSet = true
        this.reset = false
        switch (volumeData.type) {
          case 'electronic':
            this.value3 = volumeData.value
            if (volumeData.mute !== undefined) {
              this.mute3 = volumeData.mute
            }
            break
          case 'media':
            this.value4 = volumeData.value
            if (volumeData.mute !== undefined) {
              this.mute4 = volumeData.mute
            }
            break
          case 'autoPlay':
            this.value2 = volumeData.value
            if (volumeData.mute !== undefined) {
              this.mute2 = volumeData.mute
            }
            break
          case 'all':
            this.value1 = volumeData.value
            if (volumeData.mute !== undefined) {
              this.mute1 = volumeData.mute
            }
            break
          case 'mediaAccompany':
            this.value6 = volumeData.value * 10
            if (volumeData.mute !== undefined) {
              this.mute6 = volumeData.mute
            }
            break
          case 'humanVolume':
            this.value5 = volumeData.value * 10
            if (volumeData.mute !== undefined) {
              this.mute5 = volumeData.mute
            }
            break
        }
      },
      volumeWheel (data) {
        find.debug('weexvolumeWheel to web' + data)
        find.sendMsgToWeb({
          method: 'volumeWheelChange',
          params: data
        })
      },
      muteVolume (type, mute) {

      },
      otherVolumeChange (type, value, offset) {
        //         case all        = "all"       //总音量
        // case electronic = "electronic" //电子音源
        // case media      = "media"     //视频
        // case autoPlay   = "autoPlay"       // 自动演奏
        // case mediaAccompany =  "mediaAccompany" // 音频伴奏
        // case humanVolume =  "humanVolume" // 人声
        let maxValue = 15
        if (type === 'humanVolume' || type === 'mediaAccompany') {
          maxValue = 10
        }
        if (value > maxValue || value <= 0) {
          return false
        }
        find.volumeSet({type, value, showAlert: false}, data => {
            if (data.code && data.code === -1) {
                find.alert('异常' + type + value, 1)
            } else {

            }
        })
      },
      /// 音量改变
      volumeChange ({type, value}) {
        let maxValue = (type === 'humanVolume' || type === 'mediaAccompany') ? 10 : 15
        if (value > maxValue || value <= 0) {
          return false
        }
        find.volumeSet({type, value, showAlert: false}, (data) => {
          if (data.code && data.code === -1) {
            find.alert('异常' + value, 1)
          }
        })
      }
    },
    computed: {
    },
    created () {
      this.setLocation(weex.config.location)
      find.getVolume('all', (data) => {
        this.allVolumeSize(data)
      })
      this.pianoType = weex.config.pianoType || ''
      this.showAll = weex.config.showAll
      globalEvent.addEventListener('pianoKeyPressed', throttle((arg) => {
        find.debug(JSON.stringify(arg))
        if (arg.type === 'backPressed') {
          if (this.toolbarHidden) {
            this.toolbarHidden = false
            return
          }
          find.back()
          find.sendMsgToWeb({
            method: 'closeMixer',
            params: {close: true}
          })
          return
        }
        if (arg.type === 'toolbarSwitchPressed') {
          this.toolbarHidden = arg.data.hidden
          return
        }
        this.notAutoSet = false
        this.reset = false
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          // 总音量
          case 49:
            this.volumeChange({type: 'all', value: this.value1 - 1})
            break
          case 50:
            find.volumeMute({type: 'all', mute: !this.mute1})
            break
          case 51:
            this.volumeChange({type: 'all', value: this.value1 + 1})
            break
          // 自动演奏音量
          case 56:
            this.volumeChange({type: 'autoPlay', value: this.value2 - 1})
            break
          case 57:
            find.volumeMute({type: 'autoPlay', mute: !this.mute2})
            break
          case 58:
            this.volumeChange({type: 'autoPlay', value: this.value2 + 1})
            break
          // 电子音源音量
          case 61:
            this.volumeChange({type: 'electronic', value: this.value3 - 1})
            break
          case 62:
            find.volumeMute({type: 'electronic', mute: !this.mute3})
            break
          case 63:
            this.volumeChange({type: 'electronic', value: this.value3 + 1})
            break
          // 音频音量（视频/伴奏）
          case 68:
            this.volumeChange({type: 'media', value: this.value4 - 1})
            break
          case 69:
            find.volumeMute({type: 'media', mute: !this.mute4})
            break
          case 70:
             this.volumeChange({type: 'media', value: this.value4 + 1})
            break
          // 音频分音量（人声）
          case 73:
            this.volumeChange({type: 'humanVolume', value: this.value5 / 10 - 1})
            break
          case 74:
            find.volumeMute({type: 'humanVolume', mute: !this.mute5})
            break
          case 75:
            this.volumeChange({type: 'humanVolume', value: this.value5 / 10 + 1})
            break
          // 音频分音量（配乐）
          case 78:
            this.volumeChange({type: 'mediaAccompany', value: this.value6 / 10 - 1})
            break
          case 79:
            find.volumeMute({type: 'mediaAccompany', mute: !this.mute6})
            break
          case 80:
            this.volumeChange({type: 'mediaAccompany', value: this.value6 / 10 + 1})
            break
          case 85:
            // 重置
            find.resetVolume()
            // this.mute1 = this.mute2 = this.mute3 = this.mute4 = this.mute5 = this.mute6 = false
            // this.value1 = 8
            // this.value2 = 8
            // this.value3 = 8
            // this.value4 = 8
            // this.value5 = 80
            // this.value6 = 80
            // find.sendMsgToWeb({
            //   method: 'vioceControl',
            //   params: {name: 'volumeSet', type: 'resetAll'}
            // })
            break
        }
      }, 200))
      globalEvent.addEventListener('volumeChange', (data) => {
        find.debug('volumeChange' + JSON.stringify(data))
        this.allVolumeSize(data)
        // this.notAutoSet = false
        // let type = data.type
        // let diffValue = data.value
        // if (type === 'all') {
        //   this.allVolumeChange(diffValue)
        // }
        // if (type === 'electronic') {
        //   diffValue > 0 ? this.value3 = Math.min(this.value3 + diffValue, 15) : this.value3 = Math.max(this.value3 + diffValue, 1)
        // }
        // if (type === 'media') {
        //   diffValue > 0 ? this.value4 = Math.max(this.value4 + diffValue, 1) : this.value4 = Math.max(this.value4 + diffValue, 1)
        // }
      })
    },
    destroyed () {
      /// 注意:必须remove
      globalEvent.removeEventListener('receiveMsgFromWeb')
    },
    components: {
      ...toolbar
    },
    watch: {
      value1: function (val, oldval) {
        console.log('weex value1 change' + val)
        this.sliderTop1 = 506 - val * 34
      },
      value2: function (val, oldval) {
        this.sliderTop2 = 506 - val * 34
      },
      value3: function (val, oldval) {
        this.sliderTop3 = 506 - val * 34
      },
      value4: function (val, oldval) {
        this.sliderTop4 = 506 - val * 34
      },
      value5: function (val, oldval) {
        this.sliderTop5 = (10 - val / 10) * 46
      },
      value6: function (val, oldval) {
        this.sliderTop6 = (10 - val / 10) * 46
      },
      mute1: function (val, oldval) {
        // if (!this.notAutoSet) {
        //   find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'all', value: val}
        //   })
        // }
        if (!val) {
          // 放音
          this.buttons1[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons1[1].icon = '0xe68c'
        }
      },
      mute2: function (val, oldval) {
        // if (!this.notAutoSet) {
        //   find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'autoPlay', value: val}
        //   })
        // }
        if (!val) {
          // 放音
          this.buttons2[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons2[1].icon = '0xe68c'
        }
      },
      mute3: function (val, oldval) {
        // if (!this.notAutoSet) {
        //   find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'electronic', value: val}
        //   })
        // }
        if (!val) {
          //  放音
          this.buttons3[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons3[1].icon = '0xe68c'
        }
      },
      mute4: function (val, oldval) {
        // if (!this.notAutoSet) {
        //   find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'media', value: val}
        //   })
        // }
        if (!val) {
          // 放音
          this.buttons4[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons4[1].icon = '0xe68c'
        }
      },
      mute5: function (val, oldval) {
        // if (!this.notAutoSet) {
        //    find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'humanVolume', value: val}
        //   })
        // }
        if (!val) {
          // 放音
          this.buttons5[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons5[1].icon = '0xe68c'
        }
      },
      mute6: function (val, oldval) {
        // if (!this.notAutoSet) {
        //   find.sendMsgToWeb({
        //     method: 'vioceControl',
        //     params: {name: 'setMute', type: 'mediaAccompany', value: val}
        //   })
        // }
        if (!val) {
          // 放音
          this.buttons6[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons6[1].icon = '0xe68c'
        }
      }

    }
  }
</script>

<style lang='css' type="text/css">
.mixer {
  width: 3840px;
  height: 1080px;
}

.box {
  width: 3840px;
  height: 800px;
  top: 280px;
  left: 0;
}
.back {
  width: 3840px;
  height: 800px;
  position: absolute;
}
.vioceBox {
  position: absolute;
  width: 214px;
  height: 660px;
  top: 80px;
  flex-direction: column;
}

.vioceBox5 {
  left: 2203px;
  height: 680px;
  top: 62px;
}

.vioceBox6 {
  left: 2419px;
  height: 680px;
  top: 62px;
}

.vioceBar {
  left: 0px;
  top: 0;
  width: 168px;
  height: 495px;
  background-size: cover;
}

.text1{
  width: 214px;
  text-align: center;
  font-size: 28px;
  height: 35px;
  text-indent: 40px;
  font-family: Adobe Heiti Std R;
  margin-bottom: 30px;
}

.textA {
  margin-bottom: 10px;
}

.text2 {
  margin-bottom: 10px;
  width:214px;
  height:24px;
  text-align: center;
  font-size:22px;
  font-family:Adobe Heiti Std R;
  color:rgba(255,255,255,1);
}

.value {
  width:214px;
  text-align: center;
  height:30px;
  font-size:30px;
  font-family:ArialMT;
  color:rgba(255,255,255,1);
  line-height:51px;
  margin-bottom: 30px;
}

.vioceBox5 .text1 {
  margin-bottom: 32px;
}

.vioceBox6 .text1 {
  margin-bottom: 32px;
}

.vioceBox5 .text2 {
  margin-bottom: 32px;
}

.vioceBox6 .text2 {
  margin-bottom: 16px;
}

.valueA {
  margin-bottom: 26px;
  margin-top: 4px;
}

.bar {
  position: absolute;
  left: 0px;
  bottom: 12px;
  width: 168px;
  height: 545px;
}

.barA {
  bottom: 12px;
}

.slider1 {
  position: absolute;
  width: 72px;
  height: 84px;
  left:70px;
}

.slider2 {
  left: 92px;
}

.mute {
  color:rgba(255,255,255,0.4);
}

.unmute {
  color:rgba(255,255,255,1);
}
</style>
