<template>
  <div class='shutdown'>
    <!-- <h1>关机界面</h1> -->
    <statusBar/>
    <div class="btnsbg"></div>
    <toolbar :darkBgHidden="true">
      <icon-item v-for="(button,index) in controlButtons"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            v-if="button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type='text/javascript'>
  import { global } from 'find-sdk'
  import { KEY75, KEY78, KEY80, KEY82, KEY85, KEY87 } from 'vue-find'
  import statusBar from '../common/find-status-bar/find-status-bar'
  export default {
    data () {
      return {
        controlButtons: [
          // {
          //   pianoKey: 75,
          //   text: '退出App',
          //   icon: '0xe6ac',
          //   id: 1,
          //   backgroundColor: '#555',
          //   show: true
          // },
          {
            pianoKey: 78,
            text: '取消',
            icon: '0xe60a',
            id: 2,
            backgroundColor: '#555',
            show: true
          },
          {
            pianoKey: 80,
            text: '关机',
            icon: '0xe609',
            id: 3,
            backgroundColor: '#555',
            show: true
          },
          {
            pianoKey: 82,
            text: '重启',
            icon: '0xe66f',
            id: 4,
            backgroundColor: '#555',
            show: true
          },
          {
            pianoKey: 85,
            text: '休眠',
            icon: '0xe6e1',
            id: 5,
            backgroundColor: '#555',
            show: true
          },
          {
            pianoKey: 87,
            text: '重启App',
            icon: '0xe66e',
            id: 6,
            backgroundColor: '#555',
            show: true
          }
          // {
          //   pianoKey: 90,
          //   text: '更新App',
          //   icon: '0xe60c',
          //   id: 7,
          //   backgroundColor: '#555',
          //   show: true
          // }
        ]
      }
    },
    find: {
      [KEY75] () {
        console.log('KEY75---', +new Date())
        this.buttonAction('exitApp')
      },
      [KEY78] () {
        console.log('KEY78---', +new Date())
        this.buttonAction('cancel')
      },
      [KEY80] () {
        console.log('KEY80---', +new Date())
        this.buttonAction('shutdown')
      },
      [KEY82] () {
        console.log('KEY82---', +new Date())
        this.buttonAction('restart')
      },
      [KEY85] () {
        console.log('KEY85---', +new Date())
        this.buttonAction('sleep')
      },
      [KEY87] () {
        console.log('KEY87---', +new Date())
        this.buttonAction('restartApp')
      }
      // [KEY90] () {
      //   this.buttonAction('updateApp')
      // }
    },
    computed: {},
    methods: {
      go (params) {
        switch (params) {
          case 'back':
            this.$router.back()
            break
          default:
            this.$router.push(params)
            break
        }
      },
      buttonAction (type) {
        switch (type) {
          case 'exitApp':
            break
          case 'cancel':
            this.go('back')
            break
          case 'shutdown':
            global.powerOFF()
            break
          case 'restart':
            global.reboot()
            break
          case 'sleep':
            global.sleep()
            break
          case 'restartApp':
            global.relaunchApp()
            break
          case 'updateApp':
            this.go('/softwareUpdate')
            break
          default:
            break
        }
      }
    },
    created () {},
    components: {
      statusBar
    }
  }
</script>
<style lang='scss' scoped>
.shutdown {
  color: #fff;
  h1 {
    font-size: 100px;
  }
  .btnsbg {
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    bottom: 0;
  }
}
</style>
