/**
 * Created by Tommy on 2018/5/23 .
 * */
import { modules } from 'find-sdk'
import {getCurEnvs} from 'scripts/utils'
export default {
  data () {
    return {
      timer: null,
      time1: 0
    }
  },
  methods: {
    showToast (data) {
      modules.nativeRouter.back()
      getCurEnvs().then(env => {
        let weexUrl = env.WEEX_URL
        console.log('打开toast页面')
        modules.page.openWeexViewController(`${weexUrl}components/toast/toast.js`, data).then(res => {
          console.log(res)
        })
      })
      this.timer = setTimeout(() => {
        modules.nativeRouter.back()
      }, 500)
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
}
