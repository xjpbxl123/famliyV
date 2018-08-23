/**
 * Created by Tommy on 2018/5/23 .
 * */
import toast from './toast/toast.js'
export default {
  created () {
    this.instance.close && this.instance.close()
    this.instance = toast({text: '正在加载', icon: 'icon-loading', iconLoading: true, allExit: true})
  },
  destroyed () {
    this.instance.close && this.instance.close()
  }
}
