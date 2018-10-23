/**
 * Created by Moersing on 2018/4/3 .
 * */
import Vuex from 'vuex'
import axios from 'axios'
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
import {modules, nativeStorage} from 'find-sdk'
import {getCurEnvs} from '../scripts/utils'
const SET_STORAGE = 'SET_STORAGE' // 设置native data
const INIT_ENV = 'INIT_ENV' // 初始化环境变量
const LOGIN_OUT_CACHE = 'login_out_cache'
const SET_SELECT = 'set_select'
const DEL_SELECT = 'del_select'
const SET_CACHE_STORAGE = 'SET_CACHE_STORAGE'
const CLEAR_CACHE = 'CLEAR_CACHE'
const SETCACHEFROMTABLE = 'SETCACHEFROMTABLE'
let initData = {
  famousAuthor: {},
  allArtists: {authors: []},
  recentOpenList: [],
  popularGenre: [],
  hotBooksAll: {bookList: []},
  recentBooksAll: {bookList: []},
  collectList: [],
  yearList: [],
  scoreSetList: [],
  scoreList: [],
  musicList: [],
  differList: [],
  materialList: {
    body: [], sumPage: 1
  },
  famousPlayCoursesBySet: {sum: 0, courseList: []},
  bookInfo: [],
  musicInfo: [],
  partnerVersion: {},
  localPartnerVersion: {},
  isUpanInsert: false
}
export default function createStore () {
  return new Vuex.Store({
    // strict: process.env.NODE_ENV === 'development',
    state: {
      environments: {},
      tableDataArr: [],
      storage: {
        isSynced: false, // 数据是否同步完成,注意: 所有涉及到nativeStorage的操作,都应该基于这个标志来判断是否完成
        playCalendar: {}, // 练琴日期
        userInfo: {}, // 用户信息
        isLogin: false,
        sessionId: null, // 创建会话id,用于生成二维码或者登录之后获取用户信息
        pianoInfo: {orn: 'family', pic: ''}, // 钢琴orn/logo
        pianoType: '', // 钢琴类型
        localCollect: [], // 本地收藏列表
        localRecent: [], //   本地最近打开列表
        clearTime1: '',
        cache: {
          renderCache: {
            famousAuthor: {},
            allArtists: {authors: []},
            recentOpenList: [],
            popularGenre: [],
            hotBooksAll: {bookList: []},
            recentBooksAll: {bookList: []},
            collectList: [],
            yearList: [],
            scoreSetList: [],
            scoreList: [],
            musicList: [],
            differList: [],
            materialList: {
              body: [], sumPage: 1
            },
            famousPlayCoursesBySet: {sum: 0, courseList: []},
            bookInfo: [],
            musicInfo: [],
            partnerVersion: {},
            localPartnerVersion: {},
            isUpanInsert: false
          }
        } //   数据本地缓存
      },
      materialSelect: 0,
      popularGenreSelect: 0
    },
    getters: {
      /**
       *
       * @param state
       * @returns {*}
       */
      hotBooksAll: state => {
        return state.storage.cache.renderCache.hotBooksAll
      },
      recentBooksAll: state => {
        return state.storage.cache.renderCache.recentBooksAll
      },
      allArtists: state => {
        return state.storage.cache.renderCache.allArtists
      },
      famousAuthor: state => {
        return state.storage.cache.renderCache.famousAuthor
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
      musicList: state => {
        return state.storage.cache.renderCache.musicList
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
      bookInfo: state => {
        return state.storage.cache.renderCache.bookInfo
      },
      musicInfo: state => {
        return state.storage.cache.renderCache.musicInfo
      },
      isUpanInsert: state => {
        return state.storage.cache.renderCache.isUpanInsert
      },
      partnerVersion: state => {
        return state.storage.cache.renderCache.partnerVersion
      },
      localPartnerVersion: state => {
        return state.storage.cache.renderCache.localPartnerVersion
      }
    },
    mutations: {
      [INIT_ENV] (state, env) {
        state.environments = env
      },
      [SET_STORAGE] (state, data) {
        state.storage = Object.assign({}, state.storage, data)
      },
      [CLEAR_CACHE] (state) {
        state.storage.cache.renderCache = initData
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
        let root = state.environments.HTTP_ROOT + 'apiStorage'
        let userId = state.storage.isLogin && state.storage.userInfo.userId ? state.storage.userInfo.userId : -1
        for (let [key, value] of Object.entries(data)) {
          state.storage.cache.renderCache[key] = value
          return nativeStorage.set('findFamily-' + root, String(userId) + '-' + key, value).then((data) => {
          })
        }
      },
      [SETCACHEFROMTABLE] (state, data) {
        for (let [key, value] of Object.entries(data)) {
          state.storage.cache.renderCache[key] = value
        }
      }
    },
    actions: {
      /**
       * @desc 初始化NativeStorage数据
       * */
      initialNativeStorage ({commit, dispatch}) {
        return getCurEnvs().then(env => {
          let tableName = 'findFamily-' + env.HTTP_ROOT
          /// 所有缓存数据的key和默认值
          return Promise.all([
            nativeStorage.get(tableName, 'playCalendar'),
            nativeStorage.get(tableName, 'isLogin'),
            nativeStorage.get(tableName, 'userInfo'),
            nativeStorage.get(tableName, 'sessionId'),
            nativeStorage.get(tableName, 'pianoInfo'),
            nativeStorage.get(tableName, 'pianoType'),
            nativeStorage.get(tableName, 'localCollect'),
            nativeStorage.get(tableName, 'localRecent'),
            nativeStorage.get(tableName, 'clearTime1')
          ])
            .then(data => {
              return commit(SET_STORAGE, {
                playCalendar: data[0] && data[0].value ? data[0].value : {},
                isLogin: data[1] && data[1].value ? data[1].value : false,
                userInfo: data[2] && data[2].value ? data[2].value : {},
                sessionId: data[3] && data[3].value ? data[3].value : null,
                pianoInfo: data[4] && data[4].value ? data[4].value : {orn: 'family', pic: require('../components/index/images/find-logo.png')},
                pianoType: data[5] && data[5].value ? data[5].value : '',
                isSynced: true,
                localCollect: data[6] && data[6].value ? data[6].value : [],
                localRecent: data[7] && data[7].value ? data[7].value : [],
                clearTime1: data[8] && data[8].value ? data[8].value : ''
              })
              // return dispatch('initCacheStorage', [...data, ...[tableName]])
            })
        })
      },
      /**
       * @desc 请求前从表中初始化数据
       * */
      setCacheFromTable ({commit, state}, dataName) {
        let flag = false
        state.tableDataArr.map((value) => {
          if (value === dataName) {
            // 本次初始化已经从表中拿过数据
            flag = true
          }
        })
        if (flag) {
          console.log(dataName, '本次初始化已经从表中拿过数据')
          return
        }
        state.tableDataArr.push(dataName)
        let root = state.environments.HTTP_ROOT + 'apiStorage'
        let userId = state.storage.isLogin && state.storage.userInfo.userId ? state.storage.userInfo.userId : -1
        return nativeStorage.get('findFamily-' + root, String(userId) + '-' + dataName).then((data) => {
          if (data) {
            let commitData = {}
            commitData[dataName] = data
            commit(SETCACHEFROMTABLE, commitData)
          }
        })
      },
      /**
       * @desc 获取当前环境变量,如果是开发环境,则永远是开发环境,不会跟着App的环境切换,如果打包之后,则当前环境变量会跟着当前APP切换
       * */
      initEnv ({commit}) {
        return getCurEnvs().then(data => {
          commit(INIT_ENV, data)
        })
      },
      /**
       * @desc 将数据写入原生中
       * */
      setNativeStorage ({commit, state}, data) {
        let root = state.environments.HTTP_ROOT
        return new Promise(resolve => {
          for (let [key, value] of Object.entries(data)) {
            nativeStorage.set('findFamily-' + root, key, {value}).then(() => {
              commit(SET_STORAGE, data)
              resolve(data)
            })
            commit(SET_STORAGE, data)
          }
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
            return dispatch('setNativeStorage', {sessionId: res.body.sessionId, isLogin: false})
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
      getUserInfo ({dispatch, state}) {
        // let root = process.env.production.HTTP_ROOT
        return http.post('', {
          cmd: 'account.getInfo'
        }).then(({body, header}) => {
          if (header.code === 0) {
            for (let value of Object.keys(body)) {
              if (Object.prototype.toString.call(body[value]) === '[object Null]') {
                body[value] = ''
              }
            }
            // 通知原生登陆了
            // session userType userId mark userName
            let userInfoObj = {
              session: state.storage.sessionId,
              userType: body.userType,
              mark: body.mark,
              userId: parseInt(body.userId),
              userName: body.userName,
              nickName: body.nickName,
              imageUrl: body.imageUrl
            }
            return modules.user.setUserInfo(userInfoObj).then((data) => {
              if (data) {
                // 原生设置成功
                return dispatch('setNativeStorage', {userInfo: body, isLogin: true})
              }
            })
          }
          return {userInfo: body, isLogin: false}
        })
      },
      /**
        * @desc 获取钢琴orn/logo
        * */
      getPianoInfo ({dispatch, state}) {
        return modules.device.getMacSerialNumber().then((data) => {
          if (data) {
            let content = {
              header: {
                seq: 0,
                sess: '',
                desc: '',
                code: 0,
                dst: '',
                orn: '',
                ext: '',
                lang: 'zh_cn',
                size: 0,
                ver: 512,
                cmd: 'familyClient.getPianoInfo',
                type: 2,
                stmp: Date.now()
              },
              body: {
                macSn: data
              }
            }
            return axios.post(state.environments.HTTP_ROOT, JSON.stringify(content)).then(res => {
              // orn: "family"
              // pic: "https://public.findpiano.cn/1.com"
              // 发给原生
              if (res.data.body && res.data.body.orn) {
                modules.settings.setProperty('merchantImagePath', res.data.body.bigPic)
                modules.settings.setProperty('merchantOrn', res.data.body.orn)
                return dispatch('setNativeStorage', {pianoInfo: res.data.body})
              }
            }).catch((error) => {
              return error
            })
          }
        })
      },
      /**
        * @desc 获取钢琴类型（真钢or电钢）
        * */
      getPianoType ({dispatch}) {
        modules.device.getPianoType().then((data) => {
          let type = 'electric'
          if (data === 0 || data === 1) {
            type = 'real'
          }
          return dispatch('setNativeStorage', {pianoType: type})
        })
      },
      /**
       * @desc 用户注销
       * */
      logout ({dispatch, state}) {
        // 通知原生当前未登录
        modules.user.logOut()
        dispatch('setNativeStorage', {userInfo: {}, isLogin: false}).then(() => {
          return dispatch('setNativeStorage', {sessionId: ''})
        })
      },
      /**
       * @desc 清除缓存
       * */
      clearCache ({dispatch, state, commit}, auto) {
        let root = state.environments.HTTP_ROOT
        let userId = state.storage.isLogin && state.storage.userInfo.userId ? state.storage.userInfo.userId : -1
        console.log(state.storage.clearTime1, 'state.storage.clearTime1')
        if (auto) {
          if (!state.storage.clearTime1) {
            // 第一次清的时候 把原来的数据存入新的位置
            console.log('第一次清的时候 把原来的数据存入新的位置')
            let tableName = 'findFamily-' + root
            return nativeStorage.get(tableName, '-1').then((data) => {
              let userData = ''
              if (data && typeof data.value === 'string') {
                userData = JSON.parse(data.value)
              }
              console.log(userData)
              if (userData && userData.localRecent) {
                dispatch('index/localRecent', userData.localRecent || [])
              }
              if (userData && userData.localCollect) {
                dispatch('index/localCollect', userData.localCollect || [])
              }
              console.log('拿不到上次清缓存的时间或者上次清缓存的时间距离现在超过了24小时 清除缓存')
              dispatch('setNativeStorage', {clearTime1: Date.now()})
              commit(CLEAR_CACHE)
              return nativeStorage.set('findFamily-' + root, String(userId), {value: {}})
            })
          }
        } else {
          // 收到原生发送的清除缓存的通知 清除本地收藏和最近打开列表
          console.log('收到原生发送的清除缓存的通知 清除本地收藏和最近打开列表')
          dispatch('index/localRecent', [])
          dispatch('index/localCollect', [])
          nativeStorage.clear('findFamily-' + root + 'apiStorage')
        }
      },
      /**
       * @desc 恢复出厂设置 清除所有缓存数据
       * */
      restoreFactorySettings ({dispatch, state}) {
        let root = state.environments.HTTP_ROOT + 'apiStorage'
        let rootArr = ['https://api.etango.cn:13001/', 'https://api.ktunes.cn:13001/', 'https://api.findpiano.cn:13001/']
        rootArr.map((value) => {
          nativeStorage.clear('findFamily-' + value)
        })
        nativeStorage.clear('findFamily-' + root)
      },
      /**
       * @desc 用户注销时的数据映射view
       * */
      logoutCache ({dispatch, commit, state}) {
        let root = state.environments.HTTP_ROOT
        nativeStorage.get('findFamily-' + root, '-1').then(param => {
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
      },
      addPractice ({dispatch, state}) {
        if (!state.storage.isActivation) {
          return
        }
        let month = `${new Date().getMonth() + 1}`
        let day = `${new Date().getDate()}`
        if (!state.storage.playCalendar[month]) {
          return
        }
        let playCalendarData = [].concat(JSON.parse(JSON.stringify(state.storage.playCalendar[month])))
        if (playCalendarData[day - 1].practiced) {
          // 当天已经加入了练琴日历
          return
        }
        playCalendarData[day - 1].practiced = true
        return dispatch('setNativeStorage', {'playCalendar': {[month]: playCalendarData}})
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
    }
  })
}
