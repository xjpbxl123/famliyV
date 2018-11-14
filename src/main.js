import 'normalize.css'
import './styles/iconfont/iconfont.css'
import './main.scss'
import './styles/button/button.scss'
import devtools from '@vue/devtools'
import Vue from 'vue'
import Vuex from 'vuex'
import createStore from './store'
import { isObject } from 'lodash'
import VueFind from 'vue-find'
import vueFindHybrid from 'vue-find-hybrid'
import find from './scripts/find'
import VueRouter from 'vue-router'
import routes from './routers'
import App from './App.vue'
import './components/common/volume.js'
const isDev = process.env.NODE_ENV === 'development'
const devEnvVars = process.env['development']
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
  /** 临时优化方案,先让页面先初始化,再初始化缓存，最后进入路由 */
  router.beforeEach((to, from, next) => {
    if (!store.state.isSynced) {
      store.dispatch('initEnv').then(() => {
        store.dispatch('initialNativeStorage').then(() => {
          store.dispatch('clearCache', true).then(() => {
            // 自动检查是否需要清缓存数据
            next()
          })
        })
      })
    } else {
      next()
    }
  })
  Vue.prototype.$store = store
  vue = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: store,
    find: new VueFind(find)
  })
} else {
  console.log('%c请在Find客户端中打开', 'color:green')
}
/// Use vue-devtools
if (isDev && devEnvVars.VUE_DEV_TOOLS) {
  devtools.connect(devEnvVars.VUE_DEV_TOOLS_HOST || process.env.VUE_DEV_TOOLS_HOST, devEnvVars.VUE_DEV_TOOLS_PORT)
}
export default vue
