<template>
   <div class="chooseButton">
       <div v-for="(item,index) in files"
        class="eachItem"
        :key="index"
        @click="clickPlay(index+1)"
        :class="{type1:(item.styleName==='钢琴独奏版'),
        type2:(item.styleName==='初练版'),
        type3:(item.styleName==='器乐弹唱版'),
        type4:(item.styleName==='钢琴弹唱版'),
        type5:(item.styleName==='器乐合奏版')}"
        :style="{'left': position[index]+'px'}">
       </div>
   </div>

</template>
<script type="text/javascript">
  import { modules } from 'find-sdk'
  export default {
    props: {
      files: {
        type: Array,
        default: () => ([])
      },
      clickPlay: {
        type: Function
      }
    },
    data () {
      return {
        filterFile: [],
        position: []
      }
    },
    methods: {
    },
    created () {
      modules.global.getKeyboardPosition().then((data) => {
        if (data) {
          this.position = [data[70].centerX - 6, data[78].centerX - 6, data[85].centerX - 6, data[92].centerX, data[99].centerX - 1]
        }
      })
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  .chooseButton {
    width: 100%;
    left:0;
    position: absolute;
    z-index: 200;
    bottom: 0;
    padding-left: 2146px;
    div {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        bottom: 10px;
        &.type1 {
          background-color: #1E7FFB;
        }
        &.type2 {
          background-color: #23C797;
        }
        &.type3 {
          background-color: #8E37FB;
        }
        &.type4 {
          background-color: #FB7E2E;
        }
        &.type5 {
          background-color: #FA5355;
        }
        &:nth-child(1) {
          left: 2177px;
        }
        &:nth-child(2) {
          left: 2578px;
        }
        &:nth-child(3) {
          left: 2929px;
        }
        &:nth-child(4) {
          left: 3279px;
        }
        &:nth-child(5) {
          left: 3630px;
        }

    }
  }

</style>
