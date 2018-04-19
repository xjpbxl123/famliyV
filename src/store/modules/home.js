/**
 * Create by Moersing on 2018/4/18
 */
const DEMO = 'DEMO'
export default {
  namespaced: true,
  state: {
    demoText: ''
  },
  mutations: {
    [DEMO] (state, text) {
      state.demoText = text
    }
  },
  actions: {
    demo ({commit}, data) {
      commit(DEMO, data.text)
    }
  }
}
