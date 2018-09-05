<template>
  <div>
    <statusBar />
    <find-wrap title="教材系列" :activePage="materialPage" :sumPage="materialList.sumPage" :pagination="pagination">
      <find-ablum-card v-for="(item,index) in materialList.body" class="find-ablum-card"
        :key="index"
        :setSelect="setSelect"
        :index="index" :select="materialSelect" :ablum="item"
        :class="{maxMargin:(index+1)%2===0}"></find-ablum-card>
    </find-wrap>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
      <icon-item v-for="button in materialButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 :id="button.id"
                 :icon="button.icon"
                 :longClick="button.longClick"
                 :style="{backgroundColor:button.backgroundColor,color: '#fff',dotColor: button.dotColor}"/>
    </toolbar>

  </div>

</template>
<style lang="scss" scoped type=text/scss>
  .find-ablum-card {
    margin-right: 30px;
    float: left;
    margin-bottom: 30px;
    &.maxMargin {
      margin-right: 90px;
    }
  }
</style>
<script type="es6">
  import { mapState, mapGetters } from 'vuex'
  import findWrap from 'components/common/find-wrap/find-wrap'
  import findAblumCard from 'components/common/find-ablum-card/find-ablum-card'
  import statusBar from '../common/find-status-bar/find-status-bar'
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../scripts/utils'
  import {
    KEY75,
    KEY78,
    KEY73,
    KEY80,
    KEY82,
    LONG_KEY73,
    LONG_KEY75,
    LONG_KEY78,
    LONG_KEY80,
    BACK_PRESSED,
    PEDAL_PRESSED
  } from 'vue-find'
  export default {
    name: 'material',
    data () {
      return {
        materialPage: 1,
        pagination: true,
        toolbarHidden: false,
        materialButton: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe660',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 201,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 202,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 203,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 14,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 204
          }
        ]
      }
    },
    find: {
      [KEY73] () {
        this.buttonActions('left')
      },
      [KEY75] () {
        this.buttonActions('right')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [LONG_KEY73] () {
        this.buttonActions('left')
      },
      [LONG_KEY75] () {
        this.buttonActions('right')
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [BACK_PRESSED] () {
        this.buttonActions('back')
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键
            return this.buttonActions('left')
          case 117:
            // 踏板2号键
            return this.buttonActions('right')
          case 118:
            this.buttonActions('ok')
            break
          case 119:
            this.buttonActions('back')
        }
      }
    },
    methods: {
      buttonActions (type) {
        let activeIndex = this.materialSelect
        if (this.materialList.body.length === 0 && type !== 'back') {
          return
        }
        let materialLen = this.materialList.body.length - 1
        switch (type) {
          case 'right':
            materialLen > activeIndex && activeIndex++
            break
          case 'left':
            activeIndex > 0 && activeIndex--
            break
          case 'down':
            if (materialLen >= activeIndex + 4) {
              activeIndex += 4
            } else {
              activeIndex = materialLen
            }
            break
          case 'up':
            if (activeIndex - 4 >= 0) {
              activeIndex -= 4
            } else {
              activeIndex = 0
            }
            break
          case 'ok':
            return this.$router.push({path: '/scoreSetList', query: {setId: this.materialList.body[activeIndex].id, setName: this.materialList.body[activeIndex].name}})
          case 'back':
            this.$router.back(-1)
            return setTimeout(() => {
              this.$store.dispatch('delSelect', 'materialSelect', {root: true})
            }, 200)
        }
        this.$store.dispatch('setSelect', {materialSelect: activeIndex}, {root: true})
      },
      setSelect (index) {
        this.$store.dispatch('setSelect', {materialSelect: index}, {root: true}).then(() => {
          this.buttonActions('ok')
        })
      }
    },
    watch: {
      materialSelect (val, oldVal) {
        this.materialPage = Math.ceil((val + 1) / 8)
      }
    },
    created () {
      this.$store.dispatch('material/getAllBookSets').then((data) => {
        if (this.hasLoaded || (data && data.materialList)) {
          // 有缓存
          eventsHub.$emit('closeToast')
        } else {
          errorHandling(data)
        }
      })
      this.materialPage = Math.ceil((this.materialSelect + 1) / 8)
    },
    mounted () {
      eventsHub.$emit('toast')
    },
    beforeDestroy () {
      eventsHub.$emit('closeToast')
    },
    components: {
      findWrap,
      findAblumCard,
      statusBar
    },
    computed: {
      ...mapState({
        materialSelect: (state) => {
          return state.materialSelect
        },
        materialList: function (state) {
          let materialList = state.storage.cache.renderCache.materialList
          if (materialList.body.length > 0) {
            eventsHub.$emit('closeToast')
          }
          this.hasLoaded = !!materialList.body.length
          return materialList
        }
      }),
      ...mapGetters([])
    }
  }
</script>
