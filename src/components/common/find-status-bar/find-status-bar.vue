<template>
  <ul>
    <li v-for="(item,index) in statusData" :key="index">
      <span :if="item.showIcon" :class="item.className"></span>
      <span :if="item.showTitle">{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
  import {status} from 'find-sdk'
  export default {
    name: 'find-status-bar',
    data () {
      return {
        statusData: {
          wifi: {},
          localname: {},
          server: {},
          version: {},
          daemon: {},
          keyboard: {},
          midi: {},
          usb: {}
        }
      }
    },
    created () {
      status.create().progress((data) => {
        for (let key in data) {
          let value = data[key]
          switch (value.id) {
            case 'localname':
              let pianoTypeClassList = ['icon-grand-piano', 'icon-ufind', 'icon-xfind', 'icon-efind']
              if (value.status === 0) {
                value.className = 'iconfont' + ' ' + pianoTypeClassList[value.type] || ''
              }
              value.showTitle = true
              value.showIcon = true
              break
            case 'wifi':
              value.status === 0 ? value.className = 'iconfont icon-wifi' : value.className = 'iconfont icon-wifi-off '
              value.showTitle = true
              value.showIcon = true
              break
            case 'version':
              value.className = 'iconfont icon-version'
              value.showTitle = true
              value.showIcon = true
              break
            case 'keyboard':
              value.status === 0 ? value.className = '' : value.className = 'iconfont icon-h-keyboard-off '
              value.showTitle = false
              value.showIcon = value.status
              break
            case 'usb':
              value.status === 0 ? value.className = '' : value.className = 'iconfont icon-h-usb-off '
              value.showTitle = false
              value.showIcon = value.status
              break
            case 'server':
              value.className = 'iconfont icon-environment'
              value.showTitle = true
              value.showIcon = true
              break
            case 'midi':
              value.status === 0 ? value.className = '' : value.className = 'iconfont icon-h-midi-off '
              value.showTitle = false
              value.showIcon = value.status
              break
            case 'daemon':
              value.status === 1 ? value.className = '' : value.className = 'iconfont icon-daemon-s-warning '
              value.showTitle = false
              value.showIcon = !value.status
              break
            default:
              value.className = ''
              value.showTitle = false
              value.showIcon = false
              break
          }
          this.statusData[value.id] = value
        }
      })
    },
    destroyed () {
      status.close()
    }

  }

</script>

<style lang="scss" scoped>
ul {
  width: 50%;
  position: absolute;
  top: 0;
  right: 1%;
  text-align: right;
  color: rgba(255,255,255,0.8);
  font-size: 22px;
  height: 40px;
  line-height: 40px;
  li{
    margin-right: 6px;
    span {
      display: inline-block;
    }
    .iconfont {
      font-size: 22px
    }
    &:nth-child(4) .iconfont{
      font-size: 20px;
    }
  }

}
</style>
