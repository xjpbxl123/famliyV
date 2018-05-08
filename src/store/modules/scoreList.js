import http from '../../scripts/http'
const SCORE_INDEX = 'POPULAR_INDEX' /// 曲谱列表
export default {
  namespaced: true,
  state: {
    scoreIndex: 0
  },
  mutations: {
    [SCORE_INDEX] (state, index) {
      state.scoreIndex = index
    }
  },
  actions: {
    /**
     * @desc 流行经典选中index
     * */
    setScoreListIndex ({commit}, num) {
      commit(SCORE_INDEX, num)
    },
    /**
     * @desc 获取曲谱列表
     * */
    getScoreList ({dispatch}, {page = {'offset': 0, 'count': 1000}, bookId}) {
      return http.post('', {
        cmd: 'musicScore.getMusicsByBook',
        page,
        bookId
      }).then(res => {
        if (res.header.code === 0) {
          let musicIdList = []
          res.body.musicList.forEach((item) => {
            item.files.forEach((value, index) => {
              musicIdList.push(value.musicId)
            })
            http.post('', {
              cmd: 'musicScore.checkPracticeMusic',
              musicList: musicIdList
            }).then(res => {
              item.collect = res.body.musicList
              console.log(res, '收藏结果')
            })
            console.log(musicIdList)
            musicIdList = []
          })
          console.log(res.body.musicList, 'musicList')
          res.body && dispatch('setCacheToStorage', {scoreList: res.body.musicList, id: bookId}, {root: true})
        }
      })
    }
  }
}
