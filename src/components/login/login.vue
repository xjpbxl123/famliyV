<template>
  <div class="login">
    <login-keyboard ref="keyboard" :setValue="setValue"/>
    <login-banner ref="banner" :login="login"/>
    <login-button :action="buttonActions"/>
  </div>
</template>

<script>
  import loginKeyboard from './login-keyboard'
  import loginBanner from './login-banner'
  import loginButton from './login-button'
  import { KEY_ANY, KEY85, KEY90, KEY92, KEY94 } from 'vue-find'

  export default {
    name: 'login',
    data () {
      return {
        value: ''
      }
    },
    find: {
      /**
       * @desc 处理所有按键
       * */
      [KEY_ANY] (key) {
        if (key >= 27 && key <= 82) {
          /// 钢琴上的27是左边的按键,所以要减去27
          key = key - 27
          this.$refs.keyboard.clickKeyboard(key)
        }
      },
      /// delete
      [KEY85] () {
        this.buttonActions('delete')
      },
      /// up
      [KEY90] () {
        this.buttonActions('up')
      },
      /// down
      [KEY92] () {
        this.buttonActions('down')
      },
      /// ok
      [KEY94] () {
        this.buttonActions('ok')
      }
    },
    methods: {
      setValue (value) {
        this.$refs.banner.setValue(value)
      },
      login (userName, password) {
        let env = process.env[process.env.NODE_ENV]
        userName = userName || env.default_user_name
        password = password || env.default_password
        this.$store
          .dispatch('login/login', {userName, password})
          .then((data) => {
            this.$store.dispatch('getUserInfo', {root: true}).then(() => {
              this.$router.push('/')
            })
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
      loginKeyboard,
      loginBanner,
      loginButton
    }
  }
</script>

<style scoped>
</style>
