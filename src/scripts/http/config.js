import {getDeviceInfo} from 'find-sdk'
import store from '../../store'
let baseURL = process.env[process.env.NODE_ENV].HTTP_ROOT
/**
 *@desc Get default params
 * */
export const getDefaultParams = (() => {
  let orn = ''
  return () => {
    let defaultParams = {
      size: 0,
      dst: '',
      type: 2,
      ver: 512,
      lang: 'zh_cn',
      sess: store.state.storage.sessionId || '',
      seq: 0,
      code: 0,
      desc: '',
      stmp: Date.now(),
      ext: ''
    }
    if (orn) {
      return Promise.resolve(Object.assign(defaultParams, {orn}))
    }
    return getDeviceInfo().then(result => {
      /// only get once
      orn = result
      return Object.assign(defaultParams, {orn})
    })
  }
})()
export const config = {
  baseURL,
  timeout: 3000 // request timeout
}
