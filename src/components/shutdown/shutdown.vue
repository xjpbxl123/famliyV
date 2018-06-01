<template>
  <div class='shutdown'>
    <!-- <h1>关机界面</h1> -->
    <div class="btnsbg"></div>
    <toolbar>
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
  import { KEY75, KEY78, KEY80, KEY82, KEY85, KEY87, KEY90 } from 'vue-find'
  export default {
    data () {
      return {
        controlButtons: [
          {
            pianoKey: 75,
            text: '退出App',
            icon: '0xe6ac',
            id: 1,
            backgroundColor: '#555',
            show: true
          },
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
          },
          {
            pianoKey: 90,
            text: '更新App',
            icon: '0xe60c',
            id: 7,
            backgroundColor: '#555',
            show: true
          }
        ]
      }
    },
    find: {
      [KEY75] () {
        this.buttonAction('exitApp')
      },
      [KEY78] () {
        this.buttonAction('cancel')
      },
      [KEY80] () {
        this.buttonAction('shutdown')
      },
      [KEY82] () {
        this.buttonAction('restart')
      },
      [KEY85] () {
        this.buttonAction('sleep')
      },
      [KEY87] () {
        this.buttonAction('restartApp')
      },
      [KEY90] () {
        this.buttonAction('updateApp')
      }
    },
    computed: {},
    methods: {
      go (params) {
        this.$router.push(params)
      },
      buttonAction (type) {
        switch (type) {
          case 'exitApp':
            break
          case 'cancel':

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
    components: {}
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
