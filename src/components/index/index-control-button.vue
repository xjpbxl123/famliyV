<template>
  <div class="control-buttons-wrapper">
    <find-button v-for="buttons in controlsButtons"
                 :key="buttons.icon"
                 :class-name="`${buttons.className} control-buttons`">
      <i class="iconfont" :class="buttons.icon"> </i>
      <findDot class-name="dot"/>
    </find-button>
  </div>
</template>

<script>
  import findDot from '../common/find-dot/find-dot'
  import findButton from '../common/find-button/find-button'

  export default {
    name: 'control-buttons',
    props: {
      action: Function
    },
    data () {
      return {
        controlsButtons: [
          {
            icon: 'icon-shutdown',
            className: 'shutdown',
            meta: { type: 'shutdown' }
          },
          {
            icon: 'icon-left',
            className: 'left',
            meta: { type: 'left' }
          },
          {
            icon: 'icon-right',
            className: 'right',
            meta: { type: 'right' }
          },
          {
            icon: 'icon-up',
            className: 'up',
            meta: { type: 'up' }
          },
          {
            icon: 'icon-down',
            className: 'down',
            meta: { type: 'down' }
          },
          {
            icon: 'icon-ok',
            className: 'ok',
            meta: { type: 'ok' }
          }
        ]
      }
    },
    components: {
      findButton,
      findDot
    }
  }
</script>

<style lang="scss" scoped>
.control-buttons-wrapper {
  display: flex;
}

.control-buttons {
  position: absolute;
  bottom: 5px;
  transform: translateX(-50%);
  .iconfont {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 16px;
  }
  &.shutdown {
    left: 1982px;
    .dot {
      background: #3b3b39;
    }
    .icon-shutdown {
      background-image: linear-gradient(-180deg, #c0c0c0 30%, #3b3b39 97%);
    }
  }
  &.left {
    left: 2332px;
    .dot {
      background: #6f24d2;
    }
    .icon-left {
      background-image: linear-gradient(-180deg, #ce9cfe 30%, #6f24d2 97%);
    }
  }
  &.right {
    left: 2434px;
    .dot {
      background: #c72bbb;
    }
    .icon-right {
      background-image: linear-gradient(-180deg, #fe9be6 30%, #c72bbb 97%);
    }
  }
  &.up {
    left: 2585px;
    .dot {
      background: #6f24d2;
    }
    .icon-up {
      background-image: linear-gradient(-180deg, #ce9cfe 30%, #6f24d2 97%);
    }
  }
  &.down {
    left: 2683px;
    .dot {
      background: #c72bbb;
    }
    .icon-down {
      background-image: linear-gradient(-180deg, #fe9be6 30%, #c72bbb 97%);
    }
  }
  &.ok {
    left: 2778px;
    .dot {
      background: #109892;
    }
    .icon-ok {
      background-image: linear-gradient(-180deg, #6de4d9 30%, #109892 97%);
    }
  }
}
</style>
