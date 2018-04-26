<template>
  <div>

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
  import findButton from '../../common/find-button/find-button'

  export default {
    name: 'famous-book',
    data () {
      return {
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
        select: 0
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
      findButton
    }
  }
</script>

<style lang="scss" scoped type=text/scss>

</style>
