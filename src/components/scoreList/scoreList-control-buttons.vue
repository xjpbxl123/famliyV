<template>
  <div class="control-buttons-wrapper">
    <button v-for="button in controlsButtons"
                 :key="button.icon"
                 :class="`${button.className}`"
                  >
      <span class="content iconfont" :class="button.icon" ></span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'scoreListControlButtons',
    props: {
      collect: {
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
        controlsButtons: [
          {
            icon: 'icon-left',
            className: 'left key-73'
          },
          {
            icon: 'icon-right',
            className: 'right key-75'
          },
          {
            icon: 'icon-up',
            className: 'up key-78'
          },
          {
            icon: 'icon-down',
            className: 'down key-80'
          },
          {
            icon: 'icon-ok',
            className: 'ok key-82'
          },
          {
            icon: 'icon-favorite',
            className: 'favo key-85'
          }
        ]
      }
    },
    watch: {
      collect: function (value) {
        let icon = 'icon-favorite'
        value.forEach((item) => {
          if (item.collection) {
            icon = 'icon-favorite-on'
          }
        })
        this.controlsButtons[5].icon = icon
      }
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
.control-buttons-wrapper {
  position: absolute;
  bottom: 0;
}
button {
  bottom: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  .content {
    width: 50px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    border-radius: 16px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
    color: #fff;
    font-size: 36px;
  }
  &.left {
    background: #6f24d2;
    .content{
      background-image: linear-gradient(-180deg, #ce9cfe 30%, #6f24d2 97%);
    }
  }
  &.right {
    background: #c72bbb;
    .content {
      background-image: linear-gradient(-180deg, #fe9be6 30%, #c72bbb 97%);
    }
  }
  &.up {
    background: #6f24d2;
    .content {
      background-image: linear-gradient(-180deg, #ce9cfe 30%, #6f24d2 97%);
    }
  }
  &.down {
    background: #c72bbb;
    .content {
      background-image: linear-gradient(-180deg, #fe9be6 30%, #c72bbb 97%);
    }
  }
  &.ok {
    background: #109892;
    .content {
      background-image: linear-gradient(-180deg, #6de4d9 30%, #109892 97%);
    }
  }
  &.favo {
    background: #c72bbb;
    .content {
      background-image: linear-gradient(-180deg, #fe9be6 30%, #c72bbb 97%);
    }
  }

}
</style>
