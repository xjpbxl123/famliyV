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
    getScoreList ({dispatch, state}, {page = {'offset': 0, 'count': 100}, typeName, id}) {
      let cmd = 'musicScore.getMusicsByBook'
      let netObj = {page, bookId: id, cmd: cmd}
      if (typeName === 'other') {
        cmd = 'musicScore.getMusicsByTag'
        netObj = {page, tagId: id, cmd: cmd, type: 1}
      }
      return http.post('', {
        ...netObj
      }).then(res => {
        if (res.header.code === 0) {
          let payment = ''
          let subParts = {base: '0', accompany: '0', video: '0'}
          let postList = []
          res.body.musicList.forEach((item) => {
            let musicIdList = []
            item.files.forEach((each) => {
              if (each.mMp44k.url || each.mMp41080p.url) {
                item.hasVideo = true
              }
            })
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
                  let flag = 0
                  this.state.storage.cache.renderCache['localCollect'].forEach((value1) => {
                    if (value === value1.musicId) {
                      // 有收藏记录
                      flag = 1
                    }
                  })
                  collectData.push({musicId: value, collection: flag})
                }
              })
              item.collect = collectData
              collectData = []
              return dispatch('setCacheToStorage', {scoreList: res.body.musicList, id: id}, {root: true})
            } else {
              postList.push(http.post('', {
                cmd: 'musicScore.checkPracticeMusic',
                musicList: musicIdList
              }))
            }
            musicIdList = []
            if (item.files.length > 1) {
              // 版本重新排序
              let filterFile = []
              item.files.forEach(data => {
                if (data.styleId === 1) {
                  filterFile.push(data)
                }
              })
              item.files.forEach(data => {
                if (data.styleId === 7) {
                  filterFile.push(data)
                }
              })
              item.files.forEach(data => {
                if (data.styleId === 6) {
                  filterFile.push(data)
                }
              })
              item.files.forEach(data => {
                if (data.styleId === 5) {
                  filterFile.push(data)
                }
              })
              item.files.forEach(data => {
                if (data.styleId === 2) {
                  filterFile.push(data)
                }
              })
              item.files = filterFile
            }
          })
          if (this.state.storage.isLogin) {
            return Promise.all(postList).then((data) => {
              res.body.musicList.forEach((item, index) => {
                item.collect = data[index].body.musicList
              })
              console.log(res.body.musicList, 'res.body.musicList')
              return dispatch('setCacheToStorage', {scoreList: res.body.musicList, id: id}, {root: true})
            })
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * @desc 操作
     * */
    setCollect ({dispatch, state}, {scoreList, bookId, musicId, flag}) {
      if (scoreList) {
        dispatch('setCacheToStorage', {scoreList: scoreList, id: bookId}, {root: true})
      }
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
    },
    addBookViewMount ({dispatch}, { bookId }) {
      // 添加书籍浏览量
      http.post('', {
        cmd: 'musicScore.addBookClicks',
        bookId
      }).then(res => {
        console.log('添加书籍浏览量')
      })
    }
  }
}
