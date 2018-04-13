<template>
  <div class="button-banner">
    <find-button
      v-for="button in buttons"
      :key="button.iconClass"
      :className="button.className"
      :iconClass="button.iconClass"
      :action="()=>{action(button.className)}"
    >
      <i class="iconfont" :class="button.iconClass"></i>
      <find-dot class-name="dot"/>
    </find-button>
  </div>
</template>

<script>
  import findButton from '../common/find-button/find-button'
  import findDot from '../common/find-dot/find-dot'

  export default {
    name: 'login-button',
    data () {
      return {
        buttons: [
          {
            iconClass: 'icon-delete',
            className: 'delete'
          },
          {
            iconClass: 'icon-up',
            className: 'up'
          },
          {
            iconClass: 'icon-down',
            className: 'down'
          },
          {
            iconClass: 'icon-ok',
            className: 'ok'
          }
        ]
      }
    },
    props: {
      action: { type: Function, default: () => {} }
    },
    components: {
      findButton,
      findDot
    }
  }
</script>

<style lang="scss" scoped>
.button-banner {
  position: absolute;
  bottom: 10px;
}

button {
  position: absolute;
  bottom: 4px;
  transform: translateX(-50%);
  text-align: center;
  background-color: transparent;
  color: #fff;
  i {
    width: 50px;
    height: 50px;
    line-height: 58px;
    font-size: 36px;
    border-radius: 16px;
  }
}

.delete {
  left: 2932px;
  .icon-delete {
    background-image: linear-gradient(
      0deg,
      #f44242 3%,
      #ec6060 46%,
      #ff9494 97%
    );
  }
  .dot {
    background: #ff9494;
  }
}

.up {
  left: 3180px;
  .icon-up {
    background-image: linear-gradient(
      -180deg,
      #9db9ff 7%,
      #5a7ee5 54%,
      #4467d4 96%
    );
  }
  .dot {
    background: #84a7ff;
  }
}

.down {
  left: 3282px;
  .icon-down {
    background-image: linear-gradient(
      -180deg,
      #9db9ff 7%,
      #5a7ee5 54%,
      #4467d4 96%
    );
  }
  .dot {
    background: #84a7ff;
  }
}

.ok {
  left: 3380px;
  .icon-ok {
    background-image: linear-gradient(
      -180deg,
      #9db9ff 7%,
      #5a7ee5 54%,
      #4467d4 96%
    );
  }
  .dot {
    background: #84a7ff;
  }
}
</style>
