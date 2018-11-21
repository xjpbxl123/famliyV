<template>
  <div class="queue">
    <div class="queue__herder pl-40 pr-40">
      <div class="queue__herder__img">
        <image style="width:60px;height:60px" :src="imagesUri.header" />
      </div>
      <text class='queue__herder__text colorWhite fs-36'>{{bookName}}</text>
      <text class='queue__herder__num colorWhite fs-30'>{{`共${scoreList.length}首`}}</text>
    </div>
    <div class="queue__content">
      <scroller class="queue__content__list" :show-scrollbar="true" :style="{marginTop: rightTop+'px'}">
        <div v-for="(item,index) in scoreList" :ref="'cell'+index" :key="index"
            :class="[selectIndex == index && 'queue__content__cell--active','queue__content__cell','pl-40','pr-40']">
          <div class="queue__content__cell__left">
            <div class="queue__content__cell__img">
              <image style="width:40px;height:40px" v-if="item.musicId == musicId" :src="imagesUri.playing"
                    ref="rotate" />
              <image style="width:40px;height:40px" v-if="!(item.musicId == musicId)"
                    :src="item.ignore?imagesUri.ignore:imagesUri.normal" />
            </div>
            <div class="queue__content__cell__title">
              <text class="cell__title_name colorWhite fs-30">{{item.bookName}}</text>
              <text class="cell__title_desc colorWhite fs-20">{{`《${item.name}》`}}</text>
            </div>
          </div>
          <div class="queue__content__cell__type queue__content__cell__type--align" v-if="item.files.length<=1">
            <text class="cell__type__list--normal">{{item.files[0].styleName}}</text>
          </div>
          <scroller class="queue__content__cell__type" v-if="item.files.length>1" :show-scrollbar="false">
            <div v-for="(o,i) in item.files" :key='i' class="queue__content__cell__type__item" :ref="'innerCell'+index+i">
              <!--//:class="[item.selectIndex==i ? 'cell__type__list&#45;&#45;focus' : 'cell__type__list&#45;&#45;blur']"-->
              <text :style="item.selectIndex==i ? typeCellFocus:typeCellBlur">{{o.styleName}}
                <!--<text class="hidden">{{item.selectIndex==i ? typeCellFocus.color:typeCellBlur.color}}</text>-->
              </text>
            </div>
          </scroller>
          <image :src="imagesUri.cellBg" resize="cover"
                style="height: 120px; width: 674px;position: absolute;top: 0;left: 0;"
                v-if="selectIndex == index" />
          <image :src="imagesUri.lineImg"
                style="height: 1px; width: 674px;position: absolute;bottom: 0;left: 17px;" />
        </div>
      </scroller>
    </div>
    <toolbar>
      <!--<icon-item :hidden='toobalHidden' id="290" titlePosition="below" pianoKey="90" :text="_listStatus.text" :icon="_listStatus.icon"-->
      <!--:style="{color:'#fff',backgroundColor:'#6000',textColor:'#fff'}"/>-->
      <icon-item :hidden='toobalHidden' id="292" titlePosition="below" pianoKey="92" :text="_playStatus.text"
                :icon="_playStatus.icon"
                :style="{color:'#fff',backgroundColor:'#6000',textColor:'#fff'}"/>
      <icon-item :hidden='toobalHidden' id="294" titlePosition="below" pianoKey="94" text="曲目忽略" icon="0xe6e8"
                :style="{color:'#fff',backgroundColor:'#6000',textColor:'#fff'}"/>
      <icon-item :hidden='toobalHidden' id="302" pianoKey="102" icon="0xe69a"
                :style="{color:'#fff',backgroundColor:'#6000',dotColor: '#cccccc'}"/>
      <group id="801" :slit="false" :hidden="toobalHidden">
        <icon-item id="854" pianoKey="97" icon="0xe63c"
                  :style="{color:'#fff',backgroundColor:'#2000',dotColor: '#cccccc'}"/>
        <icon-item id="855" pianoKey="98" :icon="_singVersionIcon" :text="_singVersionText" titlePosition="below"
                  :style="{color:'#fff',backgroundColor:'#2000',textColor:'#fff',dotColor: '#cccccc'}"/>
        <icon-item id="856" pianoKey="99" icon="0xe654"
                  :style="{color:'#fff',backgroundColor:'#2000',dotColor: '#cccccc'}"/>
      </group>
    </toolbar>
  </div>
