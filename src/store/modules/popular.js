// import http from '../../scripts/http'
const POPULAY_INDEX = 'POPULAR_INDEX' /// 流行经典选中index
const POPULAY_TAP_TYPE = 'POPULAY_TAP_TYPE' /// 流行经典选中index
export default {
  namespaced: true,
  state: {
    popularIndex: 0,
    popularTapIndex: 2
  },
  mutations: {
    [POPULAY_INDEX] (state, index) {
      state.popularIndex = index
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
      // return http.post('', {
      //   cmd: 'musicScore.getLevels',
      //   page,
      //   tagId
      // }).then(res => {
      //   if (res.header.code === 0) {
      //     debugger
      //     dispatch('setCacheToStorage', {differList: res.body}, {root: true})
      //   } else if (res.header.code === 5) {
      //     dispatch('setCacheToStorage', {differList: []}, {root: true})
      //   }
      // })
      let data = [{
        coverSmall: require('../../components/popular/images/pic_01.png'),
        sleCoverSmall: require('../../components/popular/images/pic_01_sle.png'),
        differC: '全音符/lala/idnex/idf、idnex、的九分裤来得及发动机首付款见识到了房间里的',
        skills: '单手演奏/hehidf、idnex、的九分裤来得及发动机首付款见识到了房间里的heh',
        starNum: 1
      }, {
        coverSmall: require('../../components/popular/images/pic_02.png'),
        sleCoverSmall: require('../../components/popular/images/pic_02_sle.png'),
        differC: '全音符/lala/idnex/idfidf、idnex、的九分裤来得及发动机首付款见识到了房间里的',
        skills: '单手演奏/heidf、idnex、的九分裤来得及发动机首付款见识到了房间里的hheh',
        starNum: 2
      }, {
        coverSmall: require('../../components/popular/images/pic_03.png'),
        sleCoverSmall: require('../../components/popular/images/pic_03_sle.png'),
        differC: '全音符/lala/idneidf、idnex、的九分裤来得及发动机首付款见识到了房间里的x/idf',
        skills: '单手演奏/hehidf、idnex、的九分裤来得及发动机首付款见识到了房间里的heh',
        starNum: 3
      }, {
        coverSmall: require('../../components/popular/images/pic_04.png'),
        sleCoverSmall: require('../../components/popular/images/pic_04_sle.png'),
        differC: '全音符/lala/idneidf、idnex、的九分裤来得及发动机首付款见识到了房间里的x/idf',
        skills: '单手演奏/hehheidf、idnex、的九分裤来得及发动机首付款见识到了房间里的h',
        starNum: 4
      }, {
        coverSmall: require('../../components/popular/images/pic_05.png'),
        sleCoverSmall: require('../../components/popular/images/pic_05_sle.png'),
        differC: '全音符/lala/idnex/idf',
        skills: '单手演奏/hehheh',
        starNum: 5
      }]
      dispatch('setCacheToStorage', {differList: data}, {root: true})
    }
  }
}
