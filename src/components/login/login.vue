<template>
  <div class="login">
    <statusBar/>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text"  :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height"></findPrompt>
    <!-- <find-keyboard ref="keyboard" :setValue="setValue" v-if="!toolbarHidden && show"/> -->
    <login-banner ref="banner" :login="login"/>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
              :key="index"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
        <keys-item id='27' text="0xe618" pianoKey="27" :style="{backgroundColor:'#FF000000', cornorType:-1, cornorRadius:15,fontSize:30}" />
        <keys-item v-for="item in keyBoards1"
              :key="item.pianoKey"
              :id="item.pianoKey"
              :pianoKey="item.pianoKey"
              :style="{backgroundColor:item.backgroundColor,strockColor:'#979797',textColor:item.textColor,fontSize:30,fontWeight:'bold'}"
              :text="upper?item.text.toLocaleUpperCase():item.text" />
        <keys-item v-for="item in keyBoards2"
              :key="item.pianoKey"
              :id="item.pianoKey"
              :pianoKey="item.pianoKey"
              :style="{backgroundColor:item.backgroundColor,strockColor:'#979797',fontSize: 38,color:item.color}"
              :text="item.text" />
        <keys-item v-for="item in keyBoards3"
              :key="item.pianoKey + 500"
              :id="item.pianoKey"
              :pianoKey="item.pianoKey"
              :style="{backgroundColor:item.backgroundColor, cornorType:item.cornorType,cornorRadius:item.cornorRadius,textColor:item.textColor,strockColor:'#979797',fontSize:30,fontWeight:'bold'}"
              :text="changeSymbol?item.symbolText:item.text" />
    </toolbar>
  </div>
</template>

