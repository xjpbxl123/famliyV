<template>
  <div class="search">
    <statusBar/>
    <timbreList :list="list" :listIndex="listIndex"  :title1="title1" :title2="title2" :title3="title3"  :listIndex1="listIndex1" :listIndex2="listIndex2" :listIndex3="listIndex3"/>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
              :key="button.pianoKey"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :longClick="button.longClick"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor,fontSize:30,fontWeight:'bold'}"/>
    </toolbar>
  </div>
</template>

<script>
  import statusBar from '../common/find-status-bar/find-status-bar'
  import timbreList from './timbreList'
  import { LONG_KEY78, LONG_KEY80, KEY73, KEY75, KEY78, KEY80, KEY82, BACK_PRESSED, PEDAL_PRESSED
  } from 'vue-find'
  import { mapGetters } from 'vuex'
  export default {
    name: 'search',
    data () {
      return {
        value: '',
        listIndex: 0,
        listIndex1: 0,
        listIndex2: 0,
        listIndex3: 0,
        title1: '键盘设置',
        title2: '电子键盘音色',
        title3: '',
        list: [
          {
            name: '电子键盘音色',
            imgUrl: require('./images/piano.png'),
            iconName: 'icon-tone-change',
            items: [
              {
                name: '钢琴',
                imgUrl: require('./images/piano.png'),
                items: [
                  {
                    name: '大钢琴',
                    imgUrl: require('./images/piano.png')
                  },
                  {
                    name: '亮音钢琴',
                    imgUrl: require('./images/piano.png')
                  },
                  {
                    name: '电钢琴',
                    imgUrl: require('./images/Piano Electric.png')
                  },
                  {
                    name: '酒吧钢琴',
                    imgUrl: require('./images/piano.png')
                  },
                  {
                    name: '电钢琴1',
                    imgUrl: require('./images/Piano Electric.png')
                  },
                  {
                    name: '电钢琴2',
                    imgUrl: require('./images/Piano Electric.png')
                  },
                  {
                    name: '大键琴',
                    imgUrl: require('./images/Piano Harpsichord.png')
                  },
                  {
                    name: '电翼琴（击弦古钢琴）',
                    imgUrl: require('./images/Piano Clavinet.png')
                  }
                ]
              },
              {
                name: '钢琴半音阶打击乐器',
                imgUrl: require('./images/Percussion Tubular Bell.png'),
                items: [
                  {
                    name: '钢片琴',
                    imgUrl: require('./images/Percussion Celesta.png')
                  },
                  {
                    name: '钟琴 铁片琴',
                    imgUrl: require('./images/Percussion Glockenspiel.png')
                  },
                  {
                    name: '音乐盒',
                    imgUrl: require('./images/Percussion Musical box.png')
                  },
                  {
                    name: '颤音琴',
                    imgUrl: require('./images/Percussion Vibraphone.png')
                  },
                  {
                    name: '马林巴琴',
                    imgUrl: require('./images/Percussion Marimba.png')
                  },
                  {
                    name: '木琴',
                    imgUrl: require('./images/Percussion Xylophone.png')
                  },
                  {
                    name: '管钟',
                    imgUrl: require('./images/Percussion Tubular Bell.png')
                  },
                  {
                    name: '扬琴',
                    imgUrl: require('./images/Percussion Dulcimer.png')
                  }
                ]
              },
              {
                name: '风琴',
                imgUrl: require('./images/organ.png'),
                items: [
                  {
                    name: '音栓风琴',
                    imgUrl: require('./images/organ.png')
                  },
                  {
                    name: '敲击风琴',
                    imgUrl: require('./images/organ.png')
                  },
                  {
                    name: '摇滚风琴',
                    imgUrl: require('./images/organ.png')
                  },
                  {
                    name: '教堂管风琴',
                    imgUrl: require('./images/organ.png')
                  },
                  {
                    name: '簧风琴',
                    imgUrl: require('./images/organ.png')
                  },
                  {
                    name: '手风琴',
                    imgUrl: require('./images/Organ Accordion.png')
                  },
                  {
                    name: '口琴',
                    imgUrl: require('./images/Organ Harmonica.png')
                  },
                  {
                    name: '探戈手风琴',
                    imgUrl: require('./images/organ.png')
                  }
                ]
              },
              {
                name: '吉他',
                imgUrl: require('./images/guitar.png'),
                items: [
                  {
                    name: '木吉他(尼龙弦)',
                    imgUrl: require('./images/guitar.png')
                  },
                  {
                    name: '木吉他(钢弦)',
                    imgUrl: require('./images/guitar.png')
                  },
                  {
                    name: '电吉他(爵士)',
                    imgUrl: require('./images/Guitar Electric.png')
                  },
                  {
                    name: '电吉他(原音)',
                    imgUrl: require('./images/Guitar Electric.png')
                  },
                  {
                    name: '电吉他(闷音)',
                    imgUrl: require('./images/Guitar Electric.png')
                  },
                  {
                    name: '电吉他(过载)',
                    imgUrl: require('./images/Guitar Electric.png')
                  },
                  {
                    name: '电吉他(失真)',
                    imgUrl: require('./images/Guitar Electric.png')
                  },
                  {
                    name: '吉他合唱',
                    imgUrl: require('./images/guitar.png')
                  }
                ]
              },
              {
                name: '贝斯',
                imgUrl: require('./images/bass.png'),
                items: [
                  {
                    name: '原生贝斯',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '电贝斯(指奏)',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '电贝斯(拨奏)',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '无格贝斯',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '捶鈎贝斯 1',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '捶鈎贝斯 2',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '合成贝斯 1',
                    imgUrl: require('./images/bass.png')
                  },
                  {
                    name: '合成贝斯 2',
                    imgUrl: require('./images/bass.png')
                  }
                ]
              },
              {
                name: '弦乐器',
                imgUrl: require('./images/strings.png'),
                items: [
                  {
                    name: '小提琴',
                    imgUrl: require('./images/Strings Violin.png')
                  },
                  {
                    name: '中提琴',
                    imgUrl: require('./images/Strings Viola.png')
                  },
                  {
                    name: '大提琴',
                    imgUrl: require('./images/Strings Cello.png')
                  },
                  {
                    name: '低音大提琴',
                    imgUrl: require('./images/Strings Contrabass.png')
                  },
                  {
                    name: '颤弓弦乐',
                    imgUrl: ''
                  },
                  {
                    name: '弹拨弦乐',
                    imgUrl: ''
                  },
                  {
                    name: '竖琴',
                    imgUrl: require('./images/Strings Orchestral Harp.png')
                  },
                  {
                    name: '定音鼓',
                    imgUrl: require('./images/Strings Timpani.png')
                  }
                ]
              },
              {
                name: '合奏合唱',
                imgUrl: require('./images/Ensemble.png'),
                items: [
                  {
                    name: '弦乐合奏 1',
                    imgUrl: ''
                  },
                  {
                    name: '弦乐合奏 2',
                    imgUrl: ''
                  },
                  {
                    name: '合成弦乐 1',
                    imgUrl: ''
                  },
                  {
                    name: '合成弦乐 2',
                    imgUrl: ''
                  },
                  {
                    name: '人声“啊”',
                    imgUrl: ''
                  },
                  {
                    name: '人声“喔”',
                    imgUrl: ''
                  },
                  {
                    name: '合成人声',
                    imgUrl: ''
                  },
                  {
                    name: '交响打击乐',
                    imgUrl: require('./images/Ensemble Orchestra Hit.png')
                  }
                ]
              },
              {
                name: '铜管乐器',
                imgUrl: require('./images/brass.png'),
                items: [
                  {
                    name: '小号',
                    imgUrl: require('./images/Brass Trumpet.png')
                  },
                  {
                    name: '长号',
                    imgUrl: require('./images/Brass Trombone.png')
                  },
                  {
                    name: '大号(吐巴号、低音号)',
                    imgUrl: require('./images/Brass Tuba.png')
                  },
                  {
                    name: '闷音小号',
                    imgUrl: require('./images/Brass Trumpet.png')
                  },
                  {
                    name: '法国号(圆号)',
                    imgUrl: require('./images/Brass French horn.png')
                  },
                  {
                    name: '铜管乐',
                    imgUrl: require('./images/brass.png')
                  },
                  {
                    name: '合成铜管 1',
                    imgUrl: ''
                  },
                  {
                    name: '合成铜管 2',
                    imgUrl: ''
                  }
                ]
              },
              {
                name: '簧管乐器',
                imgUrl: require('./images/reed.png'),
                items: [
                  {
                    name: '高音萨克斯风',
                    imgUrl: require('./images/Reed Soprano Sax.png')
                  },
                  {
                    name: '中音萨克斯风',
                    imgUrl: require('./images/Reed Alto Sax.png')
                  },
                  {
                    name: '次中音萨克斯风',
                    imgUrl: require('./images/Reed Tenor Sax.png')
                  },
                  {
                    name: '上低音萨克斯风',
                    imgUrl: require('./images/Reed Baritone Sax.png')
                  },
                  {
                    name: '双簧管',
                    imgUrl: require('./images/Reed Oboe.png')
                  },
                  {
                    name: '英国管',
                    imgUrl: require('./images/Reed English Horn.png')
                  },
                  {
                    name: '低音管(巴颂管)',
                    imgUrl: require('./images/Reed Bassoon.png')
                  },
                  {
                    name: '单簧管(黑管、竖笛)',
                    imgUrl: require('./images/Reed Clarinet.png')
                  }
                ]
              },
              {
                name: '吹管乐器笛类',
                imgUrl: require('./images/Pipe Flute.png'),
                items: [
                  {
                    name: '短笛',
                    imgUrl: require('./images/Pipe Piccolo.png')
                  },
                  {
                    name: '长笛',
                    imgUrl: require('./images/Pipe Flute.png')
                  },
                  {
                    name: '竖笛',
                    imgUrl: require('./images/Pipe Recorder.png')
                  },
                  {
                    name: '排笛',
                    imgUrl: require('./images/Pipe Pan Flute.png')
                  },
                  {
                    name: '瓶笛',
                    imgUrl: require('./images/Pipe Blown Bottle.png')
                  },
                  {
                    name: '日本尺八',
                    imgUrl: require('./images/Pipe Shakuhachi.png')
                  },
                  {
                    name: '口哨',
                    imgUrl: require('./images/Pipe Whistle.png')
                  },
                  {
                    name: '陶笛',
                    imgUrl: require('./images/Pipe Ocarina.png')
                  }
                ]
              },
              {
                name: '合成主音',
                imgUrl: require('./images/Synth Lead.png'),
                items: [
                  {
                    name: '合成主音1 （方波）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音2 （锯齿波）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音3 （汽笛风琴）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音4 （吹管）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音5 （吉他）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音6 （人声）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音7 （五度锯齿波）',
                    imgUrl: ''
                  },
                  {
                    name: '合成主音8 （贝斯加主音）',
                    imgUrl: ''
                  }
                ]
              },
              {
                name: '合成柔音',
                imgUrl: require('./images/Synth Pad.png'),
                items: [
                  {
                    name: '合成音色1 （新世纪）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色2 （温暖）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色3 （八度复音合成）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色4 （人声合唱）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色5 （弓奏玻璃杯）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色6 （金属）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色7 （光环）',
                    imgUrl: ''
                  },
                  {
                    name: '合成音色8 （横归）',
                    imgUrl: ''
                  }
                ]
              },
              {
                name: '合成特效',
                imgUrl: require('./images/Synth Effects.png'),
                items: [
                  {
                    name: '雨',
                    imgUrl: require('./images/Synth Effects FX 1(rain).png')
                  },
                  {
                    name: '电影音效',
                    imgUrl: require('./images/Synth Effects FX 2(soundtrack).png')
                  },
                  {
                    name: '水晶',
                    imgUrl: require('./images/Synth Effects FX 3(crystal).png')
                  },
                  {
                    name: '气氛',
                    imgUrl: ''
                  },
                  {
                    name: '魅影',
                    imgUrl: ''
                  },
                  {
                    name: '回音',
                    imgUrl: ''
                  },
                  {
                    name: '科幻',
                    imgUrl: ''
                  }
                ]
              },
              {
                name: '民族乐器',
                imgUrl: require('./images/Ethnic Koto.png'),
                items: [
                  {
                    name: '西塔琴',
                    imgUrl: require('./images/Ethnic Sitar.png')
                  },
                  {
                    name: '五弦琴（斑鸠琴）',
                    imgUrl: require('./images/Ethnic Banjo.png')
                  },
                  {
                    name: '三味线',
                    imgUrl: require('./images/Ethnic Shamisen.png')
                  },
                  {
                    name: '十三弦琴（古筝）',
                    imgUrl: require('./images/Ethnic Koto.png')
                  },
                  {
                    name: '卡林巴铁片琴',
                    imgUrl: require('./images/Ethnic Kalimba.png')
                  },
                  {
                    name: '苏格兰风笛',
                    imgUrl: require('./images/Ethnic Bagpipe.png')
                  },
                  {
                    name: '古提琴',
                    imgUrl: require('./images/Strings Violin.png')
                  },
                  {
                    name: '唢呐',
                    imgUrl: require('./images/Ethnic Shanai.png')
                  }
                ]
              },
              {
                name: '打击乐器',
                imgUrl: require('./images/Percussive Drums.png'),
                items: [
                  {
                    name: '叮当铃',
                    imgUrl: require('./images/Percussive Tinkle Bell.png')
                  },
                  {
                    name: '阿哥哥铃',
                    imgUrl: require('./images/Percussive Agogo.png')
                  },
                  {
                    name: '钢鼓',
                    imgUrl: require('./images/Percussive Steel Drums.png')
                  },
                  {
                    name: '木鱼',
                    imgUrl: require('./images/Percussive Woodblock.png')
                  },
                  {
                    name: '太鼓',
                    imgUrl: require('./images/Percussive Taiko Drum.png')
                  },
                  {
                    name: '旋律鼓',
                    imgUrl: require('./images/Percussive Melodic Tom.png')
                  },
                  {
                    name: '合成鼓',
                    imgUrl: require('./images/Percussive Melodic Tom.png')
                  },
                  {
                    name: '铜钹',
                    imgUrl: require('./images/Percussive Reverse Cymbal.png')
                  }
                ]
              },
              {
                name: '声音特效',
                imgUrl: require('./images/Sound effects.png'),
                items: [
                  {
                    name: '吉他换把杂音',
                    imgUrl: require('./images/Sound effects Guitar Fret Noise.png')
                  },
                  {
                    name: '呼吸声',
                    imgUrl: require('./images/Sound effects.png')
                  },
                  {
                    name: '海浪声',
                    imgUrl: require('./images/Sound effects Seashore.png')
                  },
                  {
                    name: '鸟鸣',
                    imgUrl: require('./images/Sound effects Bird Tweet.png')
                  },
                  {
                    name: '电话铃声',
                    imgUrl: require('./images/Sound effects Telephone Ring.png')
                  },
                  {
                    name: '直升机',
                    imgUrl: require('./images/Sound effects Helicopter.png')
                  },
                  {
                    name: '拍手',
                    imgUrl: require('./images/Sound effects Applause.png')
                  },
                  {
                    name: '枪声',
                    imgUrl: require('./images/Sound effects Gunshot.png')
                  }
                ]
              },
              {
                name: '打击乐音符',
                imgUrl: require('./images/Percussive Drums.png')
              }
            ]
          },
          {
            name: '电子键盘移调',
            imgUrl: '',
            iconName: 'icon-transpose',
            items: [
              {

              }
            ]
          }
        ],
        toolbarHidden: false,
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe636',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 11,
            longClick: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe64c',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 12,
            longClick: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 13,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 14,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#3000',
            dotColor: '#fff',
            id: 15
          }
        ]
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    find: {
      /**
       * @desc 处理所有按键
       * */
      [KEY73] () {
        this.buttonActions('prevPage')
      },
      [KEY75] () {
        this.buttonActions('nextPage')
      },
      [KEY78] () {
        this.buttonActions('up')
      },
      [KEY80] () {
        this.buttonActions('down')
      },
      [KEY82] () {
        this.buttonActions('ok')
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [BACK_PRESSED] () {
        this.buttonActions('back')
      },
      [PEDAL_PRESSED] (key) {
        switch (key.id) {
          case 116:
            // 踏板1号键
            return this.buttonActions('up')
          case 117:
            // 踏板2号键
            return this.buttonActions('down')
          case 118:
            this.buttonActions('ok')
            break
          case 119:
            this.buttonActions('back')
        }
      }
    },
    computed: {
      ...mapGetters(['bookInfo'])
    },
    methods: {
      initData () {
      },
      buttonActions (type) {
        switch (type) {
          case 'up':
            switch (this.listIndex) {
              case 0:
                this.listIndex1 = Math.max(this.listIndex1 - 1, 0)
                if (this.listIndex1 === 0) {
                  this.title2 = '电子键盘音色'
                } else {
                  this.title2 = '电子键盘移调'
                }
                break
              case 1:
                this.listIndex2 = Math.max(this.listIndex2 - 1, 0)
                break
              case 2:
                this.listIndex3 = Math.max(this.listIndex3 - 1, 0)
                break
            }
            break
          case 'down':
            switch (this.listIndex) {
              case 0:
                this.listIndex1 = Math.min(this.listIndex1 + 1, this.list.length - 1)
                if (this.listIndex1 === 0) {
                  this.title2 = '电子键盘音色'
                } else {
                  this.title2 = '电子键盘移调'
                }
                break
              case 1:
                this.listIndex2 = Math.min(this.listIndex2 + 1, this.list[this.listIndex1].items.length - 1)
                break
              case 2:
                let items = this.list[this.listIndex1].items
                this.listIndex3 = Math.min(this.listIndex3 + 1, items[this.listIndex2].items.length - 1)
                break
            }
            break
          case 'ok':
            if (this.listIndex === 1) {
              this.title3 = this.list[0].items[this.listIndex2].name
            }
            this.listIndex = Math.min(this.listIndex + 1, 2)
            break
          case 'back':
            if (this.listIndex - 1 < 0) {
              return this.$router.back()
            }
            this.listIndex = Math.max(this.listIndex - 1, 0)
            break
        }
      }
    },
    watch: {
    },
    created () {
      this.initData()
    },
    mounted () {
      //   eventsHub.$emit('toast')
    },
    components: {
      statusBar,
      timbreList
    }
  }
</script>

<style scoped>

</style>
