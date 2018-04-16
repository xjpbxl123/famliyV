import http from 'scripts/http'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    login ({dispatch}, {userName, password}) {
      http.post('', {
        cmd: 'account.login',
        type: 0,
        clientType: 3,
        userName: userName,
        password: password
      }).then(data => {
        dispatch('createSession', data.body.sess, {root: true})
      })
    }
  }
}
