<template>
  <div class="VideolDirectory">
    <div class="VideolDirectory-header">
      <div class="video-img">
        <image class="video-img-header" style="width:40px;height:30px" :src="logo" />
      </div>
      <text class="video-text fwhite" >曲谱列表</text>
      <text class="video-mun fwhite">{{`共${videoList.sum || 0}个`}}</text>
    </div>
    <div class="contentBox">
      <scroller class="video-list">
          <div class="video-cell" v-for="(item, index) in videoList.courseList" :ref="'item'+index" :key="index"  :style="index==select && styleObject">
            <div class="video-cell-image">
              <div class="video-cell-image-pic">
                <image :src="linkImg" style="height: 75px;width: 100px;" />
              </div>
              <div style="position: absolute;top: 17px;left: 30px;" v-if="item.progress !== undefiend">
                <text class="progress">下载中</text>
                <text class="progress">{{`${item.progress}%`}}</text>
              </div>
              <image :src="playImg" style="height: 40px;width: 40px;position: absolute;top: 17px;left: 30px;"
              v-if="item.midiDownload && item.videoDownload && !item.progress && index === playIndex" />
              <image :src="downloadImg" style="height: 40px;width: 40px;position: absolute;top: 17px;left: 30px;"
              v-if="!item.progress && item.progress === undefined && (!item.midiDownload || !item.videoDownload)" />
            </div>
            <div class="video-cell-desc">
              <text class="video-cell-desc-title">{{item.courseSetName}}</text>
              <text class="video-cell-desc-art">{{item.courseName}}</text>
            </div>
            <image :src="lineImg" style="height: 1px; width: 674px;position: absolute;bottom: 0;left: 17px;" />
          </div>
    </scroller>
    </div>
    <toolbar>
      <icon-item :hidden="!show" longClick="true" id="34" pianoKey="92" text="" icon="0xe63c"
                 :style="{color:'#fff',backgroundColor:'#6000',dotColor: '#6000',textColor:'#fff'}"/>
      <icon-item :hidden="!show" longClick="true" id="35" pianoKey="94" text="" icon="0xe654"
                 :style="{color:'#fff',backgroundColor:'#6000',dotColor: '#6000',textColor:'#fff'}"/>
      <icon-item :hidden="!show" id="36" pianoKey="97" text="" icon="0xe69a"
                 :style="{color:'#fff',backgroundColor:'#6000',dotColor: '#6000',textColor:'#fff'}"/>
    </toolbar>
  </div>
</template>

<script>
  import * as toolbar from 'find-toolbar'
  import mixins from '../mixin.js'
  const globalEvent = weex.requireModule('globalEvent')
  const find = weex.requireModule('find')
  const dom = weex.requireModule('dom')
  export default {
    name: 'videoDirectory',
    mixins: [mixins],
    data () {
      return {
        linkImg: require('../../images/artistcourse_cover.png'),
        logo: require('../../images/icon_vedio_list.png'),
        defaultImg: require('../../images/pic_common_list.png'),
        playImg: require('../../images/icon_vedio_play_list.png'),
        downloadImg: require('../../images/icon_download_list.png'),
        lineImg: require('../../images/pic_line_list.png'),
        isActive: false,
        styleObject: {
          'background-color': '#FF7E1B'
        },
        videoList: {},
        select: 0,
        progress: 0,
        rightTop: 0,
        show: false,
        playIndex: 0
      }
    },
    methods: {
      buttonActions (type) {
        switch (type) {
          case 'down':
            if (this.select < this.videoList.courseList.length - 1) {
              this.select = this.select + 1
            }
            if (this.select > 6) {
              let el = this.$refs['item' + (this.select - 6)][0]
              dom.scrollToElement(el, {})
            }
            break
          case 'up':
            if (this.select > 0) {
              this.select--
            }
            if (this.select >= 6) {
              let ele = this.$refs['item' + (this.select - 6)][0]
              dom.scrollToElement(ele, {})
            }
            break
          case 'ok':
            this.okAction()
            break
        }
        console.log('buttonActions', this.select)
      },
      okAction () {
        let courseItem = this.videoList.courseList[this.select]
        let params = {courseItem, index: this.select, isDownload: false}
        if (courseItem.midiDownload && courseItem.videoDownload) {
          params.isDownload = true
        }
        find.sendMsgToWeb({
          method: 'weexDownload',
          params
        })
      },
      getVideoList ({videoList}) {
        this.videoList = videoList
      },
      weexPlayIndex ({playIndex}) {
        this.playIndex = playIndex
      },
      weexProgress ({progress, index}) {
        this.progress = progress
        //   this.videoList.courseList[index].progress = progress < 100 ? progress : false
        this.$set(this.videoList.courseList[index], 'progress', progress < 100 ? progress : false)
      },
      controlButton ({show}) {
        this.show = show
      }
    },
    computed () {
    },
    created () {
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          case 92:
            this.buttonActions('up')
            break
          case 94:
            this.buttonActions('down')
            break
          case 97:
            this.buttonActions('ok')
            break
        }
      })
    },
    components: {
      ...toolbar
    },
    watch: {
      select: function (val, oldval) {
        let rightTop = -(val - 6) * 122
        this.rightTop = rightTop > 0 ? 0 : rightTop
      }
    }
  }
</script>

<style lang='scss'>
  .fwhite {
    color: #FFFFFF;
  }

  .VideolDirectory {
    height: 1080px;
    width: 690px;
    background-color: rgba(0, 0, 0, .7);
  }

  .VideolDirectory-header {
    width: 690px;
    height: 78px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 40px;
    border-bottom-style: solid;
    border-bottom-color: #FFFFFF;
    border-bottom-width: 1px;
  }

  .video-mun {
    flex: 2;
    line-height: 78px;
    font-size: 20px;
  }

  .video-img {
    flex: 1;
    flex-direction: row;
  }

  .video-img-header {
    margin-top: 25px;
  }

  .video-text {
    flex: 6;
    line-height: 78px;
    font-size: 20px;
  }

  .contentBox {
    height: 854px;
    background-color: rgba(255,255,255,0.4);
  }

  .video-cell {
    height: 122px;
    padding-top: 24px;
    padding-left: 40px;
    flex-direction: row;
  }

  .video-cell-image {
    flex: 1;
  }

  .video-cell-image-pic {
    width: 100px;
    height: 75px;
  }

  .video-cell-desc {
    flex: 4;
  }

  .video-cell-desc-title {
    font-size: 25px;
    color: #ffffff;
    margin-bottom: 5px;
  }

  .video-cell-desc-art {
    font-size: 20px;
    color: #ffffff;
  }

  .active {
    background-color: #FF7E1B;
  }

  .progress {
    font-size: 14px;
    text-align: center;
    color: #ffffff;
  }
</style>
