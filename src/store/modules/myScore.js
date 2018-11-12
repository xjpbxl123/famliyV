import { file } from 'find-sdk'
import http from '../../scripts/http'
const MY_SCORE_TAP_INDEX = 'MY_SCORE_TAP_INDEX' /// 我的曲谱index
const LOCAL_SOURCE = 'LOCAL_SOURCE' /// 本地资源
const LOCAL_SOURCE_INDEX = 'LOCAL_SOURCE_INDEX' /// 本地资源index
const LOCAL_SOURCE_PATH = 'LOCAL_SOURCE_PATH' /// 本地资源路径
const UPAN_PATH = 'UPAN_PATH'
const MY_RECORD = 'MY_RECORD' /// 我的录音
const MY_RECORD_INDEX = 'MY_RECORD_INDEX' /// 我的录音index
const MY_RECORD_PATH = 'MY_RECORD_PATH' // 我的录音路径
const MY_PLAY = 'MY_PLAY' /// 我的弹奏
const MY_PLAY_INDEX = 'MY_PLAY_INDEX' /// 我的弹奏index
const MY_PLAY_PATH = 'MY_PLAY_PATH' // 我的录音路径
const MY_COLLECT_INDEX = 'MY_COLLECT_INDEX' /// 我的收藏index
const MY_RECENT_INDEX = 'MY_RECENT_INDEX' /// 我的最近打开index
const ORDER_INDEX = 'ORDER_INDEX' /// 文件排序index
const UPAN_SOURCE = 'UPAN_SOURCE' /// U盘数据
const UPAN_ORDER_INDEX = 'UPAN_ORDER_INDEX'
const UPAN_INDEX = 'UPAN_INDEX'

