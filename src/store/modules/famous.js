import http from 'scripts/http'

let defaultData = {'page': {'offset': 0, 'count': 1800}}
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getAllArtistsToFamily ({dispatch}) {
      return http.post('', {
        ...defaultData,
        cmd: 'artist.getAllArtistsToFamily'
      }).then(({body}) => {
        body && dispatch('setCacheToStorage', {allArtists: body}, {root: true})
      })
    },
    getCourseSetByArtistToFamily ({dispatch}, data) {
      return http.post('', {
        ...defaultData,
        ...data,
        cmd: 'artist.getCourseSetByArtistToFamily'
      }).then(({body}) => {
        body && dispatch('setCacheToStorage', {famousAuthor: body, id: data.artistId}, {root: true})
      })
    },
    getCoursesBySet ({dispatch}, {courseSetID}) {
      return http.post('', {
        cmd: 'artist.getCoursesBySet',
        'courseSetId': courseSetID - 0,
        ...defaultData
      }).then((data) => {
        if (!data.header.code) {
          return dispatch('setCacheToStorage', {famousPlayCoursesBySet: data.body, id: courseSetID}, {root: true})
        }
      })
    }
  }
}
