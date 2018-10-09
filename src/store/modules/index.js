import http from '../../scripts/http'
import { getUsedTime, modules } from 'find-sdk'
const SELECTED_INDEX = 'SELECTED_INDEX' /// 设置选中的项
const PIANO_USED_TIME = 'PIANO_USED_TIME' /// 钢琴使用时间
const RIGHT_SELECTED_INDEX = 'RIGHT_SELECT_INDEX' /// 最近打开索引
const RIGHT_TYPE = 'RIGHT_TYPE'
const MORE_INDEX = 'MORE_INDEX'
const MORE_INDEX_TITLE = 'MORE_INDEX_TITLE'
export default {
  namespaced: true,
  state: {
    selectedIndex: 0,
    rightSelectedIndex: 0,
    usedTime: {
      autoPlayTime: '', //  自动演奏时间
      openAppTime: '', //  累计开始使用时间
      scoringTime: '' //  评分时间
    },
    rightType: 'recentOpen',
    moreIndex: 0,
    moreIndexTitle: '最近更新'

  },
  mutations: {
    [SELECTED_INDEX] (state, index) {
      state.selectedIndex = index
    },
    [RIGHT_SELECTED_INDEX] (state, index) {
      state.rightSelectedIndex = index
    },
    [PIANO_USED_TIME] (state, data) {
      state.usedTime = Object.assign({}, data)
    },
    [RIGHT_TYPE] (state, data) {
      state.rightType = data
    },
    [MORE_INDEX] (state, data) {
      state.moreIndex = data
    },
    [MORE_INDEX_TITLE] (state, data) {
      state.moreIndexTitle = data
    }
  },
  actions: {
    /**
     * @desc 设置选中的项
     * */
    setSelected ({commit}, num) {
      commit(SELECTED_INDEX, num)
    },
    /**
     * @desc 设置查看更多页面选中的数据类型
     * */
    setIndexMoreTitle ({commit}, num) {
      commit(MORE_INDEX_TITLE, num)
    },
    /**
     * @desc 设置右侧列表选中的项
     * */
    setRightSelect ({commit}, num) {
      commit(RIGHT_SELECTED_INDEX, num)
    },
    /**
     * @desc 设置查看更多页面index
     * */
    setMoreIndex ({commit}, num) {
      commit(MORE_INDEX, num)
    },
    /**
     * @desc 获取最近更新
     * */
    getRecentBooks ({dispatch}, {tagId = 1, page = {'offset': 0, 'count': 20}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getRecentBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('setCacheToStorage', {recentUpdate: res.body}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    },
    /**
     * @desc 获取热门更新
     * */
    getHotBooks ({dispatch}, {tagId = 1, page = {'offset': 0, 'count': 20}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getHottestBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('setCacheToStorage', {hottest: res.body}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    },
    /**
     * @desc 获取用户数据模式是否激活
     * */
    getIsPracticeDataActive ({dispatch}) {
      modules.settings.getProperty('isPracticeDataActive').then((data) => {
        return dispatch('setNativeStorage', {isActivation: Boolean(data)}, {root: true})
      })
    },
    /**
     * @desc 获取用户数据模式是否是日历模式
     * */
    getPracticeDataMode ({dispatch}) {
      modules.settings.getProperty('practiceDataMode').then((data) => {
        return dispatch('setNativeStorage', {isCalendar: Boolean(!data)}, {root: true})
      })
    },
    /**
     * @desc 监听用户数据模式改变
     * */
    registUserCountDataMode ({dispatch}) {
      modules.notification.regist('UserCountDataMode', data => {
        return dispatch('setNativeStorage', {isActivation: data.isActivation}, {root: true}).then(() => {
          return dispatch('setNativeStorage', {isCalendar: data.isCalendar}, {root: true})
        })
      })
    },
    /**
     * @desc 钢琴使用时间
     * */
    getPianoUsedTime ({commit}) {
      return getUsedTime().then(data => {
        data.usedTime = `${Number.parseInt(data.openAppTime / 3600)}小时`
        data.autoPlayerTime = `${Number.parseInt(data.autoPlayTime / 3600)}小时`
        data.ratePlayMoment = `${Number.parseInt(data.scoringTime / 3600)}小时`
        commit(PIANO_USED_TIME, data)
      })
    },
    /**
     * @desc 获取最近打开
     * */
    getRecentOpenList ({dispatch, commit}, {tagId = 0} = {}) {
      return http.post('', {
        cmd: 'musicScore.getPracticeRecent',
        tagId
      }).then(res => {
        if (res.header.code === 0) {
          res.body.reverse()
          res.body = res.body.slice(0, 20)
          dispatch('setCacheToStorage', {recentOpenList: res.body}, {root: true})
        } else if (res.header.code === 5) {
          dispatch('setCacheToStorage', {recentOpenList: []}, {root: true})
        }
      })
    },
    /**
     * @desc 获取收藏列表
     * */
    getCollectList ({dispatch, commit}, {tagId = 0} = {}) {
      return http.post('', {
        cmd: 'musicScore.getPracticeMusic',
        tagId
      }).then(res => {
        if (res.header.code === 0) {
          res.body.reverse()
          res.body = res.body.slice(0, 20)
          dispatch('setCacheToStorage', {collectList: res.body}, {root: true})
        } else if (res.header.code === 5) {
          dispatch('setCacheToStorage', {collectList: []}, {root: true})
        }
      })
    },
    /**
     * @desc 获取本地收藏列表
     * */
    localCollect ({dispatch}, file) {
      return dispatch('setCacheToStorage', {localCollect: file}, {root: true})
    },
    /**
     * @desc 获取本地最近打开
     * */
    localRecent ({dispatch}, musicObj) {
      let localRecent = []
      if (Array.prototype.isPrototypeOf(musicObj)) {
        // 存入数组
        localRecent = musicObj
      } else {
        // 存入对象
        localRecent = [].concat(JSON.parse(JSON.stringify(this.state.storage.cache.renderCache.localRecent)))
        let flag = false
        let num = 0
        if (localRecent.length !== 0) {
          localRecent.forEach((item, index) => {
            if (item.musicId === musicObj.musicId) {
              flag = true
              num = index
            }
          })
          if (flag) {
            localRecent.splice(num, 1)
          }
        }
        localRecent.unshift(musicObj)
        localRecent = localRecent.splice(0, 20)
      }
      return dispatch('setCacheToStorage', {localRecent: localRecent}, {root: true}).then((data) => {
        console.log(data, 'data')
      })
    },
    /**
     * @desc 登录时加入最近打开加入
     * */
    addRecentOpen ({dispatch}, musicObj) {
      http.post('', {
        cmd: 'musicScore.addPracticeRecent',
        musicId: musicObj.musicId,
        practiceTime: musicObj.practiceTime
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('getRecentOpenList')
        }
      })
    },
    /**
     * @desc 获取右侧列表状态
     * */
    setRightType ({commit} = {}, str) {
      commit(RIGHT_TYPE, str)
    },
    /**
     * @desc 获取曲子信息
     * */
    getMusicInfo ({dispatch} = {}, musicId) {
      return http.post('', {cmd: 'musicScore.getMusicInfo', musicId}).then(({body, header}) => {
        if (!header.code) {
          if (body) {
            return dispatch('setCacheToStorage', {musicInfo: body, id: musicId}, {root: true})
          }
        }
      }).catch((error) => {
        return error
      })
    }
  }
}