</template>
<style lang="scss">
  .colorWhite {
    color: #FFFFFF;
  }

  .fs-36 {
    font-size: 36px;
  }

  .fs-30 {
    font-size: 30px;
  }

  .fs-20 {
    font-size: 20px;
  }

  .fs-22 {
    font-size: 22px;
  }

  .pl-40 {
    padding-left: 40px;
  }

  .pr-40 {
    padding-right: 40px;
  }

  .queue {
    height: 1080px;
    width: 690px;
    background-color: rgba(0, 0, 0, .6);
  }

  .hidden {
    display: none;
    opacity: 0;
    height: 0px;
    width: 0px;
  }

  .queue__herder {
    padding-bottom: 9px;
    padding-top: 37px;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-style: solid;
    border-bottom-color: rgba(255, 255, 255, .5);
    border-bottom-width: 1px;
  }

  .queue__herder__img {
    flex: 2;
    flex-direction: row;
  }

  .queue__herder__text {
    flex: 6;
    flex-direction: row;
  }

  .queue__herder__num {
    flex: 2;
  }

  .queue__content {
    height: 840px;
  }

  .queue__content__list {
  }

  .queue__content__cell {
    height: 120px;
    flex-direction: row;
  }

  .queue__content__cell--active {
  }

  .queue__content__cell__img {
    flex: 2;
  }

  .queue__content__cell__title {
    flex: 8;
  }

  .cell__title_name {
    flex: 1;
    lines: 1;
    height: 30px;
    margin-bottom: 10px;
  }

  .cell__title_desc {
    opacity: .7;
  }

  .queue__content__cell__left {
    flex: 9;
    flex-direction: row;
    align-items: center;
  }

  .queue__content__cell__type {
    flex: 5;
    align-items: center;
  }

  queue__content__cell__type__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .queue__content__cell__type__item {
    justify-content: center;
    align-items: center;
  }

  .queue__content__cell__type--align {
    width: 80px;
    justify-content: center;
  }

  .cell__type__list {
    text-align: right;
  }

  .cell__type__list--normal {
    color: #BBBBBB;
    font-size: 22px;
  }

  .cell__type__list--blur {
    width: 108px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #BBBBBB;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    font-size: 16px;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  .cell__type__list--focus {
    width: 130px;
    height: 30px;
    background-color: rgba(255, 255, 255, 1);
    color: #353535;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    font-size: 22px;
    margin-top: 7px;
    margin-bottom: 7px;
  }
