/**
 * Created by Tommy on 2018/4/3 .
 */
import axios from 'axios'
import { config, getDefaultParams } from './config'

let http = axios.create(config)
http.interceptors.request.use(async function (config) {
  if (Reflect.has(config.data || {}, 'cmd')) {
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
  return response.data
}, function (error) {
  /// For more errors handler of response go here,such as tip or console.
  return Promise.reject(error)
})
export default http
