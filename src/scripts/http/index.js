/**
 * Created by Tommy on 2018/4/3 .
 */
import vue from 'vue'
import axios from 'axios'
import { config, getDefaultParams } from './config'
import {isPlainObject} from 'lodash'
import {getCurEnvs} from '../utils'
let http = axios.create(config)
http.interceptors.request.use(async function (config) {
  const curEnv = await getCurEnvs()
  config.baseURL = curEnv.HTTP_ROOT
  if (isPlainObject(config.data) && config.data.cmd) {
    let defaultParams = await getDefaultParams()
    let header = {...defaultParams, ...{cmd: config.data.cmd}}
    Reflect.deleteProperty(config.data, 'cmd')
    config.data = JSON.stringify({header, body: config.data})
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
http.interceptors.response.use(function (response) {
  if (response.data) {
    if (response.data.header) {
      getCurEnvs().then(env => {
        let tableName = 'findFamily-' + env.HTTP_ROOT
        let isLogin = JSON.parse(localStorage.getItem(tableName + 'isLogin'))
        if (response.data.header.code === 5 && isLogin.value) {
          // 执行注销操作
          let store = vue.prototype.$store
          store.dispatch('logout', {root: true}).then(() => {
            store.dispatch('setSession')
          })
        }
      })
    }
  }
  return response.data
}, function (error) {
  /// For more errors handler of response go here,such as tip or console.
  return Promise.reject(error)
})
export default http
