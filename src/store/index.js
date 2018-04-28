/**
 * Created by Moersing on 2018/4/3 .
 * */
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import http from '../scripts/http'
import index from './modules/index'
import login from './modules/login'
import home from './modules/home'
import famous from './modules/famous'
import { nativeStorage } from 'find-sdk'

const SET_STORAGE = 'SET_STORAGE' // 设置native data
export default function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      storage: {
        isSynced: false, // 数据是否同步完成,注意: 所有涉及到nativeStorage的操作,都应该基于这个标志来判断是否完成
        playCalendar: {}, // 练琴日期
        userInfo: {}, // 用户信息
        isLogin: false,
        sessionId: null, // 创建会话id,用于生成二维码或者登录之后获取用户信息
        cache: {} // 数据本地缓存
      }
    },
    getters: {
      /**
       * 首页热门曲谱
       * @param state
       * @returns {*}
       */
      hotBooks: state => {
        let userId = state.storage.userInfo.userId || '-1'
        return state.storage.cache[userId] && state.storage.cache[userId].hottest
      },
      allArtists: state => {
        let userId = state.storage.userInfo.userId || '-1'
        return state.storage.cache[userId] && state.storage.cache[userId].allArtists
      },
      famousAuthor: state => {
        let userId = state.storage.userInfo.userId || '-1'
        return state.storage.cache[userId] && state.storage.cache[userId].famousAuthor
      }

    },
    mutations: {
      [SET_STORAGE] (state, data) {
        state.storage = Object.assign({}, state.storage, data)
      }
    },
    actions: {
      /**
       * @desc 初始化NativeStorage数据
       * */
      initialNativeStorage ({commit, state}) {
        return Promise.all([
          nativeStorage.get('playCalendar'),
          nativeStorage.get('isLogin'),
          nativeStorage.get('userInfo'),
          nativeStorage.get('sessionId'),
          nativeStorage.get('cache')
        ])
          .then(data => {
            console.log(data, 'oooo')
            commit(SET_STORAGE, {
              playCalendar: data[0].value,
              isLogin: data[1].value,
              userInfo: data[2].value,
              sessionId: data[3].value,
              cache: Object.assign({}, state.storage.cache, data[4].value),
              isSynced: true
            })
          })
      },
      /**
       * @desc 将数据写入原生中
       * */
      setNativeStorage ({commit}, data) {
        return new Promise(resolve => {
          for (let [key, value] of Object.entries(data)) {
            nativeStorage.set(key, value).then(() => {
              commit(SET_STORAGE, data)
              resolve(data)
            })
          }
        })
      },
      /**
       * @desc 将需要缓存的数据写入原生中
       * @param {Function} dispatch
       * @param {Function} commit
       * @param {Object} state
       * @param {object} data
       */
      setCacheToStorage ({dispatch, commit, state}, data) {
        if (state.storage.isLogin) {
          let userId = state.storage.userInfo.userId || '-1'
          let loginCache = state.storage.cache[userId] || {}
          let cache = {}
          cache[userId] = {...loginCache, ...data}
          return dispatch('setNativeStorage', {cache})
        } else {
          return dispatch('setNativeStorage', {logOutCache: {...state.storage.cache.logOutCache, ...data}})
        }
      },
      /**
       * @desc 创建会话id,用于生成二维码或者登录之后获取用户信息
       * @param {Function} dispatch
       * @param {Function} commit
       * @param {String} sessionId - sessionId 如果传入,则表示登录
       * */
      setSession ({dispatch, commit}, sessionId) {
        if (!sessionId) {
          return http.post('', {
            cmd: 'shareingPiano.createSession'
          }).then(res => {
            return dispatch('setNativeStorage', {sessionId: res.body.sessionId})
          })
        }
        return new Promise((resolve) => {
          let result = dispatch('setNativeStorage', {sessionId, isLogin: true})
          resolve(result)
        })
      },
      /**
       * @desc 获取用户信息
       * */
      getUserInfo ({dispatch}) {
        let root = process.env.production.HTTP_ROOT
        return http.post(root, {
          cmd: 'account.getInfo'
        }).then(({body, header}) => {
          if (!header.code) {
            return dispatch('setNativeStorage', {userInfo: body, isLogin: true})
          }
          return dispatch('setNativeStorage', {userInfo: {}, isLogin: false})
        })
      },
      /**
       * @desc 用户注销
       * */
      logout ({dispatch}) {
        return dispatch('setNativeStorage', {userInfo: {}, isLogin: false})
      }
    },
    modules: {
      // Import from modules folder, Visit https://vuex.vuejs.org/en/modules.html for more information.
      index,
      login,
      home,
      famous
    },
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
  })
}
