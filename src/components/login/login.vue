<template>
  <div class="login">
    <statusBar/>
    <findPrompt ref="prompt" :icon="promptInfo.icon" :text="promptInfo.text"  :delay="promptInfo.delay" :width="promptInfo.width" :height="promptInfo.height"></findPrompt>
    <find-keyboard ref="keyboard" :setValue="setValue"/>
    <login-banner ref="banner" :login="login"/>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
              :key="index"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>
</template>

<script>
  import findKeyboard from '../common/find-keyboard/find-keyboard'
  import loginBanner from './login-banner'
  import {INTERCEPT_DOWN} from 'vue-find'
  import findPrompt from '../common/find-prompt/find-prompt'
  import statusBar from '../common/find-status-bar/find-status-bar'
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
            backgroundColor: '#3000',
            dotColor: '#fff'
          },
          {
            pianoKey: 90,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff'

          },
          {
            pianoKey: 92,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff'
          },
          {
            pianoKey: 94,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff'
          }
        ],
        promptInfo: {
          show: false,
          text: '',
          icon: '',
          delay: 2000,
          width: 750,
          height: 450
        },
        toolbarHidden: false
      }
    },
    find: {
      /**
       * @desc 处理所有按键
       * */
      [INTERCEPT_DOWN] (key) {
        if (key === 21) {
          this.toolbarHidden = !this.toolbarHidden
          return
        }
        if (this.toolbarHidden) {
          return
        }
        if (key >= 27 && key <= 82) {
          /// 钢琴上的27是左边的按键,所以要减去27
          key = key - 27
          this.$refs.keyboard.clickKeyboard(key)
        }
        switch (key) {
          case 85:
            /// delete
            return this.buttonActions('delete')
          case 90:
            /// up
            return this.buttonActions('up')
          case 92:
            /// down
            return this.buttonActions('down')
          case 94:
            /// ok
            return this.buttonActions('ok')
          case 108:
            return this.$router.back()
        }
      }
    },
    methods: {
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
              console.log(`${data.header.desc}`)
              this.$refs.prompt.showPrompt()
              this.promptInfo.text = `${data.header.desc}`
              this.promptInfo.icon = 'icon-wrong'
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
    top: 275px;
    left: 2043px;
  }
</style>
