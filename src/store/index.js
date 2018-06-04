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
import staff from './modules/staff'
import myScore from './modules/myScore'
import softwareUpdate from './modules/softwareUpdate'
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
            recentOpenList: [],
            popularGenre: [],
            collectList: [],
            yearList: [],
            scoreSetList: [],
            scoreList: [],
            differList: [{
              differC: ''
            }],
            materialList: {
              body: [], sumPage: 1
            },
            localCollect: [],
            localRecent: [],
            famousPlayCoursesBySet: [],
            bookInfo: []
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
        return state.storage.cache.renderCache.recentOpenList
      },
      collectList: state => {
        return state.storage.cache.renderCache.collectList
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
      },
      localCollect: state => {
        return state.storage.cache.renderCache.localCollect
      },
      localRecent: state => {
        return state.storage.cache.renderCache.localRecent
      },
      bookInfo: state => {
        return state.storage.cache.renderCache.bookInfo
      }
    },
    mutations: {
      [SET_STORAGE] (state, data) {
        state.storage = Object.assign({}, state.storage, data)
      },
      [LOGIN_OUT_CACHE] (state, data) {
        state.storage.cache.renderCache = data
      },
      [SET_SELECT] (state, data) {
        Object.assign(state, data)
      },
      [DEL_SELECT] (state, key) {
        state[key] = 0
      },
      [SET_CACHE_STORAGE] (state, data) {
        let userId = state.storage.isLogin && state.storage.userInfo.userId ? state.storage.userInfo.userId : -1
        for (let [key, value] of Object.entries(data)) {
          state.storage.cache.renderCache[key] = value
        }
        return nativeStorage.setDefault(JSON.stringify(userId), {value: JSON.stringify(state.storage.cache.renderCache)})
      }
    },
    actions: {
      /**
       * @desc 初始化NativeStorage数据
       * */
      initialNativeStorage ({commit, dispatch}) {
        return Promise.all([
          nativeStorage.getDefault('playCalendar'),
          nativeStorage.getDefault('isLogin'),
          nativeStorage.getDefault('userInfo'),
          nativeStorage.getDefault('sessionId')
        ])
          .then(data => {
            commit(SET_STORAGE, {
              playCalendar: data[0] && data[0].value ? data[0].value : {},
              isLogin: data[1] && data[1].value ? data[1].value : false,
              userInfo: data[2] && data[2].value ? data[2].value : {},
              sessionId: data[3] && data[3].value ? data[3].value : null,
              isSynced: true
            })
            return dispatch('initCacheStorage', data)
          })
      },
      /**
       * @desc 将数据写入原生中
       * */
      setNativeStorage ({commit}, data) {
        return new Promise(resolve => {
          for (let [key, value] of Object.entries(data)) {
            nativeStorage.setDefault(key, {value}).then(() => {
              commit(SET_STORAGE, data)
              resolve(data)
            })
          }
        })
      },
      /**
       * @desc 初始化缓存数据
       * @param dispatch
       * @param state
       * @param commit
       * @param data
       */
      initCacheStorage ({dispatch, state, commit}, data) {
        return new Promise(resolve => {
          let userId = data[2] && data[2].value && data[2].value.userId ? data[2].value.userId : -1
          nativeStorage.getDefault(JSON.stringify(userId)).then(param => {
            let cache = {}
            cache['renderCache'] = param && param.value ? (typeof param.value === 'string' ? JSON.parse(param.value) : param.value) : state.storage.cache.renderCache
            commit(SET_STORAGE, {
              cache
            })
            resolve(cache)
          })
        })
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
          let loginCache = Object.assign({}, state.storage.cache.renderCache[key] || {})
          let cache = {}
          loginCache[data.id] = data[key]
          cache[key] = loginCache
          commit(SET_CACHE_STORAGE, cache)
          return Promise.resolve(cache)
        } else {
          commit(SET_CACHE_STORAGE, data)
          return Promise.resolve(data)
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
        // let root = process.env.production.HTTP_ROOT
        return http.post('', {
          cmd: 'account.getInfo'
        }).then(({body, header}) => {
          if (header.code === 0) {
            clearInterval(window.interval)
            for (let value of Object.keys(body)) {
              if (Object.prototype.toString.call(body[value]) === '[object Null]') {
                body[value] = ''
              }
            }
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
      logoutCache ({dispatch, commit, state}) {
        nativeStorage.getDefault('-1').then(param => {
          let data = param && param.value ? (typeof param.value === 'string' ? JSON.parse(param.value) : param.value) : state.storage.cache.renderCache
          commit(LOGIN_OUT_CACHE, data)
        })
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
      material,
      staff,
      myScore,
      softwareUpdate
    },
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
  })
}
