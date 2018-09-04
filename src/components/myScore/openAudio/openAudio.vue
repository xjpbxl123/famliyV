<template>
  <div class="openAudio">
    <statusBar/>
    <video src="audioUrl" class="audio"></video>
    <div class="audioBox">
        <div class="audioMenu">
            <span class="audioName" v-text="name"></span>
            <div class="time"><span class="currentTime" v-text="currentTime"></span> / <span classs="totalTime" v-text="totalTime"></span></div>
            <div class="audioMess">
              <div>文件名：<span class="fileName"></span></div>
            </div>
        </div>
    </div>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button) in controlButtons"
            :id="button.id"
            :key="button.id"
            :icon="button.icon"
            :pianoKey="button.pianoKey"
            :longClick="button.longClick"
            :style="{backgroundColor:'#3000',dotColor: '#fff'}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED } from 'vue-find'
  import statusBar from '../../common/find-status-bar/find-status-bar'
  export default {
    data () {
      return {
        audioUrl: '',
        toolbarHidden: false,
        name: '汤姆家的猫',
        controlButtons: [
          {
            pianoKey: 73,
            icon: '0xe627',
            id: 200
          },
          {
            pianoKey: 75,
            icon: '0xe680',
            id: 201
          },
          {
            pianoKey: 78,
            icon: '0xe626',
            id: 202
          },
          {
            pianoKey: 80,
            icon: '0xe681',
            id: 203
          }, {
            pianoKey: 82,
            icon: '0xe60d',
            id: 204
        }],
        currentTime: '00:00',
        totalTime: '00:00'
      }
    },
    find: {
      [KEY73] () {
        this.buttonActions('fastBackward')
      },
      [KEY75] () {
        this.buttonActions('playOrPause')
      },
      [KEY78] () {
        this.buttonActions('fastForward')
      },
      [KEY80] () {
        this.buttonActions('restart')
      },
      [KEY82] () {
        this.buttonActions('mixer')
      },
      [BACK_PRESSED] () {
        this.$router.back()
      }
    },
    methods: {
    },
    created () {
    },
    components: {
      statusBar
    }
  }
</script>
<style lang="scss" scoped>
    .openAudio {
        width: 100%;
        height: 100%;
        position: relative;
        .audioBox {
            width: 1200px;
            height: 600px;
            position: absolute;
            top: 241px;
            left: 605px;
            background:rgba(0,0,0,0.2);
            border-radius:10px;
            padding: 0 100px;
            .audioName {
              font-size:48px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color: #fff;
              display: block;
              margin-top: 49px;
            }
            .time {
              font-size:20px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#fff;
              margin-top: 17px;
            }
        }
    }
</style>
