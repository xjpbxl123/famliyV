<template>
  <div class="user-buttons-wrapper">
    <find-button v-for="button in userActionButtons"
                 :className="button.className"
                 :iconClass="button.icon"
                 :text="button.text"
                 :key="button.text"
                 :action="()=>action(button.className)"/>
  </div>
</template>

<script>
  import findButton from '../common/find-button/find-button'
  export default {
    name: 'index-user-buttons',
    props: {
      action: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        userActionButtons: [
          {
            text: '帮助',
            icon: 'icon-help',
            className: 'help'
          },
          {
            text: '登录',
            icon: 'icon-username',
            className: 'login'
          },
          {
            text: '设置',
            icon: 'icon-settings',
            className: 'settings'
          }
        ]
      }
    },
    components: {
      findButton
    }
  }
</script>

<style lang="scss" scoped>
.user-buttons-wrapper {
  display: flex;
}
.login {
  margin-left: 107px;
}

.settings {
  margin-left: 50px;
}
</style>
