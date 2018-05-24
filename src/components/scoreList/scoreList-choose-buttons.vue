<template>
   <div class="chooseButton">
       <div v-for="(item,index) in files"
        :key="index"
        :class="{type1:(item.styleName==='钢琴独奏版'),
        type2:(item.styleName==='钢琴弹唱版'),
        type3:(item.styleName==='初练版'),
        type4:(item.styleName==='器乐合奏版'),
        type5:(item.styleName==='器乐弹唱版')}">
       </div>
   </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      files: {
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  .chooseButton {
    width: 50%;
    left: 50%;
    position: absolute;
    bottom: 0;
    z-index: 200;
    div {
        width: 240px;
        height: 60px;
        float: left;
        margin-right: 140px;
        &.type1 {
          background: url('./images/type1_b.png');
          background-size: cover;
        }
        &.type2 {
          background: url('./images/type2_b.png');
          background-size: cover;
        }
        &.type3 {
          background: url('./images/type3_b.png');
          background-size: cover;
        }
        &.type4 {
          background: url('./images/type4_b.png');
          background-size: cover;
        }
        &.type5 {
          background: url('./images/type5_b.png');
          background-size: cover;
        }
    }
  }

</style>
