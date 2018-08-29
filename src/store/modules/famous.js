/**
 * Created by Tommy on 2018/5/18 .
 * */
import http from 'scripts/http'
import { download } from 'find-sdk'
const FAMOUS_BOOK_SELECT = 'FAMOUS_BOOK_SELECT'
const FAMOUS_SET_SELECT = 'FAMOUS_SET_SELECT'
let defaultData = {'page': {'offset': 0, 'count': 1800}}
export default {
  namespaced: true,
  state: {
    famousBookSelect: 0,
    famousSetSelect: 0
  },
  mutations: {
    [FAMOUS_BOOK_SELECT] (state, index) {
      state.famousBookSelect = index
    },
    [FAMOUS_SET_SELECT] (state, index) {
      state.famousSetSelect = index
    }
  },
  actions: {
    setFamousBookSelect ({commit}, num) {
      commit(FAMOUS_BOOK_SELECT, num)
    },
    setFamousSetSelect ({commit}, num) {
      commit(FAMOUS_SET_SELECT, num)
    },
    getAllArtistsToFamily ({dispatch}) {
      return http.post('', {
        ...defaultData,
        cmd: 'artist.getAllArtistsToFamily'
      }).then(({body}) => {
        if (body) {
          return dispatch('setCacheToStorage', {allArtists: body}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    },
    getCourseSetByArtistToFamily ({dispatch}, data) {
      return http.post('', {
        ...defaultData,
        ...data,
        cmd: 'artist.getCourseSetByArtistToFamily'
      }).then(({body}) => {
        if (body) {
          dispatch('setCacheToStorage', {famousAuthor: body, id: data.artistId}, {root: true})
        }
      }).catch((error) => {
        return error
      })
    },
    getCoursesBySet ({dispatch}, {courseSetID}) {
      return http.post('', {
        cmd: 'artist.getCoursesBySet',
        'courseSetId': courseSetID - 0,
        ...defaultData
      }).then((data) => {
        if (!data.header.code) {
          let courseSetData = data.body.courseList
          courseSetData.map((value) => {
            if (value.courseId) {
              value.data.midiHighBitRate.localPath = value.data.videoHighBitRate.localPath = '$artistCache/' + value.courseId
            }
          })
          return dispatch('videoHasDownload', {body: data.body, courseSetID})
        } else {
          return data
        }
      }).catch((error) => {
        return error
      })
    },
    /**
     * @desc 判断视频是否有下载
     * @param dispatch
     * @param body
     * @param courseSetID
     * @returns {Promise<any[]>}
     */
    videoHasDownload ({dispatch}, {body, courseSetID}) {
      let midiHighBitRateArr = []
      let videoHighBitRateArr = []
      let midPromise
      let videoPromise
      let newBody = JSON.parse(JSON.stringify(body))
      newBody.courseList.forEach((item) => {
        midiHighBitRateArr.push(item.data.midiHighBitRate)
        videoHighBitRateArr.push(item.data.videoHighBitRate)
      })
      midPromise = download.fileIsExistsAll(midiHighBitRateArr).then((data) => {
        return newBody.courseList.map((item, index) => {
          item.midiDownload = data[index]
        })
      })
      videoPromise = download.fileIsExistsAll(videoHighBitRateArr).then((data) => {
        return newBody.courseList.map((item, index) => {
          item.videoDownload = data[index]
        })
      })
      return Promise.all([midPromise, videoPromise]).then(() => {
        return dispatch('setCacheToStorage', {famousPlayCoursesBySet: newBody, id: courseSetID}, {root: true})
      })
    }
  }
}
