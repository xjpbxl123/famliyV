import http from 'scripts/http'

export default {
  namespaced: true,
  state: {
    serverVersionInfo: {},
    localVersionInfo: {}
  },
  mutations: {
    setServerVersionInfo (state, versionInfo) {
      state.serverVersionInfo = versionInfo
    },
    setLocalVersionInfo (state, versionInfo) {
      state.localVersionInfo = versionInfo
    }
  },
  actions: {
    getServerVersionInfo ({dispatch, commit, state} = {}, data) {
      console.log('hahahahahah')
      http.post('', {
        cmd: 'system.getApp',
        appType: 'testing',
        appName: 'familyH5'
      }).then(res => {
        console.log(res)
        commit('setServerVersionInfo', res.body.app)
      })
    },
    getLocalVersionInfo ({dispatch, commit, state}, data) {
      let localVersionInfo = {
        version: '1.0.1',
        build: 110
      }
      commit('setLocalVersionInfo', localVersionInfo)
    }
  }
}
