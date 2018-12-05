import http from 'scripts/http'

export default {
  namespaced: true,
  state: {
    scoreListIndex: 0,
    scoreListPageIndex: 0
  },
  mutations: {
    'scoreListIndex' (state, index) {
      state.scoreListIndex = index
    },
    'scoreListPageIndex' (state, index) {
      state.scoreListPageIndex = index
    }
  },
  actions: {
    setScoreListIndex ({commit}, num) {
      commit('scoreListIndex', num)
    },
    setScoreListPageIndex ({commit}, num) {
      commit('scoreListPageIndex', num)
    },
    getScoreSetList ({dispatch, commit, state} = {}, data) {
      dispatch('setCacheFromTable', 'scoreSetList', {root: true})
      let setId = data.setId
      return http.post('', {
        cmd: 'musicScore.getBooksByTag',
        tagId: setId,
        page: {
          offset: 0,
          count: 100
        }
      }).then(res => {
        if (res.header.code === 0) {
          return dispatch('setCacheToStorage', {scoreSetList: res.body.bookList, id: setId}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    }
  }
}
