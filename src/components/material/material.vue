<template>
  <div>
    <find-wrap title="教材系列" :activePage="materialPage" :sumPage="materialList.sumPage" :pagination="pagination">
      <find-ablum-card v-for="(item,index) in materialList.body" class="find-ablum-card" :key="index"
                       :index="index" :select="materialSelect" :ablum="item"
                       :class="{maxMargin:(index+1)%2===0}"></find-ablum-card>
    </find-wrap>
    <toolbar>
      <icon-item v-for="button in materialButton"
                 :pianoKey="button.pianoKey"
                 :key="button.icon"
                 longClick="true"
                 :id="button.id"
                 :icon="button.icon"/>
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
  import {
    KEY75,
    KEY78,
    KEY73,
    KEY80,
    KEY82,
    KEY108
  } from 'vue-find'

  export default {
    name: 'material',
    data () {
      return {
        materialPage: 1,
        pagination: true,
        materialButton: [
          {
            pianoKey: 73,
            icon: '0xe660',
            id: 201
          },
          {
            pianoKey: 75,
            icon: '0xe65b',
            id: 202
          },
          {
            pianoKey: 78,
            icon: '0xe63b',
            id: 203
          },
          {
            pianoKey: 80,
            icon: '0xe650',
            id: 204
          },
          {
            pianoKey: 82,
            icon: '0xe69a',
            id: 205
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
      [KEY82] () {
        this.buttonActions('ok')
      },
      [KEY108] () {
        this.buttonActions('back')
      }
    },
    methods: {
      buttonActions (type) {
        let activeIndex = this.materialSelect
        let materialLen = this.materialList.body.length - 1
        switch (type) {
          case 'right':
            materialLen > activeIndex && activeIndex++
            break
          case 'left':
            activeIndex > 0 && activeIndex--
            break
          case 'down':
            if (materialLen >= activeIndex + 4) activeIndex += 4
            break
          case 'up':
            if (activeIndex - 4 >= 0) activeIndex -= 4
            break
          case 'ok':
            return this.$router.push({path: '/scoreSetList', query: {setId: this.materialList.body[activeIndex].id}})
          case 'back':
            this.$router.back(-1)
            return setTimeout(() => {
              this.$store.dispatch('delSelect', 'materialSelect', {root: true})
            }, 200)
        }
        this.$store.dispatch('setSelect', {materialSelect: activeIndex}, {root: true})
      }
    },
    watch: {
      materialSelect (val, oldVal) {
        this.materialPage = Math.ceil((val + 1) / 8)
      }
    },
    beforeCreate () {
      this.$store.dispatch('material/getAllBookSets')
    },
    components: {
      findWrap,
      findAblumCard
    },
    computed: {
      ...mapState({
        materialSelect: (state) => {
          return state.materialSelect
        }
      }),
      ...mapGetters(['materialList'])
    }
  }
</script>
