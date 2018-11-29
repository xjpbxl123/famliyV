/**
 * Created by Tommy on 2018/5/23 .
 * */
export default {
  data () {
    return {
      timer: null,
      time1: 0
    }
  },
  methods: {
  },
  mounted () {
    let hash = window.location.hash.slice(1)
    if (hash !== this.$route.path) {
      window.location.reload()
      console.log('处理vue-router路由跳转了但是页面没更新的问题')
    }
  }
}
