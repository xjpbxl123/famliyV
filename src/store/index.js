/**
 * Created by Moersing on 2018/4/3 .
 * */
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import http from '../scripts/http'
import index from './modules/index'
import login from './modules/login'
import {nativeStorage} from 'find-sdk'

const SET_STORAGE = 'SET_STORAGE' // 设置native data
export default function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      storage: {
        isSynced: false, // 数据是否同步完成,注意: 所有涉及到nativeStorage的操作,都应该基于这个标志来判断是否完成
        playCalendar: {}, // 练琴日期
        userInfo: null, // 用户信息
        isLogin: false,
        sessionId: null // 创建会话id,用于生成二维码或者登录之后获取用户信息
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
      initialNativeStorage ({commit}) {
        return Promise.all([
          nativeStorage.get('playCalendar'),
          nativeStorage.get('isLogin'),
          nativeStorage.get('userInfo'),
          nativeStorage.get('sessionId')
        ])
          .then(data => {
            commit(SET_STORAGE, {
              playCalendar: data[0].value,
              isLogin: data[1].value,
              userInfo: data[2].value,
              sessionId: data[3].value,
              isSynced: true
            })
          })
      },
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
        return http.post('', {
          cmd: 'account.getInfo'
        }).then(({body, header}) => {
          if (!header.code) {
            return dispatch('setNativeStorage', {userInfo: body})
          }
          return dispatch('setNativeStorage', {userInfo: {}, sessionId: null, isLogin: false})
        })
      }
    },
    modules: {
      // Import from modules folder, Visit https://vuex.vuejs.org/en/modules.html for more information.
      index,
      login
    },
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
  })
}
