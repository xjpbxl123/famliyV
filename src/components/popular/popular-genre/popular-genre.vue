<template>
  <div>
    <findAblumCard :ablumArr="ablumArr"></findAblumCard>
  </div>
</template>
<style lang=scss type=text/scss scoped></style>
<script>
  import findAblumCard from 'components/common/find-ablum-card/find-ablum-card'

  export default {
    name: 'popular',
    data () {
      return {
        ablumArr: [require('images/bg_background2.png'), require('images/bg_background2.png'), require('images/bg_background2.png')]
      }
    },
    components: {
      findAblumCard
    }
  }
</script>
