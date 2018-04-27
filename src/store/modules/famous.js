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
        body && dispatch('setCacheToStorage', {famousAuthor: body}, {root: true})
      })
    }
  }
}
