import http from 'scripts/http'

export default {
  namespaced: true,
  state: {
    scoreListIndex: 0,
    currentPage: 1,
    totalPage: 1
  },
  mutations: {
    'scoreListIndex' (state, index) {
      state.scoreListIndex = index
    },
    'totalPage' (state, totalPage) {
      state.totalPage = totalPage
    },
    'currentPage' (state, currentPage) {
      state.currentPage = currentPage
    }
  },
  actions: {
    setScoreListIndex ({commit}, num) {
      commit('scoreListIndex', num)
    },
    setTotalPage ({commit}, num) {
      commit('totalPage', num)
    },
    setCurrentPage ({commit}, num) {
      commit('currentPage', num)
    },
    getScoreSetList ({dispatch, commit, state} = {}, data) {
      let page = data.page
      commit('currentPage', page)
      http.post('', {
        cmd: 'musicScore.getBooksByTag',
        tagId: 1,
        page: {
          offset: (page - 1) * 20,
          count: 20
        }
      }).then(res => {
        console.log(res)
        if (res.header.code === 0) {
          commit('totalPage', Math.ceil(res.body.sum / 20))
          dispatch('setCacheToStorage', {scoreSetList: res.body.bookList}, {root: true})
        }
      })
    }
  }
}
