import { file } from 'find-sdk'
import http from '../../scripts/http'
const MY_SCORE_TAP_INDEX = 'MY_SCORE_TAP_INDEX' /// 我的曲谱index
const LOCAL_SOURCE = 'LOCAL_SOURCE' /// 本地资源
const LOCAL_SOURCE_INDEX = 'LOCAL_SOURCE_INDEX' /// 本地资源index
const LOCAL_SOURCE_PATH = 'LOCAL_SOURCE_PATH' /// 本地资源路径
const MY_RECORD = 'MY_RECORD' /// 我的录音
const MY_RECORD_INDEX = 'MY_RECORD_INDEX' /// 我的录音index
const MY_RECORD_PATH = 'MY_RECORD_PATH' // 我的录音路径
const MY_PLAY = 'MY_PLAY' /// 我的弹奏
const MY_PLAY_INDEX = 'MY_PLAY_INDEX' /// 我的弹奏index
const MY_PLAY_PATH = 'MY_PLAY_PATH' // 我的录音路径
const MY_COLLECT_INDEX = 'MY_COLLECT_INDEX' /// 我的收藏index
const MY_RECENT_INDEX = 'MY_RECENT_INDEX' /// 我的最近打开index
const ORDER_INDEX = 'ORDER_INDEX' /// 文件排序index

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
    myPlayPath: '$userHistory'
  },
  mutations: {
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
     * @desc 文件排序
     * */
    setOrderIndex ({commit}, num) {
      commit(ORDER_INDEX, num)
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
     * @desc 获取我的曲谱本地资源列表
     * */
    getLocalSource ({commit, state}, path) {
      file.readFolderFile(path).then((res) => {
        let deleteIndex = []
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          let name = nameArr[0]
          if (nameArr.length > 2) {
            for (let i = 1; i <= nameArr.length - 2; i++) {
              name += '.' + nameArr[i]
            }
          }
          if (item.type === 'dir') {
            item.typeName = 'open-now'
          } else {
            if (suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg' || suffix === 'gif' || suffix === 'bmp') {
              item.typeName = 'picture'
            } else
              if (suffix === 'mp3' || suffix === 'wav' || suffix === 'wma') {
                item.typeName = 'mp3'
              } else if (suffix === 'mid') {
                item.typeName = 'midi'
              } else if (suffix === 'xml') {
                item.typeName = 'xml'
              } else if (suffix === 'pdf') {
                item.typeName = 'pdf'
              } else if (suffix === 'mp4' || suffix === 'avi' || suffix === 'mov') {
                item.typeName = 'video'
              }
          }
          let filesName = []
          res.forEach((item1, index1) => {
            let nameArr1 = item1.name.split('.')
            let name1 = nameArr1[0]
            if (nameArr1.length > 2) {
              for (let i = 1; i <= nameArr1.length - 2; i++) {
                name1 += '.' + nameArr1[i]
              }
            }
            let suffix1 = nameArr1[nameArr1.length - 1]
            if (name1 === name) {
              filesName.push(item1.name)
            } else {
              if (name1.indexOf(name) !== -1 && name1.indexOf('_sp') !== -1 && suffix1 === 'mid') {
                deleteIndex.push(index1)
                filesName.push(item1.name)
              }
              if (name1.indexOf(name) !== -1 && name1.indexOf('_video_4k') !== -1 && suffix1 === 'mp4') {
                filesName.push(item1.name)
                deleteIndex.push(index1)
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
        let newArr = []
        res.forEach(item => {
          let flag = true
          let nameArr2 = item.name.split('.')
          let name2 = nameArr2[0]
          if (item.filesName) {
            name2 = item.name
          } else {
            if (nameArr2.length > 2) {
              for (let i = 1; i <= nameArr2.length - 2; i++) {
                name2 += '.' + nameArr2[i]
              }
            }
          }
          newArr.forEach((item1, index) => {
            let nameArr3 = item1.name.split('.')
            let name3 = nameArr3[0]
            if (item1.filesName) {
              name3 = item1.name
            } else {
              if (nameArr3.length > 2) {
                for (let i = 1; i <= nameArr3.length - 2; i++) {
                  name3 += '.' + nameArr3[i]
                }
              }
            }
            if (name2 === name3 || (name2.indexOf(name3) !== -1 && name2.indexOf('_sp') !== -1)) {
              flag = false
            }
          })
          if (flag) {
            newArr.push(item)
          }
        })
        let filteredArr = []
        newArr.forEach(item => {
          if (item.type === 'dir' && item.typeName) {
            filteredArr.push(item)
          }
        })
        newArr.forEach(item => {
          if (item.type === 'file' && item.typeName) {
            filteredArr.push(item)
          }
        })
        console.log(newArr)
        switch (state.orderIndex) {
          case 0:
            // 名称排序
            filteredArr.sort((a, b) => { return a.name > b.name })
            commit(LOCAL_SOURCE, filteredArr)
            break
          case 1:
            // 时间排序
            filteredArr.sort((a, b) => { return a.createData < b.createData })
            commit(LOCAL_SOURCE, filteredArr)
            break
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
            filteredArr.map(data => {
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
            commit(LOCAL_SOURCE, scoreArr)
            break
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
        commit(MY_RECORD, recordData)
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
