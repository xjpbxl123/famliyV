<template>
  <div>
    <find-cover :activeNamespace="namespace">
      <div>
        demo
      </div>
    </find-cover>
    <find-cover :activeNamespace="namespace1">
      <div>
        demo1
      </div>
    </find-cover>
    <button @click="changeNamespace">changeNamespace</button>
  </div>
</template>

<script>
  import {KEY108, KEY75} from 'vue-find'
  export default {
    name: 'home',
    data () {
      return {
        namespace: '',
        namespace1: ''
      }
    },
    find: {
      [KEY108] () {
        console.log('Trigger in global')
      },
      demo: {
        [KEY108] () {
          console.log('Trigger in demo namespace')
        },
        [KEY75] () {
          console.log('Trigger in demo namespace')
        }
      },
      demo1: {
        [KEY108] () {
          console.log('Trigger in demo1 namespace')
        }
      }
    },
    methods: {
      changeNamespace () {
        this.namespace = 'demo'
        this.namespace1 = 'demo1'
      }
    }
  }
</script>
