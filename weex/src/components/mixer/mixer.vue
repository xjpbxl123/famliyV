<template>
  <div class="mixer">
    <image :src="back" class="back"></image>
    <div class="vioceBox vioceBox1 ">
      <text class="text1 unmute" v-if="!mute1" >{{value1}}</text>
      <text class="text1 mute" v-else >总音量 </text>
      <text class="value unmute" v-if="!mute1">{{offset}}</text>
      <text class="value mute" v-else>{{offset}} </text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop1+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox2">
      <text class="text1 unmute" v-if="!mute2" >电子音源音量</text>
      <text class="text1 mute" v-else >电子音源音量 </text>
      <text class="value unmute" v-if="!mute2">{{value2}}</text>
      <text class="value mute" v-else>{{value2}} </text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop2+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox3">
      <text class="text1 unmute" v-if="!mute3" >自动演奏音量</text>
      <text class="text1 mute" v-else >自动演奏音量 </text>
      <text class="value unmute" v-if="!mute3">{{value3}}</text>
      <text class="value mute" v-else>{{value3}} </text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop3+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox4">
      <text class="text1 textA unmute" v-if="!mute4" >音频音量</text>
      <text class="text1 textA mute" v-else >音频音量 </text>
      <text class="text2 unmute" v-if="!mute4" >(视频/伴奏)</text>
      <text class="text2 mute" v-else >(视频/伴奏) </text>
      <text class="value valueA unmute" v-if="!mute4">{{value4}}</text>
      <text class="value valueA mute" v-else>{{value4}} </text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop4+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox5">
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
    <div class="vioceBox vioceBox6">
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
    <toolbar>
      <group id="400" :hidden="!show">
        <icon-item v-for="button in buttons1"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
      <group id="500" :hidden="!show">
        <icon-item v-for="button in buttons2"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
      <group id="600" :hidden="!show">
        <icon-item v-for="button in buttons3"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
      <group id="700" :hidden="!show">
        <icon-item v-for="button in buttons4"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
      <group id="800" :hidden="!show">
        <icon-item v-for="button in buttons5"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
      <group id="900" :hidden="!show">
        <icon-item v-for="button in buttons6"
                :pianoKey="button.pianoKey"
                :key="button.id"
                longClick="true"
                :id="button.id"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor:'#767676'}"
                :icon="button.icon"/>
      </group>
       <icon-item
                :hidden="!show"
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
</template>

