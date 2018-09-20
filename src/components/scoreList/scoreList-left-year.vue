<template>
 <div class="scoreListLeft">
   <div class="title">
     <span>
       {{year.name}}
     </span>
   </div>
    <findImg :src="year.coverSmall" class="cover"></findImg>
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
      year: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
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
