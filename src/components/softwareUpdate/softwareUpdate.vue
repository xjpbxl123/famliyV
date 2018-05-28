<template>
  <div class="softwareUpdate">
    <div class="left">
    </div>
    <div class="right">
      <div class="localVersionInfo">
          当前find版本号:{{localVersionInfo.version}} ({{localVersionInfo.build}})
      </div>
      <div class="serverVersionInfo">
        <div class="subscript">
            new
        </div>
        <div>
          请更新Find版本号：{{serverVersionInfo.version}} ({{serverVersionInfo.build}})
        </div>
      </div>
    </div>
    <toolbar>
      <icon-item v-for="(button,index) in controlButtons"
            :key="index"
            :id=button.id
            :icon="button.icon"
            :text="button.text"
            :pianoKey="button.pianoKey"
            titlePosition="below"
            :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor}"/>
    </toolbar>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  import { KEY82 } from 'vue-find'
  import { download } from 'find-sdk'
  export default {
    data () {
      return {
        controlButtons: [
          {
            pianoKey: 82,
            text: '更新',
            icon: '0xe69c',
            id: 1,
            backgroundColor: '#f08032'
          }
        ]
      }
    },
    find: {
      [KEY82] () {
        let version = process.env.VERSION
        console.log(`更新${version}`)
        let downloadInfo = this.serverVersionInfo.url
        console.log(downloadInfo)
        download.downloadFile({
          url: downloadInfo.url,
          md5: downloadInfo.md5,
          fsize: downloadInfo.fsize,
          localPath: '/Users/find/Documents/Find Downloads/'
        }).progress(progress => { console.log(progress) }).then(res => { console.log(res.desc) })
      }
    },
    computed: {
      ...mapState({
        serverVersionInfo: state => state.softwareUpdate.serverVersionInfo,
        localVersionInfo: state => state.softwareUpdate.localVersionInfo
      })
    },
    methods: {
      update () {

      },
      stopUpdate () {

      }
    },
    created () {
      this.$store.dispatch('softwareUpdate/getServerVersionInfo')
      this.$store.dispatch('softwareUpdate/getLocalVersionInfo')
    },
    components: {}
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
    &>.subscript {
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
  }
}
</style>
