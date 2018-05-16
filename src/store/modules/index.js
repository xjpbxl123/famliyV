import http from '../../scripts/http'
import { getUsedTime } from 'find-sdk'

const SELECTED_INDEX = 'SELECTED_INDEX' /// 设置选中的项
const RECENT_BOOKS = 'RECENT_BOOKS' /// 最近更新
const HOT_BOOKS = 'HOT_BOOKS' /// 热门
const PIANO_USED_TIME = 'PIANO_USED_TIME' /// 钢琴使用时间
const RIGHT_SELECTED_INDEX = 'RIGHT_SELECT_INDEX' /// 最近打开索引
const RIGHT_TYPE = 'RIGHT_TYPE'
export default {
  namespaced: true,
  state: {
    selectedIndex: 0,
    rightSelectedIndex: 0,
    recentBooks: {bookList: []},
    hotBooks: {bookList: []},
    usedTime: {
      autoPlayTime: '', //  自动演奏时间
      openAppTime: '', //  累计开始使用时间
      scoringTime: '' //  评分时间
    },
    rightType: 'recentOpen'
  },
  mutations: {
    [SELECTED_INDEX] (state, index) {
      state.selectedIndex = index
    },
    [RIGHT_SELECTED_INDEX] (state, index) {
      state.rightSelectedIndex = index
    },
    [RECENT_BOOKS] (state, recentBooks) {
      state.recentBooks = recentBooks
    },
    [HOT_BOOKS] (state, hotBooks) {
      state.hotBooks = hotBooks
    },
    [PIANO_USED_TIME] (state, data) {
      state.usedTime = data
    },
    [RIGHT_TYPE] (state, data) {
      state.rightType = data
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
     * @desc 设置右侧列表选中的项
     * */
    setRightSelect ({commit}, num) {
      commit(RIGHT_SELECTED_INDEX, num)
    },
    /**
     * @desc 获取最近更新
     * */
    getRecentBooks ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 7}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getRecentBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('setCacheToStorage', {recentUpdate: res.body}, {root: true})
        }
      })
    },
    /**
     * @desc 获取热门更新
     * */
    getHotBooks ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 5}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getHottestBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('setCacheToStorage', {hottest: res.body}, {root: true})
        }
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
          dispatch('setCacheToStorage', {recentOpen: res.body}, {root: true})
        } else if (res.header.code === 5) {
          dispatch('setCacheToStorage', {recentOpen: []}, {root: true})
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
          // res.body.forEach(value => {
          //   value.desc = value.desc.replace(/[\n\r]/m, '')
          // })
          dispatch('setCacheToStorage', {myCollect: res.body}, {root: true})
        } else if (res.header.code === 5) {
          dispatch('setCacheToStorage', {myCollect: []}, {root: true})
        }
      })
    },
    /**
     * @desc 获取本地收藏列表
     * */
    localCollectList ({dispatch}, file) {
      return dispatch('setCacheToStorage', {localCollect: file}, {root: true})
    },
    /**
     * @desc 获取本地最近打开
     * */
    getLocalRecentOpenList ({dispatch}, file) {
      return dispatch('setCacheToStorage', {localRecent: file}, {root: true})
    },
    /**
     * @desc 获取右侧列表状态
     * */
    setRightType ({commit} = {}, str) {
      commit(RIGHT_TYPE, str)
    }

  }
}
