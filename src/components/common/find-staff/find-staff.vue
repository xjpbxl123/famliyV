<template>
  <div :class="className" ref="svgContainer" v-html="svg">
  </div>
</template>
<script>
  import mixins from '../style-mixins'
  import {file, download} from 'find-sdk'
  export default {
    name: 'find-staff',
    data () {
      return {
        svg: '',
        scripts: []
      }
    },
    mixins: [mixins],
    props: {
      musicId: {
        required: true,
        type: Number,
        default: 0
      }
    },
    methods: {
      /**
       * @desc 初始化svg
       * */
      initial () {
        let ww = window.screen.width
        let hh = window.screen.height
        // 适配当前设备
        window.setSvgPageSize(ww, hh, true)
        window.setSvgPageSizeJianpu(ww, hh, true)
      },
      /**
       * @desc 执行svg中的JavaScript
       * */
      evalScripts () {
        let container = this.$refs.svgContainer
        let scripts = container.querySelectorAll('script')
        scripts.forEach((script, index) => {
          /// 第三个是xmlScript.js的内容,直接丢弃掉，通过外部引用进来即可
          /// 由于v-html不会执行script中的内容,所以需要创建一个script标签然后重新append
          if (index < 2) {
            let insertScript = document.createElement('script')
            insertScript.type = 'text/javascript'
            insertScript.innerHTML = script.innerHTML
            container.appendChild(insertScript)
            this.scripts.push(insertScript)
          }
          container.removeChild(script)
        })
        this.$emit('loaded')
        this.initial()
      },
      handelSvg (musicId) {
        this.$store.dispatch('staff/getMusicInfo', {musicId}).then(res => {
          /// 设置下载文件的路径
          res.files[0].sHtml.localPath = '$filesCache'
          /// 开始下载文件
          download.downloadFile(res.files[0].sHtml).then((res) => {
            /// 读取
            file.readFile(res.path).then(svg => {
              /// 取出html中的svg
              let reg = /<body[^>]*>([\s\S]*)<\/body>/
              this.svg = reg.exec(svg)[1]
              this.$nextTick(this.evalScripts)
            })
          })
        })
      }
    },
    watch: {
      /**
       * @desc 下载->读取->写入页面 svg
       * */
      musicId (val) {
        this.handelSvg(val)
      }
    },
    created () {
      this.handelSvg(this.musicId)
    },
    beforeDestroy () {
      let container = this.$refs.svgContainer
      this.scripts.forEach(script => {
        container.removeChild(script)
      })
    }
  }
</script>
<style scoped>
</style>
