<template>
  <div class="login">
    <login-keyboard ref="keyboard"/>
    <login-banner :user-name="userName" :password="password"/>
  </div>
</template>

<script>
  import loginKeyboard from './login-keyboard'
  import loginBanner from './login-banner'
  import { KEY_ANY } from 'vue-find'

  export default {
    name: 'login',
    data () {
      return {
        userName: '',
        password: ''
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
      }
    },
    components: {
      loginKeyboard,
      loginBanner
    }
  }
</script>

<style scoped>

</style>
