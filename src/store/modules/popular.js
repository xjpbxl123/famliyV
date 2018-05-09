// import http from '../../scripts/http'
import http from '../../scripts/http'

const POPULAY_INDEX = 'POPULAR_INDEX' /// 流行经典选中index
const YEAR_INDEX = 'YEAR_INDEX' /// 年代选中index
const POPULAY_TAP_TYPE = 'POPULAY_TAP_TYPE' /// 流行经典选中index

export default {
  namespaced: true,
  state: {
    popularIndex: 0,
    yearIndex: 0,
    popularTapIndex: 2
  },
  getters: {},
  mutations: {
    [POPULAY_INDEX] (state, index) {
      state.popularIndex = index
    },
    [YEAR_INDEX] (state, index) {
      state.yearIndex = index
    },
    [POPULAY_TAP_TYPE] (state, num) {
      state.popularTapIndex = num
    }
  },
  actions: {
    /**
     * @desc 流行经典选中index
     * */
    setPopularSelected ({commit}, num) {
      commit(POPULAY_INDEX, num)
    },
    setYearSelected ({commit}, num) {
      commit(YEAR_INDEX, num)
    },
    /**
     * @desc 流行经典选中tapIndex
     * */
    setPopularTapSelected ({commit}, num) {
      commit(POPULAY_TAP_TYPE, num)
    },
    /**
     * @desc 获取难度列表
     * */
    getDiffer ({dispatch, commit}, {tagId = 1, page = {'offset': 0, 'count': 100}} = {}) {
      return http.post('', {
        cmd: 'musicScore.getLevels',
        page,
        tagId
      }).then(res => {
        if (res.header.code === 0) {
          let data = [{
            coverSmall: require('../../components/popular/images/pic_01.png'),
            sleCoverSmall: require('../../components/popular/images/pic_01_sle.png'),
            differC: res.body[0].desc,
            skills: res.body[0].desc,
            starNum: 1
          }, {
            coverSmall: require('../../components/popular/images/pic_02.png'),
            sleCoverSmall: require('../../components/popular/images/pic_02_sle.png'),
            differC: res.body[1].desc,
            skills: res.body[1].desc,
            starNum: 2
          }, {
            coverSmall: require('../../components/popular/images/pic_03.png'),
            sleCoverSmall: require('../../components/popular/images/pic_03_sle.png'),
            differC: res.body[2].desc,
            skills: res.body[2].desc,
            starNum: 3
          }, {
            coverSmall: require('../../components/popular/images/pic_04.png'),
            sleCoverSmall: require('../../components/popular/images/pic_04_sle.png'),
            differC: res.body[3].desc,
            skills: res.body[3].desc,
            starNum: 4
          }, {
            coverSmall: require('../../components/popular/images/pic_05.png'),
            sleCoverSmall: require('../../components/popular/images/pic_05_sle.png'),
            differC: res.body[4].desc,
            skills: res.body[4].desc,
            starNum: 5
          }]
          dispatch('setCacheToStorage', {differList: data}, {root: true})
        }
      })
    },
    getStyles ({dispatch}, page = {'offset': 0, 'count': 100}) {
      return http.post('', {
        cmd: 'musicScore.getStyles',
        page
      }).then(({header, body}) => {
        if (!header.code) {
          if (body.length > 8) {
            body = body.slice(0, 8)
          }
          return dispatch('setCacheToStorage', {popularGenre: body}, {root: true})
        }
      })
    },
    getCenturys ({dispatch, commit}) {
      http.post('', {
        cmd: 'musicScore.getCenturys',
        page: {
          offset: 0,
          count: 100
        }
      }).then((res) => {
        console.log(res)
      })
      let data = [
        {
          name: '1970年代',
          coverSmall: require('../../components/popular/images/pic_1970.png'),
          sleCoverSmall: require('../../components/popular/images/pic_1970_sle.png')
        },
        {
          name: '1980年代',
          coverSmall: require('../../components/popular/images/pic_1980.png'),
          sleCoverSmall: require('../../components/popular/images/pic_1980_sle.png')
        },
        {
          name: '1990年代',
          coverSmall: require('../../components/popular/images/pic_1990.png'),
          sleCoverSmall: require('../../components/popular/images/pic_1990_sle.png')
        },
        {
          name: '2000~2010年代',
          coverSmall: require('../../components/popular/images/pic_2000.png'),
          sleCoverSmall: require('../../components/popular/images/pic_2000_sle.png')
        }
      ]
      return dispatch('setCacheToStorage', {yearList: data}, {root: true})
    }
  }
}
