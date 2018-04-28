<template>
  <div>
    <famous-swiper :famousList="allArtists.authors" :select="select" :defaultLeft="defaultLeft"/>
    <find-title title="名师课程"></find-title>
    <div class="bottom">
      <find-button v-for="button in famousButton"
                   :className="button.className"
                   :iconClass="button.icon"
                   :action="action.bind(this,button.className)"
                   :key="button.icon"/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import findButton from '../common/find-button/find-button'
  import famousSwiper from './famous-swiper'
  import findTitle from 'components/common/find-title/find-title'

  export default {
    name: 'famous',
    data () {
      return {
        famousList: [1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2],
        select: 0,
        famousButton: [
          {
            icon: 'icon-left',
            className: ['left', 'key-78']
          },
          {
            icon: 'icon-right',
            className: ['right', 'key-80']
          },
          {
            icon: 'icon-ok',
            className: ['ok', 'key-82']
          }
        ],
        defaultLeft: 1293
      }
    },
    beforeCreate () {
      this.$store.dispatch({type: 'famous/getAllArtistsToFamily'})
    },
    computed: {
      ...mapState({}),
      ...mapGetters(['allArtists'])
    },
    methods: {
      action (type) {
        switch (type[0]) {
          case 'left':
            let selectd = this.select - 1
            this.select = selectd < 0 ? 0 : selectd
            break
          case 'right':
            let sele = this.select + 1
            this.select = sele >= this.famousList.length - 1 ? this.famousList.length : sele
            break
        }
      }
    },
    components: {
      findButton,
      famousSwiper,
      findTitle
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .famous {
    height: 100%;
    white-space: nowrap;
  }

</style>
