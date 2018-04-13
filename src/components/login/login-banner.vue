<template>
  <div class="login">
    <div>
      <h1 class="logo"></h1>
      <input type="text" title="账号">
      <input type="password" title="密码">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-banner'
  }
</script>

<style lang="scss" scoped>
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
</style>
