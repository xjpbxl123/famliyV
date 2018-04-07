import Vue from 'vue'
import {isObject, isFunction} from 'lodash'
import Find, {KEY108, KEY70} from 'vue-find'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './main.scss'
import routes from './routers'
import http from './scripts/http'
import SDK from './scripts/find'
Vue.use(VueRouter)
Vue.use(VueResource)
http(Vue.http)
const router = new VueRouter({ routes })
let vue = {}
/// In find client
let app = window.app
let isInFindClient = isObject(app) && isFunction(app.setup)
if (isInFindClient) {
  let find = {}
  app.setup(() => {
    let sdk = new SDK()
    sdk.init()
    Vue.use(Find)
    find = new Find({
      globalKeyEvents: {
        [KEY108] (key) {
          alert(key)
        },
        [KEY70] (key) {
          alert(key)
        }
      }
    })
    vue = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      find
    })
  })
} else {
  vue = new Vue({
    el: '#app',
    render: h => h(App),
    router
  })
}
export default vue
window.app.sendEvent = () => {
}
