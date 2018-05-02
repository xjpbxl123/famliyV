<template>
  <div class="voice-wrapper">
    <div class="voice-control" v-for="control in controls" :key="control.icon">
      <span>
        <span v-if="control.text" v-text="control.text"></span>
        <i v-else class="iconfont" :class="control.icon"></i>
      </span>
      <find-dot v-if="control.dot" class-name="find-dot"/>
    </div>
  </div>
</template>

<script>
  import findDot from '../common/find-dot/find-dot'

  export default {
    name: 'voice-control',
    data () {
      return {
        controls: [
          { icon: 'icon-metronome', text: '', dot: true },
          { icon: 'icon-minus', text: '', dot: true },
          { icon: 'icon-num', text: '120', dot: false },
          { icon: 'icon-plus', text: '', dot: true },
          { icon: '', text: '3/8', dot: true }
        ]
      }
    },
    components: {
      findDot
    }
  }
</script>

<style lang="scss" scoped>
.voice-wrapper {
  display: flex;
  position: relative;
  top: 12px;
  left: 1177px;
  border-radius: 16px;
  width: 250px;
  height: 50px;
  background-image: linear-gradient(
    -180deg,
    #6ae5c9 0%,
    #40baa7 50%,
    #00a490 100%
  );
  transform: translateX(-50%);
  color: #fff;
}

.voice-control {
  position: relative;
  font-size: 19px;
  &:last-child span {
    border: none;
  }
}

span {
  display: inline-block;
  border-right: {
    width: 1px;
    style: solid;
  }
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  border-image: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    )
    24 24;
}

.iconfont {
  font-size: 28px;
}

.find-dot {
  background-color: #40baa7 !important;
  bottom: -20px;
  left: 20px;
}
</style>
