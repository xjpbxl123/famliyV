<template>
  <div class="mixer">
    <image :src="back" class="back"></image>
    <div class="vioceBox vioceBox1 ">
      <text class="text1" :class="[mute1?'mute':'']">总音量</text>
      <text class="value1" :class="[mute1?'mute':'']">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop1+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox2">
      <text class="text1">电子音源音量</text>
      <text class="value1">{{value2}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop2+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox3">
      <text class="text1">自动演奏音量</text>
      <text class="value1">{{value3}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop3+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox4">
      <text class="text1 textA">音频音量</text>
      <text class="text2">(视频/伴奏)</text>
      <text class="value1">{{value4}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop4+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox5">
      <text class="text1 textA">音频分音量</text>
      <text class="text2">(人声)</text>
      <text class="value1">{{value5}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop5+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox6">
      <text class="text1 textA">音频分音量</text>
      <text class="text2">(配乐)</text>
      <text class="value1">{{value6}}</text>
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
        value1: 100,
        value2: 100,
        value3: 100,
        value4: 100,
        value5: 100,
        value6: 100,
        bar: require('./images/Scroll@3x.png'),
        slider: require('./images/pic_black_btn.png'),
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
        mute6: true

      }
    },
    methods: {
      buttonActions (type) {
        switch (type) {
          case 'down':
            if (this.select < this.videoList.courseList.length - 1) {
              this.select++
            }
            break
          case 'up':
            if (this.select > 0) {
              this.select--
            }
            break
          case 'ok':
            this.okAction()
            break
        }
        console.log('buttonActions', this.select)
      },
      controlButtons ({show}) {
        this.show = show
      }
    },
    computed: {
    },
    created () {
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          case 49:
            this.value1 = Math.max(this.value1 - 5, 0)
            break
          case 50:
            this.mute1 = !this.mute1
            if (this.buttons1[1].icon === '0xe68c') {
              // 放音
              this.buttons1[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons1[1].icon = '0xe68c'
            }
            break
          case 51:
            this.value1 = Math.min(this.value1 + 5, 100)
            break
          case 56:
            this.value2 = Math.max(this.value2 - 5, 0)
            break
          case 57:
            if (this.buttons2[1].icon === '0xe68c') {
              // 放音
              this.buttons2[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons2[1].icon = '0xe68c'
            }
            break
          case 58:
            this.value2 = Math.min(this.value2 + 5, 100)
            break
          case 61:
            this.value3 = Math.max(this.value3 - 5, 0)
            break
          case 62:
            if (this.buttons3[1].icon === '0xe68c') {
              // 放音
              this.buttons3[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons3[1].icon = '0xe68c'
            }
            break
          case 63:
            this.value3 = Math.min(this.value3 + 5, 100)
            break
          case 68:
            this.value4 = Math.max(this.value4 - 5, 0)
            break
          case 69:
            if (this.buttons4[1].icon === '0xe68c') {
              // 放音
              this.buttons4[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons4[1].icon = '0xe68c'
            }
            break
          case 70:
            this.value4 = Math.min(this.value4 + 5, 100)
            break
          case 73:
            this.value5 = Math.max(this.value5 - 5, 0)
            break
          case 74:
            if (this.buttons5[1].icon === '0xe68c') {
              // 放音
              this.buttons5[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons5[1].icon = '0xe68c'
            }
            break
          case 75:
            this.value5 = Math.min(this.value5 + 5, 100)
            break
          case 78:
            this.value6 = Math.max(this.value6 - 5, 0)
            break
          case 79:
            if (this.buttons6[1].icon === '0xe68c') {
              // 放音
              this.buttons6[1].icon = '0xe603'
            } else {
              // 静音
              this.buttons6[1].icon = '0xe68c'
            }
            break
          case 80:
            this.value6 = Math.min(this.value6 + 5, 100)
            break
          case 85:
            // 重置
            this.value1 = 50
            this.value2 = 50
            this.value3 = 50
            this.value4 = 50
            this.value5 = 50
            this.value6 = 50
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
        this.sliderTop1 = (460 - (val / 5) * 23) - 34
      },
      value2: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop2 = (460 - (val / 5) * 23) - 34
      },
      value3: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop3 = (460 - (val / 5) * 23) - 34
      },
      value4: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop4 = (460 - (val / 5) * 23) - 34
      },
      value5: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop5 = (460 - (val / 5) * 23) - 34
      },
      value6: function (val, oldval) {
        if (val === oldval) {
          return
        }
        this.sliderTop6 = (460 - (val / 5) * 23) - 34
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
  height: 610px;
  top: 90px;
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
  height: 630px;
  top: 70px;
}

.vioceBox5 {
  left: 2222px;
  height: 630px;
  top: 70px;
}

.vioceBox6 {
  left: 2432px;
  height: 630px;
  top: 70px;
}

.vioceBar {
  left: 0px;
  top: 0;
  width: 168px;
  height: 495px;
  background-image: url('./images/Scroll@3x.png');
  background-size: cover;
}

.text1{
  width:214px;
  text-align: center;
  font-size:28px;
  height: 28px;
  text-indent: 40px;
  font-family:Adobe Heiti Std R;
  color:rgba(255,255,255,1);
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

.value1 {
  width:214px;
  text-align: center;
  height:30px;
  font-size:30px;
  font-family:ArialMT;
  color:rgba(255,255,255,1);
  line-height:51px;
  margin-bottom: 30px;
}

.bar {
  position: absolute;
  left: 0px;
  bottom: 6px;
  width: 168px;
  height: 461px;
}

.barA {
   bottom: 7px;
}

.slider1 {
  position: absolute;
  width: 64px;
  height: 86px;
  left:70px;
}

.mute {
  color:rgba(255,255,255,0.4);
}
</style>
