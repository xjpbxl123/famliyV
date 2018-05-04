<template>
  <find-wrap title="教材系列" :scrollTop="materialScrollTop">
    <find-ablum-card v-for="(item,index) in materialList" class="find-ablum-card" :key="index"
                     :index="index" :select="materialSelect"></find-ablum-card>
  </find-wrap>
</template>
<style lang="scss" scoped type=text/scss>
  .find-ablum-card {
    margin-right: 30px;
    float: left;
    margin-bottom: 30px;
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import findWrap from 'components/common/find-wrap/find-wrap'
  import findAblumCard from 'components/common/find-ablum-card/find-ablum-card'
  import {
    KEY75,
    KEY78
  } from 'vue-find'

  export default {
    name: 'material',
    data () {
      return {
        materialScrollTop: 0,
        materialSelect: 0
      }
    },
    find: {
      [KEY75] () {
        this.buttonActions('left')
      },
      [KEY78] () {
        this.buttonActions('right')
      }
    },
    methods: {
      buttonActions (type) {
        switch (type) {
          case 'right':
            this.materialSelect++
            break
          case 'left':
            this.materialSelect--
        }
      }
    },
    beforeCreate () {
      this.$store.dispatch('material/getAllBookSets')
    },
    components: {
      findWrap,
      findAblumCard
    },
    computed: {
      ...mapState({}),
      ...mapGetters(['materialList'])
    }
  }
</script>
