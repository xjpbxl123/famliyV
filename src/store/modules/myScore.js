import { file } from 'find-sdk'
import http from '../../scripts/http'
const MY_SCORE_TAP_INDEX = 'MY_SCORE_TAP_INDEX' /// 我的曲谱index
const LOCAL_SOURCE = 'LOCAL_SOURCE' /// 本地资源
const LOCAL_SOURCE_INDEX = 'LOCAL_SOURCE_INDEX' /// 本地资源index
const LOCAL_SOURCE_PATH = 'LOCAL_SOURCE_PATH' /// 本地资源路径
const MY_RECORD = 'MY_RECORD' /// 我的录音
const MY_RECORD_INDEX = 'MY_RECORD_INDEX' /// 我的录音index
const MY_PLAY = 'MY_PLAY' /// 我的弹奏
const MY_PLAY_INDEX = 'MY_PLAY_INDEX' /// 我的弹奏index
const MY_COLLECT_INDEX = 'MY_COLLECT_INDEX' /// 我的收藏index
const MY_RECENT_INDEX = 'MY_RECENT_INDEX' /// 我的最近打开index
export default {
  namespaced: true,
  state: {
    myScoreTapIndex: 0,
    localSource: [],
    localSourceIndex: 0,
    localSourcePath: '$userUpload',
    myRecord: [],
    myRecordIndex: 0,
    myPlay: [],
    myPlayIndex: 0,
    myCollectIndex: 0,
    myRecentIndex: 0
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
    [LOCAL_SOURCE_PATH] (state, path) {
      state.localSourcePath = path
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
     * @desc 获取我的曲谱本地资源列表
     * */
    getLocalSource ({commit}, path) {
      file.readFolderFile(path).then((res) => {
        console.log(path)
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          let name = nameArr[0]
          if (item.type === 'dir') {
            item.typeName = 'open-now'
          } else {
            if (suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg' || suffix === 'gif') {
              item.typeName = 'picture'
            } else if (suffix === 'mp3' || suffix === 'wav') {
              item.typeName = 'mp3'
            } else if (suffix === 'mid') {
              item.typeName = 'midi'
            } else if (suffix === 'xml') {
              item.typeName = 'xml'
            } else if (suffix === 'pdf') {
              item.typeName = 'pdf'
            }
          }
          let filesName = []
          res.forEach((item1, index) => {
            let nameArr1 = item1.name.split('.')
            let name1 = nameArr1[0]
            let suffix1 = nameArr1[nameArr1.length - 1]
            if ((name1.indexOf(name) !== -1 && name1.indexOf('_sp') !== -1 && suffix1 === 'mid') || name1 === name) {
              filesName.push(item1.name)
            }
          })
          if (filesName.length > 1) {
            item.name = name
            item.filesName = filesName
            item.typeName = 'song'
          }
        })
        let newArr = []
        res.forEach((item, index) => {
          let flag = true
          let nameArr2 = item.name.split('.')
          let name2 = nameArr2[0]
          newArr.forEach((item1, index) => {
            let nameArr3 = item1.name.split('.')
            let name3 = nameArr3[0]
            if (item1.name === item.name || (name2.indexOf(name3) !== -1 && name2.indexOf('_sp') !== -1)) {
              flag = false
            }
          })
          if (flag) {
            newArr.push(item)
          }
        })
        let filteredArr = []
        newArr.forEach((item, index) => {
          if (item.type === 'dir' && item.typeName) {
            filteredArr.push(item)
          }
        })
        newArr.forEach((item, index) => {
          if (item.type === 'file' && item.typeName) {
            filteredArr.push(item)
          }
        })
        console.log(filteredArr)
        commit(LOCAL_SOURCE, filteredArr)
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
    getMyRecord ({commit}) {
      file.readFolderFile('$userRecord').then((res) => {
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          console.log(suffix)
          if (suffix !== 'mid') {
            res.splice(index, 1)
          }
        })
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
    getMyPlay ({commit}) {
      file.readFolderFile('$userHistory').then((res) => {
        res.forEach((item, index) => {
          let nameArr = item.name.split('.')
          let suffix = nameArr[nameArr.length - 1]
          console.log(suffix)
          if (suffix !== 'mid') {
            res.splice(index, 1)
          }
        })
        commit(MY_PLAY, res)
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
      http.post('', {cmd: 'musicScore.getBookById', bookId}).then(({body, header}) => {
        if (!header.code) {
          return body && dispatch('setCacheToStorage', {bookInfo: body, id: bookId}, {root: true})
        }
      })
    }
  }
}