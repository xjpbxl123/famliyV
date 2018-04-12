<template>
  <div class="user-buttons-wrapper">
    <find-button v-for="buttons in userActionButtons"
                 :className="buttons.className"
                 :iconClass="buttons.icon"
                 :text="buttons.text"
                 :meta="buttons.meta"
                 :key="buttons.text"
                 :action="action"/>
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
            className: 'help',
            meta: { type: 'help' }
          },
          {
            text: '登录',
            icon: 'icon-username',
            className: 'user',
            meta: { type: 'user' }
          },
          {
            text: '设置',
            icon: 'icon-settings',
            className: 'settings',
            meta: { type: 'settings' }
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
.user {
  margin-left: 107px;
}

.settings {
  margin-left: 50px;
}
</style>
