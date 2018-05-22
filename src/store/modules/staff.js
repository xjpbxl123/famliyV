/**
 * Create by Moersing on 2018/5/17
 */
import http from 'scripts/http'

const MUSIC_INFO = 'MUSIC_INFO'
export default {
  namespaced: true,
  state: {
    musicInfo: {
      files: [{
        sHtml: {
          url: ''
        }
      }]
    }
  },
  mutations: {
    [MUSIC_INFO] (state, data) {
      state.musicInfo = data
    }
  },
  getters: {
    src: state => {
      return state.musicInfo.files[0].sHtml.url
    }
  },
  actions: {
    /**
     * @desc 获取曲谱的信息
     * */
    getMusicInfo ({commit}, {musicId}) {
      return http.post('', {
        cmd: 'musicScore.getMusicInfo',
        musicId: musicId
      }).then(res => {
        commit(MUSIC_INFO, res.body)
        return res.body
      })
    }
  }
}