export default {
  namespaced: true,
  state: {
    myScoreTapIndex: 4,
    localSource: [],
    localSourceIndex: 0,
    localSourcePath: '$userUpload',
    myRecordPath: '$userRecord',
    myRecord: [],
    myRecordIndex: 0,
    myPlay: [],
    myPlayIndex: 0,
    myCollectIndex: 0,
    myRecentIndex: 0,
    orderIndex: 0,
    uPanOrderIndex: 0,
    uPanIndex: 0,
    myPlayPath: '$userHistory',
    uPanSource: [],
    uPanPath: '/Volumes'
  },
  mutations: {
    [UPAN_SOURCE] (state, data) {
      state.uPanSource = data
    },
    [MY_SCORE_TAP_INDEX] (state, index) {
      state.myScoreTapIndex = index
    },
    [LOCAL_SOURCE_INDEX] (state, index) {
      state.localSourceIndex = index
    },
    [LOCAL_SOURCE] (state, data) {
      state.localSource = data
    },
    [ORDER_INDEX] (state, data) {
      state.orderIndex = data
    },
    [UPAN_ORDER_INDEX] (state, data) {
      state.uPanOrderIndex = data
    },
    [LOCAL_SOURCE_PATH] (state, path) {
      state.localSourcePath = path
    },
    [MY_RECORD_PATH] (state, path) {
      state.myRecordPath = path
    },
    [MY_RECORD] (state, data) {
      state.myRecord = data
    },
    [MY_RECORD_INDEX] (state, index) {
      state.myRecordIndex = index
    },
    [MY_PLAY] (state, data) {
      state.myPlay = data
    },
    [MY_PLAY_INDEX] (state, index) {
      state.myPlayIndex = index
    },
    [MY_PLAY_PATH] (state, path) {
      state.myPlayPath = path
    },
    [MY_COLLECT_INDEX] (state, index) {
      state.myCollectIndex = index
    },
    [MY_RECENT_INDEX] (state, index) {
      state.myRecentIndex = index
    },
    [UPAN_PATH] (state, path) {
      state.uPanPath = path
    },
    [UPAN_INDEX] (state, index) {
      state.uPanIndex = index
    }
  },
  actions: {
    /**
     * @desc 我的曲谱选中index
     * */
    setMyScoreTapIndex ({commit}, num) {
      commit(MY_SCORE_TAP_INDEX, num)
    },
    /**
     * @desc usb资源拷贝数组
     * */
    setCopyArr ({dispatch, state}, data) {
      if (typeof data === 'string') {
        let copyArr = this.state.storage.cache.renderCache.copyArr
        copyArr.push(data)
        return dispatch('setCacheToStorage', {copyArr: copyArr}, {root: true})
      } else if (typeof data === 'object') {
        return dispatch('setCacheToStorage', {copyArr: data}, {root: true})
      }
    },
    /**
     * @desc 文件排序
     * */
    setOrderIndex ({commit}, num) {
      commit(ORDER_INDEX, num)
    },
    /**
     * @desc U盘index
     * */
    setUpanIndex ({commit}, num) {
      commit(UPAN_INDEX, num)
    },
    /**
     * @desc U盘文件排序
     * */
    setUpanOrderIndex ({commit}, num) {
      commit(UPAN_ORDER_INDEX, num)
    },
    /**
     * @desc 本地资源选中index
     * */
    setLocalSourceIndex ({commit}, num) {
      commit(LOCAL_SOURCE_INDEX, num)
    },
    /**
     * @desc 本地资源path
     * */
    setLocalSourcePath ({commit}, path) {
      commit(LOCAL_SOURCE_PATH, path)
    },
    /**
     * @desc U盘资源path
     * */
    setUpanPath ({commit}, path) {
      commit(UPAN_PATH, path)
    },
    /**
     * @desc 我的录音path
     * */
    setMyRecordPath ({commit}, path) {
      commit(MY_RECORD_PATH, path)
    },
    /**
     * @desc 我的弹奏path
     * */
    setMyPlayPath ({commit}, path) {
      commit(MY_PLAY_PATH, path)
    },
    /**
     * @desc 获取我的曲谱本地资源列表/U盘列表
     * */
    getLocalSource ({commit, state}, {path, type}) {
      console.log(path, 'path')
      let deleteArr = []
      return file.readFolderFile(path).then((res) => {
        if (res.length === 0) {
          if (type === 'Upan') {
            commit(UPAN_SOURCE, [])
          } else {
            commit(LOCAL_SOURCE, [])
          }
          return []
        }
        // 第一步 剔除掉不支持的文件 并加上文件格式属性
        res.forEach((value, index) => {
          if (value.type === 'dir') {
            value.typeName = 'open-now'
          } else {
            let nameArr1 = value.name.split('.')
            let suffix = nameArr1[nameArr1.length - 1]
            if (suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg' || suffix === 'gif' || suffix === 'bmp') {
              value.typeName = 'picture'
            } else
              if (suffix === 'mp3' || suffix === 'wav') {
                value.typeName = 'mp3'
              } else if (suffix === 'mid') {
                value.typeName = 'midi'
              } else if (suffix === 'xml') {
                value.typeName = 'xml'
              } else if (suffix === 'pdf') {
                value.typeName = 'pdf'
              } else if (suffix === 'mp4' || suffix === 'mov') {
                value.typeName = 'video'
              }
          }
          if (!value.typeName) {
            deleteArr.push(index)
          }
        })
        let deleArr = [...new Set(deleteArr)]
        deleArr.forEach((data, index) => {
          if (index === 0) {
            res.splice(data, 1)
          } else {
            res.splice(data - index, 1)
          }
        })
        // 第二步 合并多曲谱
        let deleteIndex = []
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          let name = nameArr[0]
          if (item.filesName) {
            name = item.name
          } else {
            if (nameArr.length > 2) {
              for (let i = 1; i <= nameArr.length - 2; i++) {
                name += '.' + nameArr[i]
              }
            }
          }
          let filesName = []
          res.forEach((item1, index1) => {
            if (item1.type !== 'dir') {
              let nameArr1 = item1.name.split('.')
              let name1 = nameArr1[0]
              if (item1.filesName) {
                name1 = item1.name
              } else {
                if (nameArr1.length > 2) {
                  for (let i = 1; i <= nameArr1.length - 2; i++) {
                    name1 += '.' + nameArr1[i]
                  }
                }
              }
              let suffix1 = nameArr1[nameArr1.length - 1]
              let acceptArr = ['mid', 'xml', 'mp4', 'mp3']
              // 文件类型是这几种才需要合成
              let canOne = false
              let canTwo = false
              if (name1 === name) {
                acceptArr.forEach((value) => {
                  if (value === suffix) {
                    canOne = true
                  }
                  if (value === suffix1) {
                    canTwo = true
                  }
                })
                if (item1.filesName && canOne) {
                  // 删除与合成文件名相同的文件
                  deleteIndex.push(index)
                } else {
                  if (canOne && canTwo) {
                    filesName.push(item1.name)
                  }
                }
              } else {
                // 以‘_sp’开头的 mid文件也需要合成
                if (name1.indexOf(name) !== -1 && name1.indexOf('_sp') !== -1 && suffix1 === 'mid') {
                  deleteIndex.push(index1)
                  filesName.push(item1.name)
                }
                // 以‘_video_4k’开头的 mp4文件也需要合成
                if (name1.indexOf(name) !== -1 && name1.indexOf('_video_4k') !== -1 && suffix1 === 'mp4') {
                  filesName.push(item1.name)
                  deleteIndex.push(index1)
                }
              }
            }
          })
          if (filesName.length > 1) {
            item.name = name
            item.filesName = filesName
            item.typeName = 'song'
          }
        })
        let delArr = [...new Set(deleteIndex)]
        delArr.forEach((data, index) => {
          if (index === 0) {
            res.splice(data, 1)
          } else {
            res.splice(data - index, 1)
          }
        })
        // 排序
        let orIndex = state.orderIndex
        if (type === 'Upan') {
          orIndex = state.uPanOrderIndex
          console.log(this.state.storage.cache.renderCache['copyArr'], 'copyArr')
          console.log(state.uPanPath)
          // 拿到拷贝状态
          res.forEach((value) => {
            this.state.storage.cache.renderCache['copyArr'].forEach((value1) => {
              if (value1 === state.uPanPath + '/' + value.name) {
                value.copyed = true
              }
            })
          })
        }
        switch (orIndex) {
          case 0:
            // 名称排序
            res.sort((a, b) => { return a.name > b.name })
            if (type === 'Upan') {
              commit(UPAN_SOURCE, res)
            } else {
              commit(LOCAL_SOURCE, res)
            }
            return res
          case 1:
            // 时间排序
            res.sort((a, b) => { return a.createData < b.createData })
            if (type === 'Upan') {
              commit(UPAN_SOURCE, res)
            } else {
              commit(LOCAL_SOURCE, res)
            }
            return res
          case 2:
            // 类型排序
            let fondelArr = []
            let scoreArr = []
            let pdfArr = []
            let mp3Arr = []
            let videoArr = []
            let midiArr = []
            let imgArr = []
            let xmlArr = []
            res.map(data => {
              if (data.type === 'dir') {
                fondelArr.push(data)
              } else if (data.filesName) {
                scoreArr.push(data)
              } else {
                if (data.typeName === 'picture') {
                  imgArr.push(data)
                } else if (data.typeName === 'xml') {
                  xmlArr.push(data)
                } else if (data.typeName === 'mp3') {
                  mp3Arr.push(data)
                } else if (data.typeName === 'video') {
                  videoArr.push(data)
                } else if (data.typeName === 'midi') {
                  midiArr.push(data)
                } else if (data.typeName === 'pdf') {
                  pdfArr.push(data)
                }
              }
            })
            fondelArr.sort((a, b) => { return a.name > b.name })
            scoreArr.sort((a, b) => { return a.name > b.name })
            pdfArr.sort((a, b) => { return a.name > b.name })
            mp3Arr.sort((a, b) => { return a.name > b.name })
            videoArr.sort((a, b) => { return a.name > b.name })
            midiArr.sort((a, b) => { return a.name > b.name })
            xmlArr.sort((a, b) => { return a.name > b.name })
            imgArr.sort((a, b) => { return a.name > b.name })
            scoreArr = scoreArr.concat(fondelArr, pdfArr, mp3Arr, videoArr, midiArr, xmlArr, imgArr)
            if (type === 'Upan') {
              commit(UPAN_SOURCE, scoreArr)
            } else {
              commit(LOCAL_SOURCE, scoreArr)
            }
            return scoreArr
        }
      })
    },
    /**
     * @desc 我的录音选中index
     * */
    setMyRecordIndex ({commit}, num) {
      commit(MY_RECORD_INDEX, num)
    },
    /**
     * @desc 获取我的曲谱我的录音列表
     * */
    getMyRecord ({commit}, path) {
      file.readFolderFile(path).then((res) => {
        if (res.length === 0) {
          return commit(MY_RECORD, [])
        }
        // 第一步 剔除掉不支持的文件 并加上文件格式属性
        let deleteArr = []
        res.forEach((value, index) => {
          if (value.type === 'dir') {
            value.icon = 'icon-open-now'
          } else {
            let nameArr1 = value.name.split('.')
            let suffix = nameArr1[nameArr1.length - 1]
            if (suffix === 'mid') {
              value.icon = 'icon-midi'
            } else if (suffix === 'xml') {
              value.icon = 'icon-xml'
            }
          }
          if (!value.icon) {
            deleteArr.push(index)
          }
        })
        let deleArr = [...new Set(deleteArr)]
        deleArr.forEach((data, index) => {
          if (index === 0) {
            res.splice(data, 1)
          } else {
            res.splice(data - index, 1)
          }
        })
        // 第二步 合并多曲谱
        let deleteIndex = []
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          let name = nameArr[0]
          if (item.filesName) {
            name = item.name
          } else {
            if (nameArr.length > 2) {
              for (let i = 1; i <= nameArr.length - 2; i++) {
                name += '.' + nameArr[i]
              }
            }
          }
          let filesName = []
          res.forEach((item1, index1) => {
            if (item1.type !== 'dir') {
              let nameArr1 = item1.name.split('.')
              let name1 = nameArr1[0]
              if (item1.filesName) {
                name1 = item1.name
              } else {
                if (nameArr1.length > 2) {
                  for (let i = 1; i <= nameArr1.length - 2; i++) {
                    name1 += '.' + nameArr1[i]
                  }
                }
              }
              let suffix1 = nameArr1[nameArr1.length - 1]
              let acceptArr = ['mid', 'xml']
              // 文件类型是这几种才需要合成
              let canOne = false
              let canTwo = false
              if (name1 === name) {
                acceptArr.forEach((value) => {
                  if (value === suffix) {
                    canOne = true
                  }
                  if (value === suffix1) {
                    canTwo = true
                  }
                })
                if (item1.filesName && canOne) {
                  // 删除与合成文件名相同的文件
                  deleteIndex.push(index)
                } else {
                  if (canOne && canTwo) {
                    filesName.push(item1.name)
                  }
                }
              } else {
                // 以‘_sp’开头的 mid文件也需要合成
                if (name1.indexOf(name) !== -1 && name1.indexOf('_sp') !== -1 && suffix1 === 'mid') {
                  deleteIndex.push(index1)
                  filesName.push(item1.name)
                }
              }
            }
          })
          if (filesName.length > 1) {
            item.name = name
            item.filesName = filesName
            item.icon = 'icon-song'
          }
        })
        let delArr = [...new Set(deleteIndex)]
        delArr.forEach((data, index) => {
          if (index === 0) {
            res.splice(data, 1)
          } else {
            res.splice(data - index, 1)
          }
        })
        // let recordData = []
        // res.forEach((item, index) => {
        //   let nameArr = item.name.split('.')
        //   let suffix = nameArr[nameArr.length - 1]
        //   if (item.type === 'file' && suffix === 'mid') {
        //     item.icon = 'icon-midi'
        //     recordData.push(item)
        //   }
        // })
        // res.forEach((item, index) => {
        //   if (item.type === 'dir') {
        //     item.icon = 'icon-open-now'
        //     recordData.push(item)
        //   }
        // })
        commit(MY_RECORD, res)
      })
    },
    /**
     * @desc 我的弹奏选中index
     * */
    setMyPlayIndex ({commit}, num) {
      commit(MY_PLAY_INDEX, num)
    },
    /**
     * @desc 获取我的曲谱我的弹奏列表
     * */
    getMyPlay ({commit}, path) {
      file.readFolderFile(path).then((res) => {
        if (res.length === 0) {
          return commit(MY_PLAY, [])
        }
        let recordData = []
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          if (item.type === 'file' && suffix === 'mid') {
            item.icon = 'icon-midi'
            recordData.push(item)
          }
        })
        res.forEach((item, index) => {
          if (item.type === 'dir') {
            item.icon = 'icon-open-now'
            recordData.push(item)
          }
        })
        commit(MY_PLAY, recordData)
      })
    },
    /**
     * @desc 我的收藏选中index
     * */
    setMyCollectIndex ({commit}, num) {
      commit(MY_COLLECT_INDEX, num)
    },
    /**
     * @desc 最近打开选中index
     * */
    setRecentIndex ({commit}, num) {
      commit(MY_RECENT_INDEX, num)
    },
    /**
     * @desc bookInfo
     * */
    getBookInfo ({dispatch, commit} = {}, bookId) {
      console.log(bookId)
      return http.post('', {cmd: 'musicScore.getBookById', bookId}).then(({body, header}) => {
        if (!header.code) {
          if (body) {
            return dispatch('setCacheToStorage', {bookInfo: body, id: bookId}, {root: true})
          }
        }
      }).catch((error) => {
        return error
      })
    }
  }
}
