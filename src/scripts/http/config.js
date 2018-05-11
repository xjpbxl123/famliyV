/**
 * Created by Moersing on 2018/4/3 .
 * */
import { device, nativeStorage } from 'find-sdk'

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
      sess: '',
      seq: 0,
      code: 0,
      desc: '',
      stmp: Date.now(),
      ext: ''
    }
    /**
     * @desc Get session ID and merge to default params
     * */
    const mergeSessionId = () => {
      if (!defaultParams.sess) {
        return nativeStorage.getDefault('sessionId').then((data) => {
          return Object.assign(defaultParams, {sess: data ? data.value : ''}, {orn})
        })
      }
      return Object.assign(defaultParams, {orn})
    }
    /// orn is about device information,it's required.
    if (orn) {
      return mergeSessionId()
    }
    return device.getOrn().then(result => {
      /// only get once
      orn = result
    }).then(mergeSessionId)
  }
})()
export const config = {
  baseURL,
  timeout: 3000 // request timeout
}
