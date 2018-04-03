import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './main.scss'
import routes from 'javascripts/routers'
import http from 'javascripts/http'
import Find from 'javascripts/apis/index'

Find.init()
Vue.use(VueRouter)
Vue.use(VueResource)
http(Vue.http)
const router = new VueRouter({routes})
export default new Vue({
  el: '#app',
  render: h => h(App),
  router
})
console.log('demo')
