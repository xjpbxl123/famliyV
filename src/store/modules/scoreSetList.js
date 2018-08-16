import http from 'scripts/http'

export default {
  namespaced: true,
  state: {
    scoreListIndex: 0,
    totalPage: 1,
    scoreListPageIndex: 0
  },
  mutations: {
    'scoreListIndex' (state, index) {
      state.scoreListIndex = index
    },
    'scoreListPageIndex' (state, index) {
      state.scoreListPageIndex = index
    },
    'totalPage' (state, totalPage) {
      state.totalPage = totalPage
    }
  },
  actions: {
    setScoreListIndex ({commit}, num) {
      commit('scoreListIndex', num)
    },
    setTotalPage ({commit}, num) {
      commit('totalPage', num)
    },
    setScoreListPageIndex ({commit}, num) {
      commit('scoreListPageIndex', num)
    },
    getScoreSetList ({dispatch, commit, state} = {}, data) {
      let setId = data.setId
      http.post('', {
        cmd: 'musicScore.getBooksByTag',
        tagId: setId,
        page: {
          offset: 0,
          count: 100
        }
      }).then(res => {
        console.log(res)
        if (res.header.code === 0) {
          commit('totalPage', Math.ceil(res.body.sum / 20))
          if (state.scoreListIndex >= res.body.bookList.length) {
            commit('scoreListIndex', res.body.bookList.length - 1)
          }
          return dispatch('setCacheToStorage', {scoreSetList: res.body.bookList, id: setId}, {root: true})
        }
      })
    }
  }
}
