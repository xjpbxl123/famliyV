import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import {isObject, isFunction} from 'lodash'
import VueFind from 'vue-find'
import find from './scripts/find'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routers'
import SDK from './scripts/findSDK/src/index'
import 'normalize.css'
import 'animation.css'
import './styles/iconfont/iconfont.css'
import './main.scss'
Vue.use(VueRouter)
Vue.use(Vuex)
const router = new VueRouter({ routes })
let vue = {}
/// In find client
let app = window.app
let isInFindClient = isObject(app) && isFunction(app.setup)
if (isInFindClient) {
  let sdk = new SDK()
  sdk.init().then(() => {
    Vue.use(VueFind)
    vue = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store: new Vuex.Store(store),
      find: new VueFind(find)
    })
  })
} else {
  console.log('%c请在Find客户端中打开', 'color:green')
}
export default vue
window.app.sendEvent = () => {
}
