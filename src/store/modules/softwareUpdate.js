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
      return http.post('', {
        cmd: 'system.getApp',
        appType: 'testing',
        appName: 'familyH5'
      })
      // .then((res) => {
      //   commit('setServerVersionInfo', res.body.app)
      // }).catch((err) => {
      //   console.log(1211, err)
      // })
    },
    setServerVersionInfo ({dispatch, commit, state}, data) {
      commit('setServerVersionInfo', data.body.app)
    },
    getLocalVersionInfo ({dispatch, commit, state}, data) {
      return new Promise(function (resolve, reject) {
        let localVersionInfo = {
          version: process.env.VERSION,
          build: process.env.BUILD_VERSION
        }
        if (localVersionInfo.version) {
          commit('setLocalVersionInfo', localVersionInfo)
          resolve(localVersionInfo)
        } else {
          let err = new Error('获取本地版本失败')
          reject(err)
        }
      })
    }
  }
}
