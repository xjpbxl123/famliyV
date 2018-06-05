<template>
  <div class="softwareUpdate">
    <div class="left">
    </div>
    <div class="right">
      <div class="localVersionInfo">
          当前find版本号:{{localVersionInfo.version}} ({{localVersionInfo.build}})
      </div>
      <div class="serverVersionInfo" v-if="needupdate">
        <div class="subscript">
            new
        </div>
        <div>
          请更新Find版本号：{{serverVersionInfo.version}} ({{serverVersionInfo.build}})
        </div>
        <progressBar :progress="progress" v-show="downloading"></progressBar>
      </div>
    </div>
    <findPrompt icon="icon-grade-right" text="成功获取最新版本信息" :showPrompt="show" delay="2000"></findPrompt>
    <toolbar>
      <icon-item v-for="(button,index) in controlButtons"
            :key="index"
            :id="button.id"
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            v-if="button.show"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  import { KEY82 } from 'vue-find'
  import { download, file, global } from 'find-sdk'
  import progressBar from '../common/find-progress-bar/find-progress-bar'
  import findPrompt from '../common/find-prompt/find-prompt'
  export default {
    data () {
      return {
        progress: 0,
        downloading: false,
        show: false,
        needupdate: false,
        controlButtons: [
          {
            pianoKey: 82,
            text: '更新',
            icon: '0xe69c',
            id: 1,
            backgroundColor: '#f08032',
            show: false
          }
        ]
      }
    },
    find: {
      [KEY82] () {
        let version = process.env.VERSION
        let build = process.env.BUILD_VERSION
        console.log(`${version}${build}`)
        let downloadInfo = this.serverVersionInfo.url

        if (this.downloading) {
          // 暂停下载
          this.downloading = false
          this.stopdownload(downloadInfo)
          this.controlButtons = this.controlButtons.map(item => {
            if (item.pianoKey === 82) {
              item.text = '更新'
              item.icon = '0xe69c'
            }
            return item
          })
        } else {
          // 开始下载
          this.downloading = true
          this.download(downloadInfo)
          this.controlButtons = this.controlButtons.map(item => {
            if (item.pianoKey === 82) {
              item.text = '取消下载'
              item.icon = '0xe60a'
            }
            return item
          })
        }
      }
    },
    computed: {
      ...mapState({
        serverVersionInfo: state => state.softwareUpdate.serverVersionInfo,
        localVersionInfo: state => state.softwareUpdate.localVersionInfo
      })
    },
    methods: {
      contrastVersion (serverVersionInfo, localVersionInfo) {
        // 先比较版本号再比较build号
        let serverVersion = serverVersionInfo.version
        let localVersion = localVersionInfo.version
        let serverBuild = serverVersionInfo.build
        let localBuild = localVersionInfo.build

        let serverVersionArr = serverVersion.split('.')
        let serverVersion1 = [serverVersionArr[0], serverVersionArr[1]].join('.')
        let serverVersion2 = serverVersionArr[2]
        console.log(serverVersion1, serverVersion2)

        let localVersionArr = localVersion.split('.')
        let localVersion1 = [localVersionArr[0], localVersionArr[1]].join('.')
        let localVersion2 = localVersionArr[2]
        console.log(localVersion1, localVersion2)

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
      download (downloadInfo) {
        let that = this
        let localPath, targetPath
        console.log(file.pathComplement('$downLoadHtmls'))
        this.progress = 0
        file.pathComplement('$downLoadHtmls').then(function (result) {
          console.log(result)
          localPath = result
          return file.pathComplement('$web')
        }).then(function (result) {
          console.log(result)
          targetPath = result
          download.downloadFile({
            url: downloadInfo.url,
            md5: downloadInfo.md5,
            fsize: downloadInfo.fsize,
            localPath: localPath
          }).progress(progress => {
            console.log(progress.progress)
            that.progress = progress.progress
          }).then(res => {
            console.log(res)
            if (res.path) {
              file.unZip(res.path, targetPath).then(function (data) {
                if (data.code !== undefined) {
                  console.log('解压失败' + data.desc)
                } else {
                  console.log('成功')
                  console.log('重启App')
                  global.relaunchApp()
                }
              })
            }
          })
        })
      },
      stopdownload (downloadInfo) {
        let localPath
        file.pathComplement('$downLoadHtmls').then(function (result) {
          localPath = result
          download.abort({
            url: downloadInfo.url,
            md5: downloadInfo.md5,
            fsize: downloadInfo.fsize,
            localPath: localPath
          })
        })
      }
    },
    created () {
      let that = this
      this.$store.dispatch('softwareUpdate/getServerVersionInfo').then(function () {
        that.show = true
        that.$store.dispatch('softwareUpdate/getLocalVersionInfo').then(function () {
          that.needupdate = that.contrastVersion(that.serverVersionInfo, that.localVersionInfo)
        })
      })
    },
    components: {
      progressBar,
      findPrompt
    },
    watch: {
      needupdate: function (val, oldval) {
        this.controlButtons = this.controlButtons.map(item => {
          if (item.pianoKey === 82) {
            item.show = val
          }
          return item
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.softwareUpdate {
  color: #fff;
  width: 100%;
  height: 100%;
  & > div {
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }
  .localVersionInfo {
    font-size: 36px;
    position: absolute;
    top: 50px;
    right: 130px;
  }
  .serverVersionInfo {
    width: 800px;
    height: 750px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 40px;
    position: absolute;
    top: 140px;
    left: 100px;
    font-size: 36px;
    box-sizing: border-box;
    padding: 35px 50px;
    & > .subscript {
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: red;
      border-radius: 10px;
      font-size: 30px;
    }
    .progressBar {
      width: 80%;
      height: 15px;
      position: absolute;
      bottom: -50px;
      left: 5%;
    }
  }
  .find-prompt {
    width: 750px;
    height: 450px;
    position: absolute;
    top: 275px;
    left: 2043px;
  }
}
</style>
