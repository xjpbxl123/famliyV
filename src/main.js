import 'normalize.css'
import './styles/iconfont/iconfont.css'
import './main.scss'
import './styles/button/button.scss'
import devtools from '@vue/devtools'
import Vue from 'vue'
import Vuex from 'vuex'
// import Vuetron from 'vuetron'
import createStore from './store'
import { isObject } from 'lodash'
import VueFind from 'vue-find'
import vueFindHybrid from 'vue-find-hybrid'
import find from './scripts/find'
import VueRouter from 'vue-router'
import routes from './routers'
import App from './App.vue'
// Vue.use(Vuetron.VuetronVue)
if (process.env.NODE_ENV === 'development') {
  devtools.connect('http://localhost', 9999)
}

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
  store.dispatch('initialNativeStorage').then(() => {
    vue = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store: store,
      find: new VueFind(find)
    })
  })
} else {
  console.log('%c请在Find客户端中打开', 'color:green')
}

export default vue
