<template>
  <ul>
    <li v-for="(item,index) in statusData" :key="index">
      <span v-if="item.showIcon" :class="item.className"></span>
      <span v-if="item.showTitle">{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
  import { notification, global } from 'find-sdk'

  export default {
    name: 'find-status-bar',
    data () {
      return {
        hasDestroyed: false,
        time: null,
        statusData: {
          usb: {},
          midi: {},
          keyboard: {},
          daemon: {},
          version: {},
          server: {},
          localname: {},
          wifi: {}
        }
      }
    },
    methods: {
      status (data) {
        for (let key in data) {
          let value = data[key]
          switch (key) {
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
              value.status === 0 ? value.className = '' : value.className = 'iconfont icon-daemon-s-warning '
              value.showTitle = false
              value.showIcon = !value.status
              break
            default:
              value.className = ''
              value.showTitle = false
              value.showIcon = false
              break
          }
          this.statusData[key] = value
        }
      }
    },
    created () {
      /// 避免快速切换带来的内存溢出
      this.time = setTimeout(() => {
        if (this.hasDestroyed) {
          return
        }
        global.getStatusBarItem()
          .then((data) => {
            this.status(data)
          })
      }, 500)
      notification.regist('statusBarChange', data => {
        console.log('change')
        let changeData = {}
        changeData[data.id] = data
        this.status(changeData)
      })
    },
    beforeDestroy () {
      clearTimeout(this.time)
      this.hasDestroyed = true
      notification.remove('statusBarChange')
    }
  }

</script>

<style lang="scss" scoped type=text/scss>
  ul {
    width: 80%;
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
    color: rgba(255, 255, 255, 0.8);
    font-size: 22px;
    height: 48px;
    line-height: 48px;
    padding-right: 40px;
    li {
      margin-right: 6px;
      float: right;
      span {
        display: inline-block;
      }

      .iconfont {
        font-size: 22px
      }

      &:nth-child(4) .iconfont {
        font-size: 20px;
      }

    }

  }
</style>
