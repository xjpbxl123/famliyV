import createLogger from 'vuex/dist/logger'
import http from '../scripts/http'
import {nativeStorage} from 'find-sdk'
const SET_STORAGE = 'SET_STORAGE' // 设置native data
const CREATE_SESSION = 'CREATE_SESSION' /// 创建会话id,用于生成二维码
const RECENT_BOOKS = 'RECENT_BOOKS' /// 最近更新
const HOT_BOOKS = 'HOT_BOOKS' /// 最近更新
export default {
  state: {
    storage: {
      playCalendar: {} // 练琴日期
    },
    sessionId: null,
    recentBooks: {},
    hotBooks: {}
  },
  mutations: {
    [SET_STORAGE] (state, data) {
      state.storage = Object.assign({}, state.storage, data)
    },
    [CREATE_SESSION] (state, {body}) {
      state.sessionId = body.sessionId
    },
    [RECENT_BOOKS] (state, recentBooks) {
      state.recentBooks = recentBooks
    },
    [HOT_BOOKS] (state, hotBooks) {
      state.hotBooks = hotBooks
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
    },
    /**
     * @desc 获取最近更新
     * */
    getRecentBooks ({commit}, {tagId = 1, page = {'offset': 0, 'count': 7}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getRecentBooks',
        tagId,
        page
      }).then(res => {
        commit(RECENT_BOOKS, res.body)
      })
    },
    /**
     * @desc 获取热门更新
     * */
    getHotBooks ({commit}, {tagId = 1, page = {'offset': 0, 'count': 5}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getHottestBooks',
        tagId,
        page
      }).then(res => {
        commit(HOT_BOOKS, res.body)
      })
    }
  },
  modules: {
    // Import from modules folder, Visit https://vuex.vuejs.org/en/modules.html for more information.
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
}
