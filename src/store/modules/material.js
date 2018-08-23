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
          let sumPage = Math.ceil(body.length / 8)
          let materialList = {body, sumPage}
          dispatch('setCacheToStorage', {materialList}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    }
  }
}
