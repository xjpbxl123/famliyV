/**
 * Created by Moersing on 2018/4/3 .
 * */
import { device } from 'find-sdk'
import {getCurEnvs} from '../utils'
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
        return getCurEnvs().then(env => {
          let tableName = 'findFamily-' + env.HTTP_ROOT
          let data = JSON.parse(localStorage.getItem(tableName + 'sessionId'))
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
  timeout: 10000// request timeout
}
