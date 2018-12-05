<template>
 <div class="game">
    <div class="list" :class="{chosed: listIndex === 0}">
        <div class="title" v-text="title1"></div>
        <div class="box1">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                  <div class="item" @click="setSelect(index)" :class="{'active': index === listIndex, installed: item.status === 'installed'}"></div>
                  <span class="name" v-text="item.text"></span>
                  <span class="staus" v-text="item.statusText"></span>
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
          :hidden="opening"
          :checkable="button.checkable"
          :checked="button.checked"
          :style="{backgroundColor:button.backgroundColor,textColor: '#fff',dotColor: button.dotColor}"/>
        <icon-item v-for="(button,index) in gameButtons"
            :hidden="!opening || button.hidden"
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
            show: false
          },
          {
            pianoKey: 78,
            text: '直接进入',
            icon: '0xe60a',
            id: 389,
            backgroundColor: '#2fff',
            show: false
          },
          {
            pianoKey: 80,
            text: '更新',
            icon: '0xe651',
            id: 390,
            backgroundColor: '#2fff',
            show: false
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
            name: '乐理练习',
            text: '乐理练习',
            statusText: ''
          },
          {
            name: '打地鼠',
            appName: 'dadishu2',
            text: '打地鼠-认音游戏',
            statusText: ''
          },
          {
            name: '打鼓',
            appName: 'dagu',
            text: '我是鼓手-节奏游戏',
            statusText: ''
          }
        ],
        opening: false,
        isDownloading: false
      }
    },
    computed: {
      ...mapState({
        isLogin (state) {
          let {storage} = state
          return storage.isLogin
        },
        dadishu2: state => state.storage.cache.renderCache.dadishu2,
        dadishu2Local: state => state.storage.cache.renderCache.dadishu2,
        dagu: state => state.storage.cache.renderCache.dagu,
        daguLocal: state => state.storage.cache.renderCache.dagu,
        kingdom2: state => state.storage.cache.renderCache.kingdom2
      })
    },
    find: {
      [keys.KEY78] () {
        this.buttonActions('up')
      },
      [keys.LONG_KEY78] () {
        this.buttonActions('up')
      },
      [keys.KEY80] () {
        this.buttonActions('down')
      },
      [keys.LONG_KEY80] () {
        this.buttonActions('down')
      },
      [keys.KEY82] () {
        this.buttonActions('ok')
      }
    },
    created () {
      this.getAppLocalVersion()
    },
    methods: {
      setSelect () {
      },
      getAppLocalVersion () {
        // 初始化app状态
        let appArr = ['dadishu2', 'dagu']
        for (const value of appArr) {
          modules.file.pathComplement('$game/' + value + '/version.json').then((res) => {
            if (res.path) {
              modules.file.fileExists(res.path).then((res1) => {
                if (res1) {
                  this.$store.dispatch('index/getLocalAppVersion', res.http, value).then((data) => {
                    if (value === 'dadishu2') {
                      this.list[1].status = 'installed'
                    }
                    if (value === 'dagu') {
                      this.list[2].status = 'installed'
                    }
                  })
                } else {
                  if (value === 'dadishu2') {
                    this.list[1].status = 'unInstall'
                    this.list[1].statusText = '未安装'
                  }
                  if (value === 'dagu') {
                    this.list[2].status = 'unInstall'
                    this.list[2].statusText = '未安装'
                  }
                }
              })
            }
          })
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
          case 'ok':
            if (this.listIndex === 0) {
              return modules.nativeRouter.openAppsView()
            }
            this.openGame()
            // switch (this.listIndex) {
            //   case 0:
            //     console.log(this.dadishu2)
            //     break
            //   case 1:
            //     console.log(this.dagu)
            //     break
            //   case 2:
            //     console.log(this.kingdom2)
            //     break
            // }
            break
        }
      },
      openGame () {
        // 做登录验证
        if (!this.isLogin) {
          return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
        }
        if (this.isLogin) {
          this.$store.dispatch('getUserInfo').then(data => {
            if (!data.userInfo.userId) {
              modules.user.logOut()
              return eventsHub.$emit('toast', {text: '请登录后进行操作', icon: 'icon-sync-info', iconLoading: false, allExit: false})
            }
            let appName = this.list[this.listIndex].appName
            this.opening = true
            eventsHub.$emit('toast', {text: '正在加载', iconLoading: true, icon: 'icon-loading', allExit: true})
            // 获取线上最新版本
            return this.$store.dispatch('index/getGameApp', appName).then((data) => {
              this.downloadInfo = this[appName].url
              modules.file.pathComplement('$game/' + appName + '/package.json').then((res) => {
                if (res.path) {
                  // 判断文件是否存在
                  modules.file.fileExists(res.path).then((res1) => {
                    if (!res1) {
                      // 本地没有 判断网络问题
                      if (!data[appName].url) {
                        // 拉不到线上版本 提示网络问题
                        console.log('本地没有且拉不到线上版本 提示网络问题')
                        this.peilianLoading = false
                        this.canEnterModule = true
                        eventsHub.$emit('closeToast')
                        errorHandling(data)
                      } else {
                        console.log('本地没有，拉到了线上版本 直接下载')
                        // 拉到了线上版本 直接下载 显示取消按钮
                        this.downloadGame()
                      }
                    } else {
                      // 本地有 判断网络问题
                      return this.$store.dispatch('index/getLocalGameAppVersion', res.http, appName).then((data1) => {
                        // 读取本地JSON文件 拿到本地版本信息
                        if (!data.partnerVersion) {
                          // 拉不到线上版本或者没拿到本地版本信息 直接打开即可
                          console.log('本地有且拉不到线上版本 直接打开即可')
                          this.openGame()
                        } else {
                          if (!this.localPartnerVersion.version) {
                            // 没有拿到本地版本 直接去下载
                            return this.downloadGame()
                          }
                          // 拉到了线上版本 做版本比较 判断是否需要更新
                          console.log('本地有且拉到了线上版本 做版本比较 判断是否需要更新')
                          let isNeedUpdate = this.contrastVersion(this.partnerVersion, this.localPartnerVersion)
                          if (isNeedUpdate) {
                            // 需要更新 弹框提示 显示直接进入和更新按钮
                            this.peilianButtons[0].show = false
                            this.peilianButtons[1].show = true
                            this.peilianButtons[2].show = true
                            eventsHub.$emit('toast', {text: '陪练数据包有更新,是否更新后进入?', icon: 'icon-sync-info', iconLoading: false, allExit: true})
                          } else {
                            // 不需要更新 直接打开即可
                            this.openGame()
                          }
                        }
                      })
                    }
                  })
                }
              })
            })
          })
        }
      },
      downloadGame () {
        let appName = this.list[this.listIndex].appName
        this.isDownloading = true
        let downloadInfo = this.downloadInfo
        let localPath, targetPath
        let self = this
        // 只显示取消按钮
        self.gameButtons[0].show = true
        self.gameButtons[1].show = false
        self.gameButtons[2].show = false
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
            eventsHub.$emit('toast', {text: '下载中 ' + parseInt(progress.progress * 100) + '%', iconLoading: false, icon: 'icon-updating', allExit: true})
          }).then(res => {
            console.log(res)
            if (res.path) {
              modules.file.unZip(res.path, targetPath).then(function (data) {
                if (data.code !== undefined) {
                  console.log('解压失败' + data.desc)
                } else {
                  console.log('解压成功 直接打开')
                  self.openNow()
                }
              })
            }
          })
        })
      },
      openNow () {
        console.log('打开游戏')
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
                      &:nth-child(1) {
                        .item {
                          background: url('./images/01.png') no-repeat;
                          background-size: cover;
                        }

                      }
                      &:nth-child(2) {
                        .item {
                          background: url('./images/02-s.png') no-repeat;
                          background-size: cover;
                          &.installed {
                            background: url('./images/02.png') no-repeat;
                            background-size: cover;
                          }
                        }
                      }
                      &:nth-child(3) {
                        .item {
                          background: url('./images/03-s.png') no-repeat;
                          background-size: cover;
                          &.installed {
                            background: url('./images/03.png') no-repeat;
                            background-size: cover;
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
        .outer{
          position: absolute;
          width: 200px;
          height: 200px;
          transform: rotate(10deg);
          clip: rect(0px,100px,200px,0px);/* 这个clip属性用来绘制半圆，在clip的rect范围内的内容显示出来，使用clip属性，元素必须是absolute的 */
          border-radius: 100px;
          background-color: yellow;
        }

        .pie{
          position: absolute;
          width: 200px;
          height: 200px;
          left: 300px;
          transform: rotate(10deg);
          clip: rect(0px,100px,200px,0px);
          border-radius: 100px;
          background-color: yellow;
          }
        }
        /**动画*/
        @-webkit-keyframes an1{
              0% {transform: rotate(0deg);}
              50%{transform: rotate(90deg);}
              100%{transform: rotate(0deg);}
        }

        @-webkit-keyframes an2{
              0% {transform: rotate(0deg);}
              50%{transform: rotate(-90deg);}
              100%{transform: rotate(0deg);}
        }
    }

</style>
