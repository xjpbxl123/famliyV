import createLogger from 'vuex/dist/logger'
import http from '../scripts/http'
import index from './modules'
import {nativeStorage} from 'find-sdk'
const SET_STORAGE = 'SET_STORAGE' // 设置native data
const CREATE_SESSION = 'CREATE_SESSION' /// 创建会话id,用于生成二维码

export default {
  state: {
    storage: {
      playCalendar: {} // 练琴日期
    },
    sessionId: null
  },
  mutations: {
    [SET_STORAGE] (state, data) {
      state.storage = Object.assign({}, state.storage, data)
    },
    [CREATE_SESSION] (state, {body}) {
      state.sessionId = body.sessionId
    }
  },
  actions: {
    /**
     * @desc 将数据写入原生中
     * */
    setNativeStorage ({commit}, data) {
      return new Promise(resolve => {
        Object.keys(data).forEach(key => {
          nativeStorage.set(key, data[key]).then(() => {
            commit(SET_STORAGE, data)
            resolve(data)
          })
        })
      })
    },
    /**
     * @desc 创建会话id,用于生成二维码
     * */
    createSession ({commit}) {
      return http.post('', {
        cmd: 'shareingPiano.createSession'
      }).then(res => {
        commit(CREATE_SESSION, res)
      })
    }
  },
  modules: {
    // Import from modules folder, Visit https://vuex.vuejs.org/en/modules.html for more information.
    index
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
}
