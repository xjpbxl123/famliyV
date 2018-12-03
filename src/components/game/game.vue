<template>
 <div class="game">
    <div class="list" :class="{chosed: listIndex === 0}">
        <div class="title" v-text="title1"></div>
        <div class="box1">
            <ul>
                <li v-for="(item,index) in list" :key="index"  @click="setSelect(index)" :class="{'active': index === listIndex}" >
                    <div class="item">
                        <span class="icon iconfont"  :class="item.iconName"></span>
                        <span class="name" v-text="item.name"></span>
                        <div class="img" v-if="item.imgUrl">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <span class="yidiaoValue" v-if="item.value !== undefined" v-text="yidiaoValue>0?'+'+yidiaoValue:yidiaoValue"></span>
                        <span class="iconfont icon-arrow-more arrow"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <toolbar :hidden="toolbarHidden">
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
            icon: '0xe63b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
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
            name: '打地鼠',
            appName: 'dadishu2'
          },
          {
            name: '打鼓',
            appName: 'dagu'
          },
          {
            name: '音乐王国',
            appName: 'kindom2'}
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
        dagu: state => state.storage.cache.renderCache.dagu,
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
      this.getAppVersion()
    },
    methods: {
      setSelect () {
      },
      getAppVersion () {
        this.$store.dispatch('index/getGameApp', 'dadishu2')
        this.$store.dispatch('index/getGameApp', 'dagu')
        this.$store.dispatch('index/getGameApp', 'kingdom2')
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
                      if (!data.url) {
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
      downloadPartner () {
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
          return modules.file.pathComplement('$web/' + appName)
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
            width: 1070px;
            position: absolute;
            top: 85px;
            left: 850px;
            height: 900px;
            background:rgba(0,0,0,0.3);
            border-radius:12px 0px 0px 12px;
            padding-top: 56px;
            .title {
                width: 855px;
                margin: 0 auto;
                text-align: center;
                font-size: 36px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color:rgba(255,255,255,1);
                border-bottom: 1px solid rgba(255,255,255,0.5);
                padding-bottom: 20px;
            }
            .box1 {
                position: relative;
                width: 100%;
                height: 702px;
                overflow: hidden;
                ul {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    li {
                        width: 100%;
                        height: 78px;
                        color: rgba(255,255,255,1);
                        &.active {
                        background-image: -webkit-linear-gradient(left,rgba(255, 255, 255, 0),rgba(255,255,255,0.4),rgba(255,255,255,0));
                        }
                        .item {
                            width: 855px;
                            height: 100%;
                            position: relative;
                            line-height: 78px;
                            margin: 0 auto;
                            text-indent: 20px;
                            border-width: 0;
                            border-bottom-width: 1px;
                            border-bottom-style: solid;
                            border-image: -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0)) 30 30;
                            .name {
                                font-size: 30px;
                                font-family: PingFangSC-Regular;
                                font-weight: 400;
                                margin-left: 20px;
                            }
                            .icon {
                                font-size: 30px;
                            }
                            .img {
                                width: 50px;
                                height: 50px;
                                background:rgba(255,255,255,1);
                                border-radius: 6px;
                                float: right;
                                margin-right: 84px;
                                margin-top: 12px;
                                background-size: cover;
                                position: relative;
                                img {
                                    width: 88%;
                                    height: 88%;
                                    position: absolute;
                                    left: 6%;
                                    top: 6%;
                                }
                            }
                            .arrow {
                                position: absolute;
                                top: 0;
                                right: 48px;
                                font-size: 30px;
                            }
                            .yidiaoValue {
                                float: right;
                                width: 50px;
                                height: 100%;
                                margin-right: 100px;
                                text-align: center;
                                display: block;
                                line-height: 78px;
                                font-size: 36px;
                                font-family: PingFangSC-Semibold;
                                font-weight: 600;
                            }
                        }

                    }
                }
            }

        }
    }

</style>