<script>
  import * as toolbar from 'find-toolbar'
  import mixins from '../mixin.js'
  const globalEvent = weex.requireModule('globalEvent')
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
        slider: require('./images/slider.png'),
        back: require('./images/pic_background.png'),
        sliderTop1: -34,
        sliderTop2: -34,
        sliderTop3: -34,
        sliderTop4: -34,
        sliderTop5: -34,
        sliderTop6: -34,
        mute1: true,
        mute2: true,
        mute3: true,
        mute4: true,
        mute5: true,
        mute6: true,
        color1: 'rgba(255,255,255,1)',
        offset: 0

      }
    },
    methods: {
      controlButtons ({show}) {
        this.show = show
      },
      allVolumeSize ({electronic, media, autoPlay, all}) {
        this.value1 = all.value
        this.value2 = electronic.value
        this.value3 = autoPlay.value
        this.value4 = media.value
        this.mute1 = all.mute
        this.mute2 = electronic.mute
        this.mute3 = autoPlay.mute
        this.mute4 = media.mute
        if (all.mute) {
          this.buttons1[1].icon = '0xe68c'
        } else {
          this.buttons1[1].icon = '0xe603'
        }
        if (electronic.mute) {
          this.buttons2[1].icon = '0xe68c'
        } else {
          this.buttons2[1].icon = '0xe603'
        }
        if (autoPlay.mute) {
          this.buttons3[1].icon = '0xe68c'
        } else {
          this.buttons3[1].icon = '0xe603'
        }
        if (media.mute) {
          this.buttons4[1].icon = '0xe68c'
        } else {
          this.buttons4[1].icon = '0xe603'
        }
      }
    },
    computed: {
    },
    created () {
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          // 总音量
          case 49:
            if (this.value1 - 1 < 1) {
              this.offset = this.offset - 1
              return
            }
            this.value1 = this.value1 - 1
            this.value2 = Math.max(this.value2 - 1, 1)
            this.value3 = Math.max(this.value3 - 1, 1)
            find.sendMsgToWeb({
              method: 'reduce',
              params: {name: 'all', value: this.value1 / 1}
            })
            break
          case 50:
            this.mute1 = !this.mute1
            this.mute2 = this.mute1
            this.mute3 = this.mute1
            if (this.buttons1[1].icon === '0xe68c') {
              // 放音
              this.buttons1[1].icon = '0xe603'
              this.buttons2[1].icon = '0xe603'
              this.buttons3[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons1[1].icon = '0xe68c'
              this.buttons2[1].icon = '0xe68c'
              this.buttons3[1].icon = '0xe68c'
            }

            find.sendMsgToWeb({
              method: 'mute',
              params: {name: 'all', value: !this.mute1}
            })
            break
          case 51:
            if (this.value1 + 1 > 15) {
              this.offset = this.offset + 1
              return
            }
            this.value1 = this.value1 + 1
            this.value2 = Math.min(this.value2 + 1, 15)
            this.value3 = Math.min(this.value3 + 1, 15)
            find.sendMsgToWeb({
              method: 'add',
              params: {name: 'all', value: !this.value1}
            })
            break
          // 电子音源音量
          case 56:
            this.value2 = Math.max(this.value2 - 1, 1)
            break
          case 57:
            this.mute2 = !this.mute2
            if (!this.mute2) {
              this.mute1 = false
            }
            if (this.buttons2[1].icon === '0xe68c') {
              // 放音
              this.buttons2[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons2[1].icon = '0xe68c'
            }
            break
          case 58:
            this.value2 = Math.min(this.value2 + 1, 15)
            break
          // 自动演奏音量
          case 61:
            this.value3 = Math.max(this.value3 - 1, 1)
            break
          case 62:
            this.mute3 = !this.mute3
            if (!this.mute3) {
              this.mute3 = false
            }
            if (this.buttons3[1].icon === '0xe68c') {
              // 放音
              this.buttons3[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons3[1].icon = '0xe68c'
            }
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
            if (this.buttons4[1].icon === '0xe68c') {
              // 放音
              this.buttons4[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons4[1].icon = '0xe68c'
            }
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
            if (this.buttons5[1].icon === '0xe68c') {
              // 放音
              this.buttons5[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons5[1].icon = '0xe68c'
            }
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
            if (this.buttons6[1].icon === '0xe68c') {
              // 放音
              this.buttons6[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons6[1].icon = '0xe68c'
            }
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
        if (val === oldval) {
          return
        }
        this.sliderTop1 = (480 - val * 34)
      },
      value2: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop2 = (480 - val * 34)
      },
      value3: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop3 = (480 - val * 34)
      },
      value4: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop4 = (480 - val * 34)
      },
      value5: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop5 = (480 - val * 34)
      },
      value6: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop6 = (480 - val * 34)
      }
    }
  }
</script>

<style lang='css' type="text/css">
.mixer {
  width: 3840px;
  height: 800px;
}

.back {
  width: 3840px;
  height: 800px;
  position: absolute;
}
.vioceBox {
  position: absolute;
  width: 214px;
  height: 620px;
  top: 80px;
  flex-direction: column;
}

.vioceBox1 {
  left: 1184px;
}

.vioceBox2 {
  left: 1484px;
}

.vioceBox3 {
  left: 1700px;
}

.vioceBox4 {
  left: 2000px;
  height: 632px;
  top: 68px;
}

.vioceBox5 {
  left: 2222px;
  height: 632px;
  top: 70px;
}

.vioceBox6 {
  left: 2432px;
  height: 632px;
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
  width:214px;
  text-align: center;
  font-size:28px;
  height: 28px;
  text-indent: 40px;
  font-family:Adobe Heiti Std R;
  line-height:51px;
  margin-bottom: 37px;
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
  bottom: 4px;
  width: 168px;
  height: 483px;
}

.barA {
   bottom: 6px;
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
