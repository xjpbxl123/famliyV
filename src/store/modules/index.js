import http from '../../scripts/http'
import {getUsedTime, storage} from 'find-sdk'
const SELECTED_INDEX = 'SELECTED_INDEX' /// 设置选中的项
const RECENT_BOOKS = 'RECENT_BOOKS' /// 最近更新
const HOT_BOOKS = 'HOT_BOOKS' /// 热门
const PIANO_USED_TIME = 'PIANO_USED_TIME' /// 钢琴使用时间
export default {
  namespaced: true,
  state: {
    selectedIndex: 0,
    recentBooks: {bookList: []},
    hotBooks: {bookList: []},
    usedTime: {
      autoPlayTime: '', //  自动演奏时间
      openAppTime: '', //  累计开始使用时间
      scoringTime: '' //  评分时间
    }
  },
  mutations: {
    [SELECTED_INDEX] (state, index) {
      state.selectedIndex = index
    },
    [RECENT_BOOKS] (state, recentBooks) {
      state.recentBooks = recentBooks
    },
    [HOT_BOOKS] (state, hotBooks) {
      state.hotBooks = hotBooks
    },
    [PIANO_USED_TIME] (state, data) {
      state.usedTime = data
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
    getHotBooks ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 5}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getHottestBooks',
        tagId,
        page
      }).then(res => {
        let body = res.body
        let imgArr = body.bookList.map(item => {
          return item.cover
        })
        storage.getNetworkImageAll(imgArr).then((data) => {
          body.bookList.forEach((item, index) => {
            item.coverSmall = data[index]
          })
          dispatch('setCacheToStorage', {hottest: body}, {root: true})
        })
        // commit(HOT_BOOKS, res.body)
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
    }
  }
}
