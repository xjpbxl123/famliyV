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
      dispatch('setCacheFromTable', 'materialList', {root: true})
      return http.post('', {cmd: 'musicScore.getAllBookSets'}).then(({body, header}) => {
        if (!header.code) {
          let sumPage = Math.ceil(body.length / 8)
          let materialList = {body, sumPage}
          return dispatch('setCacheToStorage', {materialList}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    }
  }
}
