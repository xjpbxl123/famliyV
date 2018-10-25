<template>
  <div class="mixer">
    <div class="box">
      <image :src="back" class="back"></image>
      <div class="vioceBox vioceBox1" :style="{left: left1}">
        <text class="text1 unmute" v-if="!mute1" >总音量</text>
        <text class="text1 mute" v-else >总音量 </text>
        <text class="value unmute" v-if="!mute1">{{value1}}</text>
        <text class="value mute" v-else>{{value1}} </text>
        <image :src="bar" class="vioceBar">
        </image>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop1+'px'}"></image>
        </div>
      </div>
      <div class="vioceBox vioceBox2" :style="{left: left2}" v-if="pianoType === 'real'">
        <text class="text1 unmute" v-if="!mute2" >自动演奏</text>
        <text class="text1 mute" v-else >自动演奏 </text>
        <text class="value unmute" v-if="!mute2">{{value2}}</text>
        <text class="value mute" v-else>{{value2}} </text>
        <image :src="bar1" class="vioceBar">
        </image>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop2+'px'}"></image>
        </div>
      </div>
      <div class="vioceBox vioceBox3" :style="{left: left3}">
        <text class="text1 unmute" v-if="!mute3">电子音源</text>
        <text class="text1 mute" v-else >电子音源 </text>
        <text class="value unmute" v-if="!mute3">{{value3}}</text>
        <text class="value mute" v-else>{{value3}} </text>
        <image :src="bar" class="vioceBar">
        </image>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop3+'px'}"></image>
        </div>
      </div>
      <div class="vioceBox vioceBox4" :style="{left: left4}">
        <text class="text1 unmute" v-if="!mute4" >音频</text>
        <text class="text1 mute" v-else >音频 </text>
        <text class="value unmute" v-if="!mute4">{{value4}}</text>
        <text class="value mute" v-else>{{value4}} </text>
        <image :src="bar" class="vioceBar">
        </image>
        <div class="bar">
          <image :src="slider" class="slider1" :style="{top: sliderTop4+'px'}"></image>
        </div>
      </div>
      <div class="vioceBox vioceBox5" v-if="false" :style="{left: left5}">
        <text class="text1 textA unmute" v-if="!mute5" >音频分音量</text>
        <text class="text1 textA mute" v-else >音频分音量 </text>
        <text class="text2 unmute" v-if="!mute5" >(人声)</text>
        <text class="text2 mute" v-else >(人声) </text>
        <text class="value valueA unmute" v-if="!mute5">{{value5}}</text>
        <text class="value valueA mute" v-else>{{value5}} </text>
        <image :src="bar" class="vioceBar">
        </image>
        <div class="bar barA">
          <image :src="slider" class="slider1" :style="{top: sliderTop5+'px'}"></image>
        </div>
      </div>
      <div class="vioceBox vioceBox6" v-if="false" :style="{left: left6}">
        <text class="text1 textA unmute" v-if="!mute6" >音频分音量</text>
        <text class="text1 textA mute" v-else >音频分音量 </text>
        <text class="text2 unmute" v-if="!mute6" >(配乐)</text>
        <text class="text2 mute" v-else >(配乐) </text>
        <text class="value valueA unmute" v-if="!mute6">{{value6}}</text>
        <text class="value valueA mute" v-else>{{value6}} </text>
        <image :src="bar" class="vioceBar">
        </image>
        <div class="bar barA">
          <image :src="slider" class="slider1" :style="{top: sliderTop6+'px'}"></image>
        </div>
      </div>
      <toolbar :hidden="toolbarHidden">
        <group id="400">
          <icon-item v-for="button in buttons1"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="500" :hidden="pianoType !== 'real'">
          <icon-item v-for="button in buttons2"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="600">
          <icon-item v-for="button in buttons3"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="700">
          <icon-item v-for="button in buttons4"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="800" :hidden="true">
          <icon-item v-for="button in buttons5"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <group id="900" :hidden="true">
          <icon-item v-for="button in buttons6"
                  :pianoKey="button.pianoKey"
                  :key="button.id"
                  longClick="true"
                  :id="button.id"
                  :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                  :icon="button.icon"/>
        </group>
        <icon-item
                  pianoKey="85"
                  key="100"
                  longClick="true"
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
  const globalEvent = weex.requireModule('globalEvent')
  const find = weex.requireModule('find')
  export default {
    name: 'mixer',
    mixins: [mixins],
    data () {
      return {
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
        value5: 15,
        value6: 15,
        bar: require('./images/bar.png'),
        bar1: require('./images/bar1.png'),
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
        left5: 0,
        left6: 0,
        notAutoSet: false,
        pianoType: 'real',
        toolbarHidden: false
      }
    },
    methods: {
      controlButtons ({show, pianoType}) {
        this.show = show
        this.pianoType = pianoType
      },
      allVolumeSize ({electronic, media, autoPlay, all}) {
        this.value1 = all.value
        this.value2 = autoPlay.value
        this.value3 = electronic.value
        this.value4 = media.value
        this.mute1 = all.mute
        this.mute2 = autoPlay.mute
        this.mute3 = electronic.mute
        this.mute4 = media.mute
      },
      location (data) {
        this.left1 = data[0] - 103
        this.left2 = data[1] - 103
        this.left3 = data[2] - 103
        this.left4 = data[3] - 103
      },
      setVolumeData ({volumeData}) {
        // case SpeakerVolumeStep    电子音源音量    0
        // case MediaVolumeStep     音频音量      1
        // case AutoplayVolumeStep  自动演奏   2
        // case VolumeStep      总音量         3
        this.notAutoSet = true
        switch (volumeData.type) {
          case 0:
            this.value3 = volumeData.value
            break
          case 1:
            this.value4 = volumeData.value
            break
          case 2:
            this.value2 = volumeData.value
            break
          case 3:
            this.value1 = volumeData.value
            break
        }
      }
    },
    computed: {
    },
    created () {
      this.location(weex.config.location)
      this.allVolumeSize(weex.config.volumeValue)
      this.pianoType = weex.config.pianoType || ''
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
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
        let keyEvent = arg.data.keys[0]
        let val = this.value1
        switch (keyEvent) {
          // 总音量
          case 49:
            this.value1 = Math.max(this.value1 - 1, 1)
            if (val - 1 < 1) {
              return
            }
            if (this.offset1 > 0) {
              this.value2 = Math.max(this.value1 - this.offset1, 1)
            } else {
              this.value2 = Math.min(this.value1 - this.offset1, 15)
            }
            if (this.offset2 > 0) {
              this.value3 = Math.max(this.value1 - this.offset2, 1)
            } else {
              this.value3 = Math.min(this.value1 - this.offset2, 15)
            }
            if (this.offset3 > 0) {
              this.value4 = Math.max(this.value1 - this.offset3, 1)
            } else {
              this.value4 = Math.min(this.value1 - this.offset3, 15)
            }

            break
          case 50:
            this.mute1 = !this.mute1
            this.mute2 = this.mute1
            this.mute3 = this.mute1
            this.mute4 = this.mute1
            break
          case 51:
            this.value1 = Math.min(this.value1 + 1, 15)
            if (val + 1 > 15) {
              return
            }
            if (this.offset1 > 0) {
              this.value2 = Math.max(this.value1 - this.offset1, 1)
            } else {
              this.value2 = Math.min(this.value1 - this.offset1, 15)
            }
            if (this.offset2 > 0) {
              this.value3 = Math.max(this.value1 - this.offset2, 1)
            } else {
              this.value3 = Math.min(this.value1 - this.offset2, 15)
            }
            if (this.offset3 > 0) {
              this.value4 = Math.max(this.value1 - this.offset3, 1)
            } else {
              this.value4 = Math.min(this.value1 - this.offset3, 15)
            }
            break
          // 自动演奏音量
          case 56:
            this.value2 = Math.max(this.value2 - 1, 1)
            break
          case 57:
            this.mute2 = !this.mute2
            this.mute1 = this.mute2 && this.mute3 && this.mute4
            break
          case 58:
            this.value2 = Math.min(this.value2 + 1, 15)
            break
          // 电子音源音量
          case 61:
            this.value3 = Math.max(this.value3 - 1, 1)
            break
          case 62:
            this.mute3 = !this.mute3
            this.mute1 = this.mute2 && this.mute3 && this.mute4
            break
          case 63:
            this.value3 = Math.min(this.value3 + 1, 15)
            break
          // 音频音量（视频/伴奏）
          case 68:
            this.value4 = Math.max(this.value4 - 1, 1)
            break
          case 69:
            this.mute4 = !this.mute4
            this.mute1 = this.mute2 && this.mute3 && this.mute4
            break
          case 70:
            this.value4 = Math.min(this.value4 + 1, 15)
            break
          // 音频分音量（人声）
          case 73:
            this.value5 = Math.max(this.value5 - 1, 1)
            break
          case 74:
            this.mute5 = !this.mute5
            this.mute4 = this.mute5 && this.mute6
            break
          case 75:
            this.value5 = Math.min(this.value5 + 1, 15)
            break
          // 音频分音量（配乐）
          case 78:
            this.value6 = Math.max(this.value6 - 1, 1)
            break
          case 79:
            this.mute6 = !this.mute6
            this.mute4 = this.mute5 && this.mute6
            break
          case 80:
            this.value6 = Math.min(this.value6 + 1, 15)
            break
          case 85:
            // 重置
            this.value1 = 8
            this.value2 = 8
            this.value3 = 8
            this.value4 = 8
            this.value5 = 8
            this.value6 = 8
        }
      })
    },
    components: {
      ...toolbar
    },
    watch: {
      value1: function (val, oldval) {
        this.sliderTop1 = 506 - val * 34
        if (!this.notAutoSet) {
          find.sendMsgToWeb({
            method: 'vioceControl',
            params: {name: 'volumeSet', type: 'all', value: val}
          })
        }
      },
      value2: function (val, oldval) {
        this.offset1 = this.value1 - val
        this.sliderTop2 = 506 - val * 34
        if (!this.notAutoSet) {
          find.sendMsgToWeb({
            method: 'vioceControl',
            params: {name: 'volumeSet', type: 'autoPlay', value: val}
          })
        }
      },
      value3: function (val, oldval) {
        this.offset2 = this.value1 - val
        this.sliderTop3 = 506 - val * 34
        if (!this.notAutoSet) {
          find.sendMsgToWeb({
            method: 'vioceControl',
            params: {name: 'volumeSet', type: 'electronic', value: val}
          })
        }
      },
      value4: function (val, oldval) {
        this.offset3 = this.value1 - val
        this.sliderTop4 = 506 - val * 34
        if (!this.notAutoSet) {
          find.sendMsgToWeb({
            method: 'vioceControl',
            params: {name: 'volumeSet', type: 'media', value: val}
          })
        }
      },
      value5: function (val, oldval) {
        this.sliderTop5 = 506 - val * 34
      },
      value6: function (val, oldval) {
        this.sliderTop6 = 506 - val * 34
      },
      mute1: function (val, oldval) {
        find.sendMsgToWeb({
          method: 'vioceControl',
          params: {name: 'setMute', type: 'all', value: val}
        })
        if (!val) {
          // 放音
          this.buttons1[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons1[1].icon = '0xe68c'
        }
      },
      mute2: function (val, oldval) {
        find.sendMsgToWeb({
          method: 'vioceControl',
          params: {name: 'setMute', type: 'autoPlay', value: val}
        })
        if (!val) {
          // 放音
          this.buttons2[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons2[1].icon = '0xe68c'
        }
      },
      mute3: function (val, oldval) {
        find.sendMsgToWeb({
          method: 'vioceControl',
          params: {name: 'setMute', type: 'electronic', value: val}
        })
        if (!val) {
          // 放音
          this.buttons3[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons3[1].icon = '0xe68c'
        }
      },
      mute4: function (val, oldval) {
        find.sendMsgToWeb({
          method: 'vioceControl',
          params: {name: 'setMute', type: 'media', value: val}
        })
        if (!val) {
          // 放音
          this.buttons4[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons4[1].icon = '0xe68c'
        }
      },
      mute5: function (val, oldval) {
        if (!val) {
          // 放音
          this.buttons5[1].icon = '0xe603'
        } else {
          // 静音
          this.buttons5[1].icon = '0xe68c'
        }
      },
      mute6: function (val, oldval) {
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
  left: 2222px;
  height: 672px;
  top: 70px;
}

.vioceBox6 {
  left: 2432px;
  height: 672px;
  top: 70px;
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
  margin-bottom: 16px;
}

.text2 {
  margin-bottom: 18px;
  width:214px;
  height:22px;
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
.valueA {
    margin-bottom: 22px;
}
.bar {
  position: absolute;
  left: 0px;
  bottom: 12px;
  width: 168px;
  height: 545px;
}

.barA {
   bottom: 13px;
}

.slider1 {
  position: absolute;
  width: 72px;
  height: 84px;
  left:70px;
}

.mute {
  color:rgba(255,255,255,0.4);
}

.unmute {
  color:rgba(255,255,255,1);
}
</style>
