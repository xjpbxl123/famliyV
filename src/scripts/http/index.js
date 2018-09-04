/**
 * Created by Tommy on 2018/4/3 .
 */
import vue from 'vue'
import axios from 'axios'
import { config, getDefaultParams } from './config'
import {isPlainObject} from 'lodash'
import {getCurEnvs} from '../utils'
import {nativeStorage} from 'find-sdk'
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
      let code = response.data.header.code
      if (code !== 0 && code !== 5) {
        // 数据错误 返回
        return Promise.reject(response.data.header)
      } else if (code === 5) {
        // session失效
        return getCurEnvs().then(env => {
          let tableName = 'findFamily-' + env.HTTP_ROOT
          return nativeStorage.get(tableName, 'isLogin').then((isLogin) => {
            if (code === 5 && isLogin.value) {
              // 执行注销操作
              let store = vue.prototype.$store
              return store.dispatch('logout', {root: true}).then(() => {
                return store.dispatch('setSession')
              })
            } else {
              return response.data
            }
          })
        })
      } else {
        return response.data
      }
    }
  }
}, function (error) {
  /// For more errors handler of response go here,such as tip or console.
  return Promise.reject(error)
})
export default http