<script>
  import findKeyboard from '../common/find-keyboard/find-keyboard'
  import loginBanner from './login-banner'
  import { KEY27, KEY28, KEY29, KEY30, KEY31, KEY32, KEY33, KEY34, KEY35, KEY36, KEY37, KEY38, KEY39, KEY40, KEY41, KEY42, KEY43, KEY44, KEY45, KEY46, KEY47, KEY48, KEY49, KEY50, KEY51, KEY52, KEY53, KEY54, KEY55, KEY56, KEY57, KEY58, KEY59, KEY60, KEY61, KEY62, KEY63, KEY64, KEY65, KEY66, KEY67, KEY68, KEY69, KEY70, KEY71, KEY72, KEY73, KEY74, KEY75, KEY76, KEY77, KEY78, KEY79, KEY80, KEY81, KEY82, KEY85, KEY90, KEY92, KEY94, TOOLBAR_PRESSED, BACK_PRESSED
  } from 'vue-find'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import findPrompt from '../common/find-prompt/find-prompt'
  import {errorHandling} from '../../scripts/utils'
  export default {
    name: 'login',
    data () {
      return {
        value: '',
        controlButtons: [
          {
            pianoKey: 85,
            text: '',
            icon: '0xe608',
            backgroundColor: '#4000',
            dotColor: '#fff'
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#4000',
            dotColor: '#fff'

          },
          {
            pianoKey: 92,
            text: '',
            icon: '0xe650',
            backgroundColor: '#4000',
            dotColor: '#fff'
          },
          {
            pianoKey: 94,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff'
          }
        ],
        promptInfo: {
          show: false,
          text: '',
          icon: '',
          delay: 2000,
          width: 640,
          height: 360
        },
        toolbarHidden: false,
        loadTime: 0,
        show: false,
        keyBoards1: [
          {
            pianoKey: 28,
            text: 'a',
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'b',
            pianoKey: 29,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'c',
            pianoKey: 30,
            backgroundColor: '#252635'
          },
          {
            text: 'd',
            pianoKey: 31,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'e',
            pianoKey: 32,
            backgroundColor: '#252635'
          },
          {
            text: 'f',
            pianoKey: 33,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'g',
            pianoKey: 34,
            backgroundColor: '#252635'
          },
          {
            text: 'h',
            pianoKey: 35,
            backgroundColor: '#D6D8E6',
            textColor: '000'
          },
          {
            text: 'i',
            pianoKey: 36,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'j',
            pianoKey: 37,
            backgroundColor: '#252635'
          },
          {
            text: 'k',
            pianoKey: 38,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'l',
            pianoKey: 39,
            backgroundColor: '#252635'
          },
          {
            text: 'm',
            pianoKey: 40,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'n',
            pianoKey: 41,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'o',
            pianoKey: 42,
            backgroundColor: '#252635'
          },
          {
            text: 'p',
            pianoKey: 43,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'q',
            pianoKey: 44,
            backgroundColor: '#252635'
          },
          {
            text: 'r',
            pianoKey: 45,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 's',
            pianoKey: 46,
            backgroundColor: '#252635'
          },
          {
            text: 't',
            pianoKey: 47,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'u',
            pianoKey: 48,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'v',
            pianoKey: 49,
            backgroundColor: '#252635'
          },
          {
            text: 'w',
            pianoKey: 50,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'x',
            pianoKey: 51,
            backgroundColor: '#252635'
          },
          {
            text: 'y',
            pianoKey: 52,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: 'z',
            pianoKey: 53,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '0',
            pianoKey: 54,
            backgroundColor: '#252635'
          },
          {
            text: '1',
            pianoKey: 55,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '2',
            pianoKey: 56,
            backgroundColor: '#252635'
          },
          {
            text: '3',
            pianoKey: 57,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '4',
            pianoKey: 58,
            backgroundColor: '#252635'
          },
          {
            text: '5',
            pianoKey: 59,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '6',
            pianoKey: 60,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '7',
            pianoKey: 61,
            backgroundColor: '#252635'
          },
          {
            text: '8',
            pianoKey: 62,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '9',
            pianoKey: 63,
            backgroundColor: '#252635'
          },
          {
            text: ' ',
            pianoKey: 64,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: ' ',
            pianoKey: 65,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          }
        ],
        keyBoards2: [
          {
            text: '0xe62d',
            pianoKey: 66,
            backgroundColor: '#252635',
            color: '#fff'
          },
          {
            text: '0xe66a',
            pianoKey: 67,
            backgroundColor: '#D6D8E6',
            textColor: '#000',
            color: '#7000'
          }
        ],
        keyBoards3: [
          {
            text: ',',
            symbolText: '^',
            pianoKey: 68,
            backgroundColor: '#252635'
          },
          {
            text: '.',
            symbolText: '*',
            pianoKey: 69,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '?',
            symbolText: '+',
            pianoKey: 70,
            backgroundColor: '#252635'
          },
          {
            text: '/',
            symbolText: '-',
            pianoKey: 71,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '!',
            symbolText: '=',
            pianoKey: 72,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '~',
            symbolText: '_',
            pianoKey: 73,
            backgroundColor: '#252635'
          },
          {
            text: '@',
            symbolText: '<',
            pianoKey: 74,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '#',
            symbolText: '>',
            pianoKey: 75,
            backgroundColor: '#252635'
          },
          {
            text: '$',
            symbolText: '\\',
            pianoKey: 76,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '%',
            symbolText: '(',
            pianoKey: 77,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '{',
            symbolText: ')',
            pianoKey: 78,
            backgroundColor: '#252635'
          },
          {
            text: '}',
            symbolText: '[',
            pianoKey: 79,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '|',
            symbolText: ']',
            pianoKey: 80,
            backgroundColor: '#252635'
          },
          {
            text: ':',
            symbolText: "'",
            pianoKey: 81,
            backgroundColor: '#D6D8E6',
            textColor: '#000'
          },
          {
            text: '&',
            symbolText: '"',
            pianoKey: 82,
            backgroundColor: '#252635',
            cornorType: 1,
            cornorRadius: 15
          }
        ],
        upper: false,
        changeSymbol: false
      }
    },
    find: {
      /**
       * @desc 处理所有按键
       * */
      [TOOLBAR_PRESSED] (data) {
        this.toolbarHidden = data.hidden
      },
      [KEY27] () {
        this.clickKeyboard(0)
      },
      [KEY28] () {
        this.clickKeyboard(1)
      },
      [KEY29] () {
        this.clickKeyboard(2)
      },
      [KEY30] () {
        this.clickKeyboard(3)
      },
      [KEY31] () {
        this.clickKeyboard(4)
      },
      [KEY32] () {
        this.clickKeyboard(5)
      },
      [KEY33] () {
        this.clickKeyboard(6)
      },
      [KEY34] () {
        this.clickKeyboard(7)
      },
      [KEY35] () {
        this.clickKeyboard(8)
      },
      [KEY36] () {
        this.clickKeyboard(9)
      },
      [KEY37] () {
        this.clickKeyboard(10)
      },
      [KEY38] () {
        this.clickKeyboard(11)
      },
      [KEY39] () {
        this.clickKeyboard(12)
      },
      [KEY40] () {
        this.clickKeyboard(13)
      },
      [KEY41] () {
        this.clickKeyboard(14)
      },
      [KEY42] () {
        this.clickKeyboard(15)
      },
      [KEY43] () {
        this.clickKeyboard(16)
      },
      [KEY44] () {
        this.clickKeyboard(17)
      },
      [KEY45] () {
        this.clickKeyboard(18)
      },
      [KEY46] () {
        this.clickKeyboard(19)
      },
      [KEY47] () {
        this.clickKeyboard(20)
      },
      [KEY48] () {
        this.clickKeyboard(21)
      },
      [KEY49] () {
        this.clickKeyboard(22)
      },
      [KEY50] () {
        this.clickKeyboard(23)
      },
      [KEY51] () {
        this.clickKeyboard(24)
      },
      [KEY52] () {
        this.clickKeyboard(25)
      },
      [KEY53] () {
        this.clickKeyboard(26)
      },
      [KEY54] () {
        this.clickKeyboard(27)
      },
      [KEY55] () {
        this.clickKeyboard(28)
      },
      [KEY56] () {
        this.clickKeyboard(29)
      },
      [KEY57] () {
        this.clickKeyboard(30)
      },
      [KEY58] () {
        this.clickKeyboard(31)
      },
      [KEY59] () {
        this.clickKeyboard(32)
      },
      [KEY60] () {
        this.clickKeyboard(33)
      },
      [KEY61] () {
        this.clickKeyboard(34)
      },
      [KEY62] () {
        this.clickKeyboard(35)
      },
      [KEY63] () {
        this.clickKeyboard(36)
      },
      [KEY64] () {
        this.clickKeyboard(37)
      },
      [KEY65] () {
        this.clickKeyboard(38)
      },
      [KEY66] () {
        this.clickKeyboard(39)
      },
      [KEY67] () {
        this.clickKeyboard(40)
      },
      [KEY68] () {
        this.clickSymbol(0)
      },
      [KEY69] () {
        this.clickSymbol(1)
      },
      [KEY70] () {
        this.clickSymbol(2)
      },
      [KEY71] () {
        this.clickSymbol(3)
      },
      [KEY72] () {
        this.clickSymbol(4)
      },
      [KEY73] () {
        this.clickSymbol(5)
      },
      [KEY74] () {
        this.clickKeyboard(6)
      },
      [KEY75] () {
        this.clickSymbol(7)
      },
      [KEY76] () {
        this.clickSymbol(8)
      },
      [KEY77] () {
        this.clickSymbol(9)
      },
      [KEY78] () {
        this.clickSymbol(10)
      },
      [KEY79] () {
        this.clickSymbol(11)
      },
      [KEY80] () {
        this.clickSymbol(12)
      },
      [KEY81] () {
        this.clickSymbol(13)
      },
      [KEY82] () {
        this.clickSymbol(14)
      },
      [KEY85] () {
        return this.buttonActions('delete')
      },
      [KEY90] () {
        return this.buttonActions('up')
      },
      [KEY92] () {
        return this.buttonActions('down')
      },
      [KEY94] () {
        return this.buttonActions('ok')
      },
      [BACK_PRESSED] () {
        if (+new Date() - this.loadTime < 500) {
          return
        }
        this.show = false
        this.$router.back()
      }
    },
    methods: {
      /**
       * @desc 处理钢琴按下按键对应的文本
       * @param {Number} index - 按下按键对应的文本索引
       * */
      clickKeyboard (index) {
        switch (index) {
          /// switch lower-case/upper-case
          case 0:
            this.upper = !this.upper
            return ''
          case 39:
            return this.setValue(' ')
          case 40:
            this.changeSymbol = !this.changeSymbol
            return ''
        }
        this.setValue(this.upper ? this.keyBoards1[index - 1].text.toLocaleUpperCase() : this.keyBoards1[index - 1].text)
      },
      clickSymbol (index) {
        this.setValue(this.changeSymbol ? this.keyBoards3[index].symbolText : this.keyBoards3[index].text)
      },
      setValue (value) {
        this.$refs.banner.setValue(value)
      },
      login (userName, password) {
        let env = this.$store.state.environments
        if (process.env.NODE_ENV !== 'production') {
          userName = userName || env.default_user_name
          password = password || env.default_password
        }
        this.$store
          .dispatch('login/login', {userName, password})
          .then((data) => {
            if (data.isLogin) {
              this.$store.dispatch('getUserInfo', {root: true}).then((data) => {
                this.$router.push('/')
              })
            } else {
              errorHandling(data)
            }
          })
      },
      buttonActions (type) {
        switch (type) {
          case 'delete':
            this.$refs.banner.delete()
            break
          case 'up':
            this.$refs.banner.setFocus('account')
            break
          case 'down':
            this.$refs.banner.setFocus('password')
            break
          case 'ok':
            this.$refs.banner.toLogin()
            break
        }
      }
    },
    created () {
      console.log('login--created', window.location.href)
      this.loadTime = +new Date()
    },
    mounted () {
      this.show = true
    },
    components: {
      findKeyboard,
      loginBanner,
      findPrompt,
      statusBar
    }
  }
</script>

<style scoped>
  .find-prompt {
    width: 750px;
    height: 450px;
    position: absolute;
    top: 500px;
    left: 2043px;
  }
</style>
