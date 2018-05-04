import http from '../../scripts/http'
const SCORE_INDEX = 'POPULAR_INDEX' /// 曲谱列表
export default {
  namespaced: true,
  state: {
    scoreIndex: 0
  },
  mutations: {
    [SCORE_INDEX] (state, index) {
      state.popularIndex = index
    }
  },
  actions: {
    /**
     * @desc 流行经典选中index
     * */
    setScoreIndex ({commit}, num) {
      commit(SCORE_INDEX, num)
    },
    /**
     * @desc 获取曲谱列表
     * */
    getScoreList ({dispatch}, {page = {'offset': 0, 'count': 1000}, bookId}) {
      return http.post('', {
        cmd: 'musicScore.getMusicsByBook',
        page,
        bookId
      }).then(res => {
        if (res.header.code === 0) {
          dispatch('setCacheToStorage', {scoreList: res.body.musicList}, {root: true})
        } else if (res.header.code === 5) {
          dispatch('setCacheToStorage', {scoreList: []}, {root: true})
        }
      })
    }
  }
}
