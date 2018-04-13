import http from '../../scripts/http'

const RECENT_BOOKS = 'RECENT_BOOKS' /// 最近更新
const HOT_BOOKS = 'HOT_BOOKS' /// 最近更新
export default {
  namespaced: true,
  state: {
    recentBooks: {},
    hotBooks: {}
  },
  mutations: {
    [RECENT_BOOKS] (state, recentBooks) {
      state.recentBooks = recentBooks
    },
    [HOT_BOOKS] (state, hotBooks) {
      state.hotBooks = hotBooks
    }
  },
  actions: {
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
  }
}
