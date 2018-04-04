<template>
  <div>
    <span>pianoKey demo</span>
  </div>
</template>
<style lang="scss" scoped>
span {
  color: red;
  font-size: 1.5rem;
}
</style>
<script type="text/javascript">
  import _ from 'lodash'
  import Find from '../../apis/index'
  import { KEY80 } from '../../scripts/find/pianokeys'
  export default {
    data () {
      return {}
    },
    methods: {
      [KEY80] (key) {
        alert(key)
      }
    },
    components: {},
    created () {
      Find.$on('pianoClick', key => {
        if (_.isFunction(this[key])) {
          return this[key](key)
        }
      })
    }
  }
</script>
