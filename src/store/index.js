/**
 * Created by Moersing on 2018/4/3 .
 * */
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import http from '../scripts/http'
import index from './modules/index'
import login from './modules/login'
import home from './modules/home'
import popular from './modules/popular'
import famous from './modules/famous'
import scoreSetList from './modules/scoreSetList'
import scoreList from './modules/scoreList'
import material from './modules/material'
import { nativeStorage } from 'find-sdk'

const SET_STORAGE = 'SET_STORAGE' // 设置native data
const LOGIN_OUT_CACHE = 'login_out_cache'
const SET_SELECT = 'set_select'
const DEL_SELECT = 'del_select'
const SET_CACHE_STORAGE = 'SET_CACHE_STORAGE'
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
        cache: {
          renderCache: {
            famousAuthor: {},
            allArtists: {authors: []},
            hottest: {bookList: []},
            recentUpdate: {bookList: []},
            recentOpen: [],
            popularGenre: [],
            myCollect: [],
            yearList: [],
            scoreSetList: [],
            scoreList: [],
            differList: [{
              differC: ''
            }],
            materialList: {
              body: [], sumPage: 1
            }
          }
        } // 数据本地缓存
      },
      materialSelect: 0,
      popularGenreSelect: 0
    },
    getters: {
      /**
       * 首页热门曲谱
       * @param state
       * @returns {*}
       */
      hotBooks: state => {
        return state.storage.cache.renderCache.hottest
      },
      recentBooks: state => {
        return state.storage.cache.renderCache.recentUpdate
      },
      allArtists: state => {
        return state.storage.cache.renderCache.allArtists
      },
      recentOpenList: state => {
        return state.storage.cache.renderCache.recentOpen
      },
      collectList: state => {
        return state.storage.cache.renderCache.myCollect
      },
      differList: state => {
        return state.storage.cache.renderCache.differList
      },
      scoreSetList: state => {
        return state.storage.cache.renderCache.scoreSetList
      },
      scoreList: state => {
        return state.storage.cache.renderCache.scoreList
      },
      materialList: state => {
        return state.storage.cache.renderCache.materialList
      },
      popularGenre: state => {
        return state.storage.cache.renderCache.popularGenre
      },
      yearList: state => {
        return state.storage.cache.renderCache.yearList
      }
    },
    mutations: {
      [SET_STORAGE] (state, data) {
        state.storage = Object.assign({}, state.storage, data)
      },
      [LOGIN_OUT_CACHE] (state) {
        state.storage.cache.renderCache = state.storage.cache['-1']
      },
      [SET_SELECT] (state, data) {
        Object.assign(state, data)
      },
      [DEL_SELECT] (state, key) {
        // Reflect.deleteProperty(state, key)
        state[key] = 0
      },
      [SET_CACHE_STORAGE] (state, data) {
        let userId = state.storage.isLogin ? state.storage.userInfo.userId : '-1'
        let key = Object.keys(data)[0]
        let loginCache = state.storage.cache[userId] || {}
        loginCache[key] = data[key]
        state.storage.cache.renderCache[key] = data[key]
        state.storage.cache[userId] = loginCache
        nativeStorage.setDefault('cache', {value: JSON.stringify(state.storage.cache)})
      }
    },
    actions: {
      /**
       * @desc 初始化NativeStorage数据
       * */
      initialNativeStorage ({commit}) {
        return Promise.all([
          nativeStorage.getDefault('playCalendar'),
          nativeStorage.getDefault('isLogin'),
          nativeStorage.getDefault('userInfo'),
          nativeStorage.getDefault('sessionId'),
          nativeStorage.getDefault('cache')
        ])
          .then(data => {
            console.log(data, 'oooo')
            commit(SET_STORAGE, {
              playCalendar: data[0] ? JSON.parse(data[0].value) : {},
              isLogin: data[1] ? JSON.parse(data[1].value) : false,
              userInfo: data[2] ? JSON.parse(data[2].value) : {},
              sessionId: data[3] ? JSON.parse(data[3].value) : null,
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
            nativeStorage.setDefault(key, {value: JSON.stringify(value)}).then(() => {
              commit(SET_STORAGE, data)
              resolve(data)
            })
          }
        })
      },
      /**
       * @desc 根据用户分层缓存数据
       * @param {Function} dispatch
       * @param {Function} commit
       * @param {Object} state
       * @param {object} data
       */
      setUserCache ({dispatch, state}, data) {
        let userId = state.storage.isLogin ? state.storage.userInfo.userId : '-1'
        let loginCache = state.storage.cache[userId] || {}
        let cache = Object.assign({}, state.storage.cache)
        cache[userId] = {...loginCache, ...data}
        return dispatch('setCacheStorage', {cache})
      },
      /**
       * 多数据缓存
       * @param {Function} dispatch
       * @param {Object} state
       * @param {object} data
       */
      setCacheToStorage ({dispatch, state, commit}, data) {
        if (Reflect.has(data, 'id')) {
          let key = Object.keys(data)[0]
          let userId = state.storage.isLogin ? state.storage.userInfo.userId : '-1'
          let loginCache = Object.assign({}, state.storage.cache[userId] && (state.storage.cache[userId][key] || {}))
          let cache = {}
          loginCache[data.id] = data[key]
          cache[key] = loginCache
          commit(SET_CACHE_STORAGE, cache)
        } else {
          commit(SET_CACHE_STORAGE, data)
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
          if (header.code === 0) {
            clearInterval(window.interval)
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
      },
      /**
       * @desc 用户注销时的数据映射view
       * */
      logoutCache ({dispatch, commit}) {
        commit(LOGIN_OUT_CACHE)
      },
      setSelect ({commit, state}, data) {
        commit(SET_SELECT, data)
      },
      delSelect ({commit, state}, key) {
        return new Promise((resolve) => {
          if (!Reflect.has(state, key)) {
            console.error(`${key} is Can't find`)
          }
          commit(DEL_SELECT, key)
          resolve(key)
        })
      }
    },
    modules: {
      // Import from modules folder, Visit https://vuex.vuejs.org/en/modules.html for more information.
      index,
      login,
      home,
      famous,
      popular,
      scoreSetList,
      scoreList,
      material
    },
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
  })
}
