<template>
  <div class="login">
    <div>
      <div class="logo iconfont icon-logo" ></div>
      <div class="account" :class="{active:accountActive}">
        <i class="iconfont icon-username"></i>
        <input type="text" placeholder="用户名" title="账号" v-model="account" @focus="setFocus('account')"  autofocus="autofocus" v-focus>
      </div>
      <div class="password" :class="{active:passwordActive}">
        <i class="iconfont icon-password"></i>
        <input type="password" placeholder="密码" title="密码" v-model="password" @focus="setFocus('password')">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-banner',
    data () {
      return {
        account: '',
        password: '',
        accountActive: true,
        passwordActive: false
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    props: {
      login: Function
    },
    methods: {
      /**
       * @desc 设置焦点
       * @param {String} target - 需要设置的目标
       * */
      setFocus (target) {
        if (target === 'account') {
          this.passwordActive = !(this.accountActive = true)
        } else {
          this.accountActive = !(this.passwordActive = true)
        }
      },
      /**
       * @desc 输入新的值
       * */
      setValue (newValue) {
        if (this.accountActive) {
          this.account = this.account + newValue
        } else {
          this.password = this.password + newValue
        }
      },
      /**
       * @desc 登录,调用父组件的方法
       * */
      toLogin () {
        this.login(this.account, this.password)
      },
      delete () {
        if (this.accountActive) {
          this.account = this.account.slice(0, this.account.length - 1)
        } else {
          this.password = this.password.slice(0, this.password.length - 1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.logo {
  color: rgba(9, 75, 168, 0.7);
  font-size: 100px;
  margin: 0 auto;
  text-align: center;
}

.login {
  width: 600px;
  height: 420px;
  position: absolute;
  right: 1020px;
  top: 238px;
  box-sizing: border-box;
  padding: 0 70px;
  border-radius: 40px;
  background: transparent url("./bg-signin.png") no-repeat center;
}

.account,
.password {
  position: relative;
  border-bottom: 1px solid rgba(9, 75, 168, 0.7);
  width: 100%;
  height: 110px;
  box-sizing: border-box;
  padding-top: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  input,
  input::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  i {
    font-size: 40px;
    color: #3b3d46;
  }
  &.active {
    input::placeholder,
    input {
      color: rgba(9, 75, 166, 0.7);
    }
    i {
      color: #2a61b2;
      font-size: 44px;
    }
  }
}

input {
  position: relative;
  width: 386px;
  height: 50px;
  padding: 0 20px;
  font-size: 36px;
  background: transparent;
  border: none;
  outline: none;
}
</style>
