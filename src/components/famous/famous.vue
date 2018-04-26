<template>
  <div>
    <famous-swiper :famousList="famousList" :select="select" :defaultLeft="defaultLeft"></famous-swiper>
    <div class="bottom">
      <find-button v-for="button in famousButton"
                   :className="button.className"
                   :iconClass="button.icon"
                   :action="action.bind(this,button.className)"
                   :key="button.icon"></find-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import findButton from '../common/find-button/find-button'
  import famousSwiper from './famous-swiper'

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
    computed: mapState({}),
    methods: {
      action (type) {
        switch (type[0]) {
          case 'left':
            let selectd = this.select - 1
            this.select = selectd < 0 ? 0 : selectd
            break
          case 'right':
            let sele = this.select + 1
            this.select = sele >= this.famousList.length - 1 ? this.famousList.length - 1 : sele
            break
        }
      }
    },
    components: {
      findButton,
      famousSwiper
    }
  }
</script>

<style lang="scss" scoped type=text/scss>
  .famous {
    height: 100%;
    white-space: nowrap;
  }

</style>
