import Vue from 'vue'
import Vuex from 'vuex'
import createStore from './store'
import {isObject} from 'lodash'
import VueFind from 'vue-find'
import vueFindHybrid from 'vue-find-hybrid'
import find from './scripts/find'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routers'
import 'normalize.css'
import './styles/iconfont/iconfont.css'
import './main.scss'
import './styles/button/button.scss'

Vue.use(vueFindHybrid)
Vue.use(VueRouter)
Vue.use(Vuex)
let vue = {}

/// In find client
let fp = window.fp
let isInFindClient = isObject(fp)
if (isInFindClient) {
  Vue.use(VueFind)
  const store = createStore()
  const router = new VueRouter({routes})
  vue = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: store,
    find: new VueFind(find)
  })
  store.dispatch('initialNativeStorage')
} else {
  console.log('%c请在Find客户端中打开', 'color:green')
}
export default vue
window.app.sendEvent = () => {
}
/**
 * @desc 实现Command+R 刷新
 * */
if (process.env.NODE_ENV !== 'production') {
  let pressingCommand = false
  document.addEventListener('keydown', (event) => {
    let key = event.key.toLowerCase()
    if (key === 'meta') {
      pressingCommand = true
      return
    }
    if (key === 'r' && pressingCommand) {
      window.location.reload()
    }
  }, false)
  document.addEventListener('keyup', (event) => {
    let key = event.key.toLowerCase()
    if (key === 'meta') {
      pressingCommand = false
    }
  }, false)
}
