<template>
  <div>
    <button @click="click">Action</button>
    <div v-text="text"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  let count = 1
  export default {
    name: 'home',
    data () {
      return {}
    },
    computed: mapState({
      text (state) {
        return state.home.demoText
      }
    }),
    methods: {
      click () {
        this.$store.dispatch('home/demo', {
          text: `clicked:${count++}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    font-size: 30px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  button {
    font-size: 40px;
    background: transparent;
    border-radius: 10px;
    border: none;
  }
</style>
