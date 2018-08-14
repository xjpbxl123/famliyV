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
          let data = []
          if (res.body.length === 5) {
            data = [{
              coverSmall: require('../../components/popular/images/img_lv1.png'),
              desc: '欢迎来到一星关卡，尝试着征服它们吧！本次难度包含',
              tap: '全音符／二分音符／四分音符／八分音符',
              skills: '单手演奏（含双手）／抬指（独立性）／少许手位移动／识谱 ',
              starNum: 1,
              id: res.body[0].id
            }, {
              coverSmall: require('../../components/popular/images/img_lv2.png'),
              desc: '迈入二星的道路，钢琴之旅正式开始， 祝你成功！本次难度包含',
              tap: '附点／前八后十六／十六分音符／大小切分',
              skills: '双手交替演奏／音程／跨度／手位／指法／转指／识谱',
              starNum: 2,
              id: res.body[1].id
            }, {
              coverSmall: require('../../components/popular/images/img_lv3.png'),
              desc: '三星的关卡就考验你的成果，准备好了吗？',
              tap: '切分音／三连音／4&8音符复合节奏',
              skills: '连贯演奏／钢琴踏板／琶音／八度音程',
              starNum: 3,
              id: res.body[2].id
            }, {
              coverSmall: require('../../components/popular/images/img_lv4.png'),
              desc: '想好来四星了吗？来征服高级技巧吧！',
              tap: '多连音／32分音符／8&16音符复合节奏',
              skills: '大跨度把位／多音程/转调/装饰音技巧',
              starNum: 4,
              id: res.body[3].id
            }, {
              coverSmall: require('../../components/popular/images/img_lv5.png'),
              desc: '暴风雨前的宁静！',
              tap: '16&32音符复合节奏/不平均双手对位/',
              skills: '双手演奏时不平均/多声部演奏（复调）/转调',
              starNum: 5,
              id: res.body[4].id
            }]
          }
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
        let data = []
        if (res.body.length > 1) {
          data = [
            {
              name: res.body[0].name,
              coverSmall: require('../../components/popular/images/img_70y.png'),
              id: res.body[0].id
            },
            {
              name: res.body[1].name,
              coverSmall: require('../../components/popular/images/img_80y.png'),
              id: res.body[1].id
            },
            {
              name: res.body[2].name,
              coverSmall: require('../../components/popular/images/img_90y.png'),
              id: res.body[2].id
            },
            {
              name: res.body[3].name,
              coverSmall: require('../../components/popular/images/img_00hou.png'),
              id: res.body[3].id
            }
          ]
        }
        return dispatch('setCacheToStorage', {yearList: data}, {root: true})
      })
    }
  }
}
