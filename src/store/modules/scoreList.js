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
    getScoreList ({dispatch, state}, {page = {'offset': 0, 'count': 1000}, typeName, id}) {
      console.log(id)
      let cmd = 'musicScore.getMusicsByBook'
      let netObj = {page, bookId: id, cmd: cmd}
      if (typeName === 'other') {
        cmd = 'musicScore.getMusicsByTag'
        netObj = {page, tagId: id, cmd: cmd}
      }
      console.log(netObj)
      return http.post('', {
        ...netObj
      }).then(res => {
        console.log(res)
        if (res.header.code === 0) {
          let musicIdList = []
          let payment = ''
          let subParts = {base: '0', accompany: '0', video: '0'}
          res.body.musicList.forEach((item) => {
            if (!item.isFree && !item.sales && item.have && !item.have.base) {
              // 需要购买
              let money = 0
              if (item.have.base !== undefined && item.price.base) {
                subParts.base = '1'
                money += item.price.base
              }
              if (item.have.accompany === undefined && item.price.accompany) {
                subParts.accompany = '1'
                money += item.price.accompany
              }
              if (item.have.video === undefined && item.price.video) {
                subParts.video = '1'
                money += item.price.video
              }
              payment = '￥' + money
            }
            item.payment = payment
            item.subParts = subParts
            item.files.forEach((value, index) => {
              musicIdList.push(value.musicId)
            })
            if (!this.state.storage.isLogin) {
              let collectData = []
              musicIdList.forEach((value) => {
                if (this.state.storage.cache.renderCache['localCollect'].length === 0) {
                  collectData.push({musicId: value, collection: 0})
                } else {
                  this.state.storage.cache.renderCache['localCollect'].forEach((value1) => {
                    if (value === value1.musicId) {
                      // 有收藏记录
                      collectData.push({musicId: value, collection: 1})
                    } else {
                      collectData.push({musicId: value, collection: 0})
                    }
                  })
                }
              })
              item.collect = collectData
              collectData = []
            } else {
              http.post('', {
                cmd: 'musicScore.checkPracticeMusic',
                musicList: musicIdList
              }).then(res => {
                item.collect = res.body.musicList
              })
            }

            musicIdList = []
          })
          console.log(res.body.musicList, 'res.body.musicList')
          return res.body && dispatch('setCacheToStorage', {scoreList: res.body.musicList, id: id}, {root: true})
        }
      })
    },
    /**
     * @desc 操作
     * */
    setCollect ({dispatch, state}, {scoreList, bookId, musicId, flag}) {
      dispatch('setCacheToStorage', {scoreList: scoreList, id: bookId}, {root: true})
      if (!musicId) {
        return
      }
      if (flag) {
        // 添加收藏
        http.post('', {
          cmd: 'musicScore.addPracticeMusic',
          bookId,
          musicId
        }).then(res => {
          console.log('添加收藏')
        })
      } else {
        // 移出收藏
        http.post('', {
          cmd: 'musicScore.delPracticeMusic',
          bookId,
          musicId
        }).then(res => {
          console.log('移除收藏')
        })
      }
    }
  }
}
