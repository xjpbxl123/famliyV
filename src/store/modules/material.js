import http from '../../scripts/http'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    /**
     * @desc 获取教材系列列表
     * */
    getAllBookSets ({dispatch, commit} = {}) {
      http.post('', {cmd: 'musicScore.getAllBookSets'}).then(({body, header}) => {
        if (!header.code) {
          dispatch('setCacheToStorage', {materialList: body}, {root: true})
        }
      })
    }
  }
}
