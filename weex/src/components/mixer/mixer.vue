<template>
  <div class="mixer">
    <image :src="back" class="back"></image>
    <div class="vioceBox vioceBox1 ">
      <text class="text1">总音量</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox2">
      <text class="text1">电子音源音量</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox3">
      <text class="text1">自动演奏音量</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox4">
      <text class="text1 textA">音频音量</text>
      <text class="text2">(视频/伴奏)</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox5">
      <text class="text1 textA">音频分音量</text>
      <text class="text2">(人声)</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
      </div>
    </div>
    <div class="vioceBox vioceBox6">
      <text class="text1 textA">音频分音量</text>
      <text class="text2">(配乐)</text>
      <text class="value1">{{value1}}</text>
      <image :src="bar" class="vioceBar">
      </image>
      <div class="bar barA">
        <image :src="slider" class="slider1" :style="{top: sliderTop+'px'}"></image>
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
        value1: 50,
        bar: require('./images/Scroll@3x.png'),
        slider: require('./images/pic_black_btn.png'),
        back: require('./images/pic_background.png'),
        sliderTop: -34
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
      // this.value1 = 50
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          case 49:
            this.value1 = Math.max(this.value1 - 5, 0)
            break
          case 50:
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
        this.sliderTop = (460 - (val / 5) * 23) - 34
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
  /* overflow: visible; */

}

.barA {
   bottom: 6px;
}

.slider1 {
  position: absolute;
  width: 64px;
  height: 86px;
  left:70px;
}

</style>
