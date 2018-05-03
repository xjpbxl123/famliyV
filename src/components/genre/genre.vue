<template>
  <div>
    <findAblumCard :ablumArr="ablumArr"></findAblumCard>
  </div>
</template>

<script>
  import findAblumCard from 'components/common/find-ablum-card/find-ablum-card'

  export default {
    name: 'popular',
    data () {
      return {
        ablumArr: [require('images/bg_background2.png'), require('images/bg_background2.png'), require('images/bg_background2.png'), require('images/bg_background2.png'), require('images/bg_background2.png')]
      }
    },
    components: {
      findAblumCard
    }
  }
</script>
