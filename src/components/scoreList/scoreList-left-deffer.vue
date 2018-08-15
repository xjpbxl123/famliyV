<template>
 <div class="scoreListLeft">
   <div class="title">
     <span>
       lv.{{differ.starNum}}
     </span>
   </div>
    <findImg :src="differ.coverSmall" class="cover"></findImg>
    <div class="rhythmic">
      {{differ.differC}}
    </div>
 </div>
</template>
<script type="text/javascript">
  import findImg from '../common/find-img/find-img'
  export default {
    data () {
      return {
      }
    },
    props: {
      differ: {
        type: Object,
        default: () => { return {} }
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
      console.log(this.differ, 'differ')
    },
    components: {
      findImg
    }
  }
</script>
<style lang="scss" scoped>
  .scoreListLeft {
    .title {
      font-size: 40px;
      font-weight: 700;
      color: #fff;
      position: absolute;
      top: 85px;
      left: 240px;
      &::after {
        content: '';
        position: absolute;
        width: 500px;
        height: 1px;
        bottom: 10px;
        background: -webkit-linear-gradient(left, white, rgba(255, 255, 255, 0));
        left: 120%;
      }
    }
    .cover {
      width: 340px;
      height: 482px;
      position: absolute;
      top: 230px;
      left: 260px;
    }
    .rhythmic {
      font-size: 30px;
      color: #fff;
      position: absolute;
      width: 100%;
      text-align: center;
      top: 750px;
    }
  }
</style>
