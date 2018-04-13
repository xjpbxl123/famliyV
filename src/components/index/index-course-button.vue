<template>
  <div>
    <find-button v-for="buttons in courseButtons"
                 :className="`${buttons.className} course-buttons`"
                 :text="buttons.text"
                 :key="buttons.text"
                 :action="()=>action(button.className)">
      <i :class="`${buttons.className} icon`"></i>
      <span v-text="buttons.text"></span>
      <find-dot/>
    </find-button>
  </div>
</template>

<script>
  import findButton from '../common/find-button/find-button'
  import findDot from '../common/find-dot/find-dot'
  export default {
    name: 'index-course-button',
    props: {
      action: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        courseButtons: [
          {
            text: '我的曲谱',
            className: 'score'
          },
          {
            text: '弹奏录制',
            className: 'recording'
          },
          {
            text: '教材系列',
            className: 'material'
          },
          {
            text: '流行经典',
            className: 'popular'
          },
          {
            text: '名师课程',
            className: 'master'
          },
          {
            text: '游戏应用',
            className: 'game'
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
.course-buttons {
  position: absolute;
  bottom: 5px;
  transform: translateX(-50%);
  &.score {
    left: 545px;
  }
  &.recording {
    left: 647px;
  }
  &.popular {
    left: 798px;
  }
  &.material {
    left: 895px;
  }
  &.master {
    left: 995px;
  }
  &.game {
    left: 1147px;
  }
}

.course-buttons {
  .icon {
    width: 80px;
    height: 72px;
  }
  .score {
    background: transparent url("images/my-score.png") center /cover no-repeat;
  }

  .recording {
    background: transparent url("images/recording.png") center /cover no-repeat;
  }

  .popular {
    background: transparent url("images/popular.png") center /cover no-repeat;
  }

  .material {
    background: transparent url("images/material.png") center /cover no-repeat;
  }

  .master {
    background: transparent url("images/master.png") center /cover no-repeat;
  }

  .game {
    background: transparent url("images/game.png") center /cover no-repeat;
  }
}
</style>
