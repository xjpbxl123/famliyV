import http from 'scripts/http'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    login ({dispatch}, {userName, password}) {
      return http.post('', {
        cmd: 'account.login',
        type: 0,
        clientType: 3,
        userName: userName,
        password: password
      }).then(data => {
        if (data.body.sess) {
          return dispatch('setSession', data.body.sess, {root: true})
        }
        return data
      }).catch((error) => {
        return error
      })
    }
  }
}
