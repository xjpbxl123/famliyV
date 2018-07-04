import http from '../../scripts/http'
import { getUsedTime } from 'find-sdk'

const SELECTED_INDEX = 'SELECTED_INDEX' /// 设置选中的项
const RECENT_BOOKS = 'RECENT_BOOKS' /// 最近更新
const HOT_BOOKS = 'HOT_BOOKS' /// 热门
const PIANO_USED_TIME = 'PIANO_USED_TIME' /// 钢琴使用时间
const RIGHT_SELECTED_INDEX = 'RIGHT_SELECT_INDEX' /// 最近打开索引
const RIGHT_TYPE = 'RIGHT_TYPE'
const MORE_INDEX = 'MORE_INDEX'
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
    rightType: 'recentOpen',
    moreIndex: 0

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
    },
    [MORE_INDEX] (state, data) {
      state.moreIndex = data
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
     * @desc 设置查看更多页面index
     * */
    setMoreIndex ({commit}, num) {
      commit(MORE_INDEX, num)
    },
    /**
     * @desc 获取最近更新
     * */
    getRecentBooks ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 20}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getRecentBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          let re = JSON.parse(JSON.stringify(res.body))
          return dispatch('setCacheToStorage', {recentUpdateAll: res.body}, {root: true}).then(() => {
            re.bookList = re.bookList.slice(0, 7)
            dispatch('setCacheToStorage', {recentUpdate: re}, {root: true})
          })
        }
      })
    },
    /**
     * @desc 获取热门更新
     * */
    getHotBooks ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 20}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getHottestBooks',
        tagId,
        page
      }).then(res => {
        if (res.header.code === 0) {
          let ho = JSON.parse(JSON.stringify(res.body))
          return dispatch('setCacheToStorage', {hottestAll: res.body}, {root: true}).then(() => {
            ho.bookList = ho.bookList.slice(0, 5)
            dispatch('setCacheToStorage', {hottest: ho}, {root: true})
          })
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
      let localRecent = [].concat(JSON.parse(JSON.stringify(this.state.storage.cache.renderCache.localRecent)))
      if (musicObj) {
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
     * @desc 获取右侧列表状态
     * */
    setRightType ({commit} = {}, str) {
      commit(RIGHT_TYPE, str)
    }

  }
}
