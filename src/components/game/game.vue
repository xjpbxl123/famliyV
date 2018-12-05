<template>
 <div class="game">
    <div class="list" :class="{chosed: listIndex === 0}">
        <div class="title" v-text="title1"></div>
        <div class="box1">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                  <div class="item" @click="setSelect(index)" :class="{'active': index === listIndex, 'installed': item.status === 'installed'}">
                    <img :src="item.status === 'installed'?item.imgUrl1:item.imgUrl2" alt="">
                    <canvas :id="'canvas'+index" width="300" height="300" v-show="index === listIndex && isDownloading"></canvas>
                  </div>
                  <span class="name" v-text="item.text"></span>
                  <span class="staus" v-text="item.statusText" v-if="item.status == 'unInstall'"></span>
                </li>
            </ul>
        </div>
        <div class="outer"></div>
        <div class="pie"></div>
    </div>
    <toolbar :darkBgHidden="true">
        <icon-item v-for="(button,index) in controlButtons"
          :longClick="button.longClick"
          :key="index"
          :id="button.id"
          :icon="button.icon"
          :pianoKey="button.pianoKey"
          :selected="button.selected"
          :hidden="isDownloading || chooseUpdate"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: button.dotColor}"/>
        <icon-item v-for="(button,index) in gameButtons"
            :hidden="button.hidden || gameButtonsHidden"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff'}"/>
    </toolbar>
 </div>
</template>