</style>
<script type="es6">
  import * as toolbar from 'find-toolbar'
  import mixins from '../mixin.js'

  const globalEvent = weex.requireModule('globalEvent')
  const animation = weex.requireModule('animation')
  const find = weex.requireModule('find')
  const dom = weex.requireModule('dom')
  export default {
    name: 'midiPlayQueue',
    mixins: [mixins],
    components: {
      ...toolbar
    },
    data () {
      return {
        toobalHidden: true,
        keys: {
          listStatus: {
            fixed: {icon: '0xe6e9', text: '列表固定'},
            float: {icon: '0xe6ea', text: '列表浮动'}
          },
          playStatus: [
            {icon: '0xe6a1', text: '单曲循环'}, /// 单曲循环
            {icon: '0xe6e7', text: '单曲播放'}, /// 单曲播放
            {icon: '0xe6dd', text: '列表循环'}, /// 列表循环
            {icon: '0xe6db', text: '随机播放'} /// 随机播放
          ],
          singVersion: {
            noHave: {text: '', icon: ''},
            have: {text: undefined, icon: '0xe6eb'}
          }
        },
        imagesUri: {
          header: require('./images/collection.png'),
          lineImg: require('../../images/pic_line_list.png'),
          cellBg: require('./images/cellbg.png'),
          normal: require('./images/pic_music@2x.png'),
          ignore: require('./images/embar.png'),
          playing: require('./images/playing.png')
        },
        listStatus: 'fixed',
        playStatus: 1,
        scoreList: [],
        musicId: '',
        bookName: 'find',
        styleId: 0, /// 曲子的版本ID
        selectIndex: 0,
        typeCellFocus: {
          width: '130px',
          height: '30px',
          'background-color': 'rgba(255,255,255,1)',
          color: '#BBBBBB',
          'text-align': 'center',
          'line-height': '30px',
          'border-radius': '20px',
          'font-size': '22px',
          'margin-top': '7px',
          'margin-bottom': '7px'
        },
        typeCellBlur: {
          width: '108px',
          height: '24px',
          'background-color': 'rgba(0,0,0,.5)',
          color: '#BBBBBB',
          'text-align': 'center',
          'line-height': '24px',
          'border-radius': '14px',
          'font-size': '16px',
          'margin-top': '7px',
          'margin-bottom': '7px'
        },
        current_rotate: 0,
        t: 0
      }
    },
    methods: {
      getScoreList ({scoreList, styleId, musicId}) {
        this.styleId = styleId
        this.musicId = musicId
        this.bookName = scoreList[0].composer
        scoreList.forEach((item, index) => {
          if (item.musicId === musicId) {
            this.selectIndex = index
          }
        })
        this.filesIds(scoreList)
      },
      changeID ({styleId, musicId, selectIndex}) {
        this.styleId = styleId
        this.musicId = musicId
        this.selectIndex = selectIndex
        this.scrollTop(this.selectIndex)
      },
      errorTip (params) {
        find.sendMsgToWeb({
          method: 'weexListErrorTip',
          params
        })
      },
      rotate () {
        let el = this.$refs.rotate
        this.current_rotate += 360
        el && animation.transition(el, {
          styles: {
            transform: 'rotate(' + this.current_rotate + 'deg)',
            transformOrigin: 'center center'
          },
          duration: 2000,
          timingFunction: 'ease',
          delay: 0
        }, () => {
          this.rotate()
        })
      },
      filesIds (files) {
        for (let v of files) {
          v.selectIndex = 0
          v['ignore'] = false
          v.files.forEach((item, index) => {
            if (item.styleId === this.styleId) {
              v.selectIndex = index
            }
          })
        }
        this.scoreList = files
        this.changeScoreList(this.scoreList)
        const el = this.$refs[`innerCell${this.selectIndex}${this.scoreList[this.selectIndex].selectIndex}`][0]
        dom.scrollToElement(el, {offset: -40})
      },
      changeScoreList (files) {
        find.sendMsgToWeb({
          method: 'sendWebChangeScoreList',
          params: {files}
        })
      },
      buttonActions (type) {
        switch (type) {
          case 'next':
            this.nextCell('down')
            break
          case 'prev':
            this.nextCell('up')
            break
          case 'playType':
            this.changePlayType()
            break
          case 'musicVersion':
            this.musicVersion()
            break
          case 'ignoreMusic':
            this.ignoreMusic()
            break
          case 'ok':
            this.ok(this.selectIndex)
            break
        }
      },
      ok (selectIndex) {
        let score = this.scoreList[selectIndex]
        let files = score.files[score.selectIndex]
        let styleId = files.styleId
        let musicId = score.musicId
        if (this.scoreList[selectIndex].ignore) {
          this.errorTip({text: '此曲子被禁止掉了'})
          return
        }
        if (this.musicId === score.musicId && this.styleId === styleId) {
          this.errorTip({text: '此曲子正在播放'})
          return
        }
        this.musicId = musicId
        this.bookName = '可以切换'
        find.sendMsgToWeb({
          method: 'weexButtonOK',
          params: {files, musicId, styleId, selectIndex: this.selectIndex}
        })
      },
      ignoreMusic () {
        this.scoreList[this.selectIndex]['ignore'] && this.scoreList[this.selectIndex].musicId !== this.musicId ? this.scoreList[this.selectIndex].ignore = false : this.scoreList[this.selectIndex].ignore = true
        find.sendMsgToWeb({
          method: 'ignoreMusic',
          params: {ignoreIndex: this.selectIndex, ignore: this.scoreList[this.selectIndex].ignore}
        })
      },
      musicVersion () {
        if (this.scoreList[this.selectIndex].selectIndex < this.scoreList[this.selectIndex].files.length - 1) {
          this.scoreList[this.selectIndex].selectIndex++
        } else {
          this.scoreList[this.selectIndex].selectIndex = 0
        }
        const el = this.$refs[`innerCell${this.selectIndex}${this.scoreList[this.selectIndex].selectIndex}`][0]
        dom.scrollToElement(el, {offset: -40})
      },
      getPlayType ({type}) {
        let l = ['oneLoop', 'onePlay', 'listLoop', 'randPlay']
        this.playStatus = l.indexOf(type)
      },
      changePlayType () {
        let l = ['oneLoop', 'onePlay', 'listLoop', 'randPlay']
        find.sendMsgToWeb({
          method: 'weexButtonChangeType',
          params: l[this.playStatus]
        })
      },
      prevCell () {
        this.selectIndex = this.selectIndex > 0 ? this.selectIndex - 1 : 0
        !((this.selectIndex + 1) % 7) && this.scrollTop(this.selectIndex - 6)
      },
      nextCell (type) {
        // find.debug('nextCell')
        // this.selectIndex = this.selectIndex < this.scoreList.length - 1 ? this.selectIndex + 1 : this.scoreList.length - 1
        // !(this.selectIndex % 7) && this.scrollTop(this.selectIndex)
        switch (type) {
          case 'down':
            if (this.selectIndex < this.scoreList.length - 1) {
              this.selectIndex = this.selectIndex + 1
            }
            if (this.selectIndex > 6) {
              let el = this.$refs['cell' + (this.selectIndex - 6)][0]
              dom.scrollToElement(el, {})
            }
            break
          case 'up':
            if (this.selectIndex > 0) {
              this.selectIndex--
            }
            let ele = this.$refs['cell' + (this.selectIndex - 6)][0]
            dom.scrollToElement(ele, {})
            break
        }
      },
      scrollTop (index) {
        typeof index === 'string' && parseInt(index)
        const el = this.$refs[`cell${index}`][0]
        dom && dom.scrollToElement(el, {})
      },
      buttonCtr ({show}) {
        this.toobalHidden = show
      }
    },
    mounted () {
      setTimeout(() => {
        find.debug('selectIndex' + this.selectIndex)
        this.scrollTop(this.selectIndex)
      }, 2000)
    },
    beforeDestroy () {
    },
    watch: {},
    created () {
      globalEvent.addEventListener('pianoKeyPressed', (arg) => {
        let keyEvent = arg.data.keys[0]
        switch (keyEvent) {
          case 99:
            this.buttonActions('next')
            break
          case 97:
            this.buttonActions('prev')
            break
          case 92:
            this.buttonActions('playType')
            break
          case 98:
            this.buttonActions('musicVersion')
            break
          case 94:
            this.buttonActions('ignoreMusic')
            break
          case 102:
            this.buttonActions('ok')
            break
        }
      })
    },
    computed: {
      // rightTop () {
      //   return this.selectIndex >= 6 ? 120 * (this.selectIndex - 6) * -1 : 0
      // },
      score () {
        return this.scoreList.length > 0 ? this.scoreList[this.selectIndex] : {}
      },
      _listStatus: function () {
        return this.keys.listStatus[this.listStatus]
      },
      _playStatus: function () {
        return this.keys.playStatus[this.playStatus]
      },
      _singVersionIcon: function () {
        return this.scoreList.length > 0 && this.scoreList[this.selectIndex].files.length > 1 ? '0xe6eb' : '0x0000'
      },
      _singVersionText: function () {
        return this.scoreList.length > 0 && this.scoreList[this.selectIndex].files.length > 1 ? undefined : ''
      }
    }
  }
</script>
