<template>
  <div>
    <findAlbum :a="ablumArr"></findAlbum>
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
  import { KEY108, KEY75 } from 'vue-find'
  import findAlbum from 'components/common/find-Album/find-Album'

  export default {
    name: 'home',
    data () {
      return {
        namespace: '',
        namespace1: '',
        ablumArr: ['https://r.findpiano.cn/%E7%BA%A6%E7%BF%B0%C2%B7%E6%B1%A4%E6%99%AE%E6%A3%AE%20%E7%AE%80%E6%98%93%E9%92%A2%E7%90%B4%E6%95%99%E7%A8%8B%20%E7%AC%AC%E4%B8%80%E5%86%8C/_1494925785000.png?imageView2/2/w/480/format/jpg&sign=484a00d2d6af0a622d1159a8143c6c9b&t=5aeaa94e', 'https://r.findpiano.cn/%E7%BA%A6%E7%BF%B0%C2%B7%E6%B1%A4%E6%99%AE%E6%A3%AE%20%E7%AE%80%E6%98%93%E9%92%A2%E7%90%B4%E6%95%99%E7%A8%8B%20%E7%AC%AC%E4%B8%80%E5%86%8C/_1494925785000.png?imageView2/2/w/480/format/jpg&sign=484a00d2d6af0a622d1159a8143c6c9b&t=5aeaa94e', 'https://r.findpiano.cn/%E7%BA%A6%E7%BF%B0%C2%B7%E6%B1%A4%E6%99%AE%E6%A3%AE%20%E7%AE%80%E6%98%93%E9%92%A2%E7%90%B4%E6%95%99%E7%A8%8B%20%E7%AC%AC%E4%B8%80%E5%86%8C/_1494925785000.png?imageView2/2/w/480/format/jpg&sign=484a00d2d6af0a622d1159a8143c6c9b&t=5aeaa94e']
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
    },
    components: {
      findAlbum
    }
  }
</script>