<script>
  import { mapState } from 'vuex'
  import * as keys from 'vue-find'
  import { modules, download } from 'find-sdk'
  import eventsHub from 'scripts/eventsHub'
  import {errorHandling} from '../../scripts/utils'
  export default {
    name: 'timbreList',
    data () {
      return {
        gameButtons: [
          {
            pianoKey: 75,
            text: '取消',
            icon: '0xe60a',
            id: 388,
            backgroundColor: '#2fff',
            hidden: true
          },
          {
            pianoKey: 78,
            text: '直接进入',
            icon: '0xe60a',
            id: 389,
            backgroundColor: '#2fff',
            hidden: true
          },
          {
            pianoKey: 80,
            text: '更新',
            icon: '0xe651',
            id: 390,
            backgroundColor: '#2fff',
            hidden: true
          }
        ],
        controlButtons: [
          {
            pianoKey: 78,
            text: '',
            icon: '0xe660',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe65b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 12,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 15
          }
        ],
        listIndex: 0,
        title1: '',
        list: [
          {
            text: '乐理练习',
            statusText: '',
            status: 'installed',
            imgUrl1: require('./images/01.png')
          },
          {
            appName: 'dadishu2',
            text: '打地鼠-认音游戏',
            statusText: '',
            status: 'unInstall',
            imgUrl1: require('./images/02.png'),
            imgUrl2: require('./images/02-s.png')
          },
          {
            appName: 'dagu',
            text: '我是鼓手-节奏游戏',
            statusText: '',
            status: 'unInstall',
            imgUrl1: require('./images/03.png'),
            imgUrl2: require('./images/03-s.png')
          }
        ],
        isDownloading: false,
        c: null,
        ctx: null,
        progress: 0,
        compel: 0,
        chooseUpdate: false,
        gameButtonsHidden: true
      }
    },
    watch: {
      progress: function (val) {
        if (val === 0.00) {
          this.drawCircle(0)
        }
        if (val === 1.00) {
          this.drawCircle(1)
        }
        this.drawCircle(val)
      }
    },
    computed: {
      ...mapState({
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        }
      })
    },
    find: {
      [keys.KEY75] () {
        // 取消下载
        this.buttonActions('cancelDownload')
      },
      [keys.KEY78] () {
        if (this.chooseUpdate) {
          // 直接打开
          eventsHub.$emit('closeToast')
          this.chooseUpdate = false
          this.gameButtonsHidden = true
          this.openApp()
        } else {
          this.buttonActions('up')
        }
      },
      [keys.LONG_KEY78] () {
        if (this.chooseUpdate) {
          return
        }
        this.buttonActions('up')
      },
      [keys.KEY80] () {
        if (this.chooseUpdate) {
          // 更新
          this.downloadApp()
        } else {
          this.buttonActions('down')
        }
      },
      [keys.LONG_KEY80] () {
        this.buttonActions('down')
      },
      [keys.KEY82] () {
        this.buttonActions('ok')
      },
      [keys.BACK_PRESSED] () {
        if (this.chooseUpdate) {
          eventsHub.$emit('closeToast')
          this.chooseUpdate = false
          this.gameButtonsHidden = true
          return
        }
        if (this.isDownloading && !this.compel) {
          return this.canceldownload()
        }
        this.$router.back()
      }
    },
    created () {
      this.getAppLocalVersion()
    },
    mounted () {
    },
    methods: {
      setSelect (index) {
        if (!this.chooseUpdate && !this.isDownloading) {
          this.listIndex = index
          this.buttonActions('ok')
        }
      },
      getAppLocalVersion () {
        // 初始化app状态
        for (const [index, value] of this.list.entries()) {
          if (index > 0) {
            modules.file.pathComplement('$game/' + value.appName + '/version.json').then((res) => {
              if (res.path) {
                modules.file.fileExists(res.path).then((res1) => {
                  if (res1) {
                    this.$store.dispatch('index/getLocalAppVersion', {url: res.http, appName: value.appName}).then((data) => {
                      console.log(data)
                      if (data && data[value.appName + 'Local'] && data[value.appName + 'Local'].version) {
                        this.list[index].status = 'installed'
                        this.list[index].statusText = ''
                      } else {
                        this.list[index].status = 'unInstall'
                        this.list[index].statusText = '未安装'
                      }
                    })
                  } else {
                    this.list[index].status = 'unInstall'
                    this.list[index].statusText = '未安装'
                  }
                })
              }
            })
          }
        }
      },
      buttonActions (type) {
        switch (type) {
          case 'up':
            this.listIndex = Math.max(this.listIndex - 1, 0)
            break
          case 'down':
            this.listIndex = Math.min(this.listIndex + 1, this.list.length - 1)
            break
          case 'cancelDownload':
            if (this.isDownloading && !this.compel) {
              // 如果正在下载并且不是强制更新则暂停下载
              this.canceldownload()
            }
            break
          case 'ok':
            if (this.listIndex === 0) {
              return modules.nativeRouter.openAppsView()
            }
            this.open()
            break
        }
      },
      open () {
        let appName = this.list[this.listIndex].appName
        // 获取线上最新版本
        return this.$store.dispatch('index/getAppVersion', appName).then((data) => {
          if (data[appName]) {
            this.downloadInfo = data[appName].url
            this.compel = data[appName].compel
          }
          modules.file.pathComplement('$game/' + appName + '/version.json').then((res) => {
            if (res.path) {
              // 判断文件是否存在
              modules.file.fileExists(res.path).then((res1) => {
                if (res1) {
                  return this.$store.dispatch('index/getLocalAppVersion', {url: res.http, appName: appName}).then((data1) => {
                    if (data1 && data1[appName + 'Local'] && data1[appName + 'Local'].version) {
                      // 本地有 去判断线上版本
                      console.log('本地有 去判断线上版本')
                      if (data && data[appName] && data[appName].url) {
                        // 有线上版本 比较版本 看是否需要更新
                        let isNeedUpdate = this.contrastVersion(data[appName], data1[appName + 'Local'])
                        console.log('有线上版本 比较版本 看是否需要更新', isNeedUpdate)
                        if (isNeedUpdate) {
                          // 需要更新 弹框提示 显示直接进入和更新按钮
                          console.log('需要更新 弹框提示 显示直接进入和更新按钮')
                          this.chooseUpdate = true
                          this.gameButtonsHidden = false
                          if (this.compel) {
                            // 强制更新 不显示直接进入
                            console.log('强制更新')
                            this.gameButtons[1].hidden = true
                          } else {
                            this.gameButtons[1].hidden = false
                          }
                          this.gameButtons[0].hidden = true
                          this.gameButtons[2].hidden = false
                          eventsHub.$emit('toast', {text: '数据包有更新,是否更新后进入?', icon: 'icon-sync-info', iconLoading: false, allExit: true})
                        } else {
                          // 不需要更新 直接打开即可
                          this.openApp()
                        }
                      } else {
                        // 没有线上版本 直接打开
                        this.openApp()
                      }
                    } else {
                      // 本地文件访问不到 判断网络情况
                      console.log('本地文件访问不到 判断网络情况')
                      if (data[appName] && data[appName].url) {
                        // 拉到了线上版本 去下载
                        console.log('拉到了线上版本 去下载')
                        this.downloadApp()
                      } else {
                        // 拉不到线上版本 提示网络问题 显示重试按钮
                        console.log('拉不到线上版本 提示网络问题')
                        errorHandling(data)
                      }
                    }
                  })
                } else {
                  // 本地没有 判断网络情况
                  console.log('本地没有 判断网络情况')
                  if (data[appName] && data[appName].url) {
                    // 拉倒了线上版本 去下载
                    console.log('拉倒了线上版本 去下载')
                    this.downloadApp()
                  } else {
                    // 拉不到线上版本 提示网络问题 显示重试按钮
                    console.log('拉不到线上版本 提示网络问题')
                    errorHandling(data)
                  }
                }
              })
            }
          })
        })
      },
      canceldownload () {
        let downloadInfo = this.downloadInfo
        download.abort({
          url: downloadInfo.url,
          md5: downloadInfo.md5,
          fsize: downloadInfo.fsize,
          localPath: downloadInfo.localPath
        }).then(res => {
          console.log(res, '中断下载')
          this.isDownloading = false
          this.chooseUpdate = false
          this.gameButtonsHidden = true
          this.list[this.listIndex].statusText = '未安装'
          eventsHub.$emit('closeToast')
        })
      },
      contrastVersion (serverVersionInfo, localVersionInfo) {
        // 先比较版本号再比较build号
        let serverVersion = serverVersionInfo.version
        let localVersion = localVersionInfo.version
        let serverBuild = serverVersionInfo.build
        let localBuild = localVersionInfo.build
        console.log(serverVersion, serverBuild)
        console.log(localVersion, localBuild)
        let serverVersionArr = serverVersion.split('.')
        let serverVersion1 = [serverVersionArr[0], serverVersionArr[1]].join('.')
        let serverVersion2 = serverVersionArr[2]

        let localVersionArr = localVersion.split('.')
        let localVersion1 = [localVersionArr[0], localVersionArr[1]].join('.')
        let localVersion2 = localVersionArr[2]

        if (serverVersion1 > localVersion1) { // 需要更新
          console.log('需要更新')
          return true
        } else if (serverVersion1 === localVersion1) { // 继续对比
          if (serverVersion2 > localVersion2) { // 需要更新
            console.log('需要更新')
            return true
          } else if (serverVersion2 === localVersion2) { // 继续对比
            if (serverBuild > localBuild) { // 需要更新
              console.log('需要更新')
              return true
            } else { // 不需要更新
              return false
            }
          } else if (serverVersion2 < localVersion2) { // 不需要更新
            return false
          }
        } else if (serverVersion1 < localVersion1) { // 不需要更新
          return false
        }
      },
      downloadApp () {
        this.isDownloading = true
        this.list[this.listIndex].statusText = '下载中'
        eventsHub.$emit('closeToast')
        let self = this
        this.c = document.getElementById('canvas' + this.listIndex)
        this.ctx = this.c.getContext('2d')// 图画绘制对象
        this.ctx.fillStyle = '#000'
        this.ctx.strokeStyle = '#000'
        this.ctx.beginPath()
        this.ctx.moveTo(150, 150)
        this.drawCircle(1)
        let appName = this.list[this.listIndex].appName
        this.isDownloading = true
        let downloadInfo = this.downloadInfo
        let localPath, targetPath
        this.gameButtonsHidden = false
        if (!this.compel) {
          // 非强制更新时  显示取消按钮
          self.gameButtons[0].hidden = false
          self.gameButtons[1].hidden = true
          self.gameButtons[2].hidden = true
        }
        modules.file.pathComplement('$downLoadHtmls').then((result) => {
          console.log(result)
          localPath = result.path
          return modules.file.pathComplement('$game/' + appName)
        }).then((result) => {
          targetPath = result.path
          downloadInfo.localPath = localPath
          self.downloadInfo = downloadInfo
          download.downloadFile({
            url: downloadInfo.url,
            md5: downloadInfo.md5,
            fsize: downloadInfo.fsize,
            localPath: localPath
          }).progress(progress => {
            this.progress = (progress.progress).toFixed(2)
          }).then(res => {
            console.log(res)
            if (res.path) {
              modules.file.unZip(res.path, targetPath).then(function (data) {
                if (data.code !== undefined) {
                  console.log('解压失败' + data.desc)
                } else {
                  console.log('解压成功 直接打开')
                  self.isDownloading = false
                  self.chooseUpdate = false
                  self.gameButtonsHidden = true
                  self.list[self.listIndex].status = 'installed'
                  self.openApp()
                }
              })
            }
          })
        })
      },
      openApp () {
        modules.nativeRouter.openWebView('$game/' + this.list[this.listIndex].appName + '/index.html').then((data) => {
          console.log(data, '打开游戏模块')
        })
      },
      drawCircle (data) {
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, 300, 300)
        this.ctx.moveTo(150, 150)
        this.ctx.arc(150, 150, 150, -0.5 * Math.PI, data * (2 * Math.PI) - Math.PI / 2, true)
        this.ctx.closePath()
        this.ctx.fill()
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
    .game {
        width: 100%;
        height: 100%;
        position: relative;
        .list {
          .box1 {
              position: relative;
              ul {
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                  top: 358px;
                  li {
                      width: 200px;
                      height: 300px;
                      color: rgba(255,255,255,1);
                      margin-right: 230px;
                      position: relative;
                      .item {
                        width: 100%;
                        height: 200px;
                        position: absolute;
                        border-radius: 60px;
                        top: 0;
                        left: 0;
                        overflow: hidden;
                        img {
                          width: 100%;
                          height: 100%;
                        }
                        canvas {
                          position: absolute;
                          left: -25%;
                          top:  -25%;
                          opacity: 0.6;
                        }
                        &::before {
                          content: '';
                          width: 100%;
                          height: 100%;
                          position: absolute;
                          top: 0;
                          left: 0;
                          border-radius: 60px;
                          background-color: rgba(0,0,0,0.3);
                        }
                        &.active {
                          border: 4px solid #00ff90;
                          box-shadow: 0 0 20px 0 #00ff90;
                          transform: scale(1.2);
                          &::before {
                            background-color: rgba(0,0,0,0);
                          }
                        }
                      }
                      &:last-child {
                        margin-right: 0;
                      }
                      .name {
                        position: absolute;
                        width: 150%;
                        bottom: 20px;
                        left: 50%;
                        text-align: center;
                        transform: translateX(-50%);
                        font-size: 32px;
                        font-family: PingFangSC-Regular;
                        font-weight: bold;
                        color:rgba(255,255,255,1);
                      }
                      .staus {
                        position: absolute;
                        bottom: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 32px;
                        font-family: PingFangSC-Regular;
                        font-weight: bold;
                        color:rgba(255,226,111,1)
                      }
                  }
              }
          }
        }
    }

</style>
