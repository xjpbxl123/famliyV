<template>
  <div class="search">
    <statusBar/>
    <timbreList :list="list" :listIndex="listIndex"  :title1="title1" :title2="title2" :title3="title3"  :listIndex1="listIndex1" :listIndex2="listIndex2" :listIndex3="listIndex3" :yidiaoValue="yidiaoValue" :chosedItem="chosedItem" :chosedItemListIndex="chosedItemListIndex" :setSelect="setSelect"/>
    <toolbar :darkBgHidden="true" :hidden="toolbarHidden">
        <icon-item v-for="(button,index) in controlButtons"
              :key="button.pianoKey"
              :id="index"
              :icon="button.icon"
              :pianoKey="button.pianoKey"
              :longClick="button.longClick"
              :hidden="button.hidden"
              :style="{backgroundColor:button.backgroundColor,color: '#fff',textColor: '#fff',dotColor: button.dotColor,fontSize:30,fontWeight:'bold'}"/>
        <group id="501" :hidden="yidiaoButtonHidden">
          <icon-item id="401" pianoKey="85" text="" icon="0xe601"
                    :style="{color:'#fff',backgroundColor:'#4000',dotColor: '#fff',textColor:'#fff'}"/>
          <icon-item id="402" pianoKey="86" icon="0xe676" text=""
                    :style="{color:'#fff',backgroundColor:'#4000',dotColor: '#fff',textColor:'#fff',fontSize:18}"/>
          <icon-item id="403" pianoKey="87" text="" icon="0xe605"
                    :style="{color:'#fff',backgroundColor:'#4000',dotColor: '#fff',textColor:'#fff'}"/>
        </group>
    </toolbar>
  </div>
</template>

<script>
  import statusBar from '../common/find-status-bar/find-status-bar'
  import timbreList from './timbreList'
  import {modules} from 'find-sdk'
  import { LONG_KEY78, LONG_KEY80, KEY73, KEY75, KEY78, KEY80, KEY82, KEY85, KEY86, KEY87, BACK_PRESSED, PEDAL_PRESSED, KEY66
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
        chosedItem: NaN,
        chosedItemListIndex: NaN,
        yidiaoButtonHidden: true,
        list: [
          {
            name: '电子键盘音色',
            imgUrl: '',
            iconName: 'icon-tone-change',
            items: [
              {
                name: '钢琴',
                imgUrl: require('./images/piano.png'),
                items: [
                  {
                    name: '大钢琴',
                    imgUrl: require('./images/piano.png'),
                    item: 0
                  },
                  {
                    name: '亮音钢琴',
                    imgUrl: require('./images/piano.png'),
                    item: 1
                  },
                  {
                    name: '电钢琴',
                    imgUrl: require('./images/Piano Electric.png'),
                    item: 2
                  },
                  {
                    name: '酒吧钢琴',
                    imgUrl: require('./images/piano.png'),
                    item: 3
                  },
                  {
                    name: '电钢琴1',
                    imgUrl: require('./images/Piano Electric.png'),
                    item: 4
                  },
                  {
                    name: '电钢琴2',
                    imgUrl: require('./images/Piano Electric.png'),
                    item: 5
                  },
                  {
                    name: '大键琴',
                    imgUrl: require('./images/Piano Harpsichord.png'),
                    item: 6
                  },
                  {
                    name: '电翼琴（击弦古钢琴）',
                    imgUrl: require('./images/Piano Clavinet.png'),
                    item: 7
                  }
                ]
              },
              {
                name: '钢琴半音阶打击乐器',
                imgUrl: require('./images/Percussion Tubular Bell.png'),
                items: [
                  {
                    name: '钢片琴',
                    imgUrl: require('./images/Percussion Celesta.png'),
                    item: 8
                  },
                  {
                    name: '钟琴 铁片琴',
                    imgUrl: require('./images/Percussion Glockenspiel.png'),
                    item: 9
                  },
                  {
                    name: '音乐盒',
                    imgUrl: require('./images/Percussion Musical box.png'),
                    item: 10
                  },
                  {
                    name: '颤音琴',
                    imgUrl: require('./images/Percussion Vibraphone.png'),
                    item: 11
                  },
                  {
                    name: '马林巴琴',
                    imgUrl: require('./images/Percussion Marimba.png'),
                    item: 12
                  },
                  {
                    name: '木琴',
                    imgUrl: require('./images/Percussion Xylophone.png'),
                    item: 13
                  },
                  {
                    name: '管钟',
                    imgUrl: require('./images/Percussion Tubular Bell.png'),
                    item: 14
                  },
                  {
                    name: '扬琴',
                    imgUrl: require('./images/Percussion Dulcimer.png'),
                    item: 15
                  }
                ]
              },
              {
                name: '风琴',
                imgUrl: require('./images/organ.png'),
                items: [
                  {
                    name: '音栓风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 16
                  },
                  {
                    name: '敲击风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 17
                  },
                  {
                    name: '摇滚风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 18
                  },
                  {
                    name: '教堂管风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 19
                  },
                  {
                    name: '簧风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 20
                  },
                  {
                    name: '手风琴',
                    imgUrl: require('./images/Organ Accordion.png'),
                    item: 21
                  },
                  {
                    name: '口琴',
                    imgUrl: require('./images/Organ Harmonica.png'),
                    item: 22
                  },
                  {
                    name: '探戈手风琴',
                    imgUrl: require('./images/organ.png'),
                    item: 23
                  }
                ]
              },
              {
                name: '吉他',
                imgUrl: require('./images/guitar.png'),
                items: [
                  {
                    name: '木吉他(尼龙弦)',
                    imgUrl: require('./images/guitar.png'),
                    item: 24
                  },
                  {
                    name: '木吉他(钢弦)',
                    imgUrl: require('./images/guitar.png'),
                    item: 25
                  },
                  {
                    name: '电吉他(爵士)',
                    imgUrl: require('./images/Guitar Electric.png'),
                    item: 26
                  },
                  {
                    name: '电吉他(原音)',
                    imgUrl: require('./images/Guitar Electric.png'),
                    item: 27
                  },
                  {
                    name: '电吉他(闷音)',
                    imgUrl: require('./images/Guitar Electric.png'),
                    item: 28
                  },
                  {
                    name: '电吉他(过载)',
                    imgUrl: require('./images/Guitar Electric.png'),
                    item: 29
                  },
                  {
                    name: '电吉他(失真)',
                    imgUrl: require('./images/Guitar Electric.png'),
                    item: 30
                  },
                  {
                    name: '吉他合唱',
                    imgUrl: require('./images/guitar.png'),
                    item: 31
                  }
                ]
              },
              {
                name: '贝斯',
                imgUrl: require('./images/bass.png'),
                items: [
                  {
                    name: '原生贝斯',
                    imgUrl: require('./images/bass.png'),
                    item: 32
                  },
                  {
                    name: '电贝斯(指奏)',
                    imgUrl: require('./images/bass.png'),
                    item: 33
                  },
                  {
                    name: '电贝斯(拨奏)',
                    imgUrl: require('./images/bass.png'),
                    item: 34
                  },
                  {
                    name: '无格贝斯',
                    imgUrl: require('./images/bass.png'),
                    item: 35
                  },
                  {
                    name: '捶鈎贝斯 1',
                    imgUrl: require('./images/bass.png'),
                    item: 36
                  },
                  {
                    name: '捶鈎贝斯 2',
                    imgUrl: require('./images/bass.png'),
                    item: 37
                  },
                  {
                    name: '合成贝斯 1',
                    imgUrl: require('./images/bass.png'),
                    item: 38
                  },
                  {
                    name: '合成贝斯 2',
                    imgUrl: require('./images/bass.png'),
                    item: 39
                  }
                ]
              },
              {
                name: '弦乐器',
                imgUrl: require('./images/strings.png'),
                items: [
                  {
                    name: '小提琴',
                    imgUrl: require('./images/Strings Violin.png'),
                    item: 40
                  },
                  {
                    name: '中提琴',
                    imgUrl: require('./images/Strings Viola.png'),
                    item: 41
                  },
                  {
                    name: '大提琴',
                    imgUrl: require('./images/Strings Cello.png'),
                    item: 42
                  },
                  {
                    name: '低音大提琴',
                    imgUrl: require('./images/Strings Contrabass.png'),
                    item: 43
                  },
                  {
                    name: '颤弓弦乐',
                    imgUrl: '',
                    item: 44
                  },
                  {
                    name: '弹拨弦乐',
                    imgUrl: '',
                    item: 45
                  },
                  {
                    name: '竖琴',
                    imgUrl: require('./images/Strings Orchestral Harp.png'),
                    item: 46
                  },
                  {
                    name: '定音鼓',
                    imgUrl: require('./images/Strings Timpani.png'),
                    item: 47
                  }
                ]
              },
              {
                name: '合奏合唱',
                imgUrl: require('./images/Ensemble.png'),
                items: [
                  {
                    name: '弦乐合奏 1',
                    imgUrl: '',
                    item: 48
                  },
                  {
                    name: '弦乐合奏 2',
                    imgUrl: '',
                    item: 49
                  },
                  {
                    name: '合成弦乐 1',
                    imgUrl: '',
                    item: 50
                  },
                  {
                    name: '合成弦乐 2',
                    imgUrl: '',
                    item: 51
                  },
                  {
                    name: '人声“啊”',
                    imgUrl: '',
                    item: 52
                  },
                  {
                    name: '人声“喔”',
                    imgUrl: '',
                    item: 53
                  },
                  {
                    name: '合成人声',
                    imgUrl: '',
                    item: 54
                  },
                  {
                    name: '交响打击乐',
                    imgUrl: require('./images/Ensemble Orchestra Hit.png'),
                    item: 55
                  }
                ]
              },
              {
                name: '铜管乐器',
                imgUrl: require('./images/brass.png'),
                items: [
                  {
                    name: '小号',
                    imgUrl: require('./images/Brass Trumpet.png'),
                    item: 56
                  },
                  {
                    name: '长号',
                    imgUrl: require('./images/Brass Trombone.png'),
                    item: 57
                  },
                  {
                    name: '大号(吐巴号、低音号)',
                    imgUrl: require('./images/Brass Tuba.png'),
                    item: 58
                  },
                  {
                    name: '闷音小号',
                    imgUrl: require('./images/Brass Trumpet.png'),
                    item: 59
                  },
                  {
                    name: '法国号(圆号)',
                    imgUrl: require('./images/Brass French horn.png'),
                    item: 60
                  },
                  {
                    name: '铜管乐',
                    imgUrl: require('./images/brass.png'),
                    item: 61
                  },
                  {
                    name: '合成铜管 1',
                    imgUrl: '',
                    item: 62
                  },
                  {
                    name: '合成铜管 2',
                    imgUrl: '',
                    item: 63
                  }
                ]
              },
              {
                name: '簧管乐器',
                imgUrl: require('./images/reed.png'),
                items: [
                  {
                    name: '高音萨克斯风',
                    imgUrl: require('./images/Reed Soprano Sax.png'),
                    item: 64
                  },
                  {
                    name: '中音萨克斯风',
                    imgUrl: require('./images/Reed Alto Sax.png'),
                    item: 65
                  },
                  {
                    name: '次中音萨克斯风',
                    imgUrl: require('./images/Reed Tenor Sax.png'),
                    item: 66
                  },
                  {
                    name: '上低音萨克斯风',
                    imgUrl: require('./images/Reed Baritone Sax.png'),
                    item: 67
                  },
                  {
                    name: '双簧管',
                    imgUrl: require('./images/Reed Oboe.png'),
                    item: 68
                  },
                  {
                    name: '英国管',
                    imgUrl: require('./images/Reed English Horn.png'),
                    item: 69
                  },
                  {
                    name: '低音管(巴颂管)',
                    imgUrl: require('./images/Reed Bassoon.png'),
                    item: 70
                  },
                  {
                    name: '单簧管(黑管、竖笛)',
                    imgUrl: require('./images/Reed Clarinet.png'),
                    item: 71
                  }
                ]
              },
              {
                name: '吹管乐器笛类',
                imgUrl: require('./images/Pipe Flute.png'),
                items: [
                  {
                    name: '短笛',
                    imgUrl: require('./images/Pipe Piccolo.png'),
                    item: 72
                  },
                  {
                    name: '长笛',
                    imgUrl: require('./images/Pipe Flute.png'),
                    item: 73
                  },
                  {
                    name: '竖笛',
                    imgUrl: require('./images/Pipe Recorder.png'),
                    item: 74
                  },
                  {
                    name: '排笛',
                    imgUrl: require('./images/Pipe Pan Flute.png'),
                    item: 75
                  },
                  {
                    name: '瓶笛',
                    imgUrl: require('./images/Pipe Blown Bottle.png'),
                    item: 76
                  },
                  {
                    name: '日本尺八',
                    imgUrl: require('./images/Pipe Shakuhachi.png'),
                    item: 77
                  },
                  {
                    name: '口哨',
                    imgUrl: require('./images/Pipe Whistle.png'),
                    item: 78
                  },
                  {
                    name: '陶笛',
                    imgUrl: require('./images/Pipe Ocarina.png'),
                    item: 79
                  }
                ]
              },
              {
                name: '合成主音',
                imgUrl: require('./images/Synth Lead.png'),
                items: [
                  {
                    name: '合成主音1 （方波）',
                    imgUrl: '',
                    item: 80
                  },
                  {
                    name: '合成主音2 （锯齿波）',
                    imgUrl: '',
                    item: 81
                  },
                  {
                    name: '合成主音3 （汽笛风琴）',
                    imgUrl: '',
                    item: 82
                  },
                  {
                    name: '合成主音4 （吹管）',
                    imgUrl: '',
                    item: 83
                  },
                  {
                    name: '合成主音5 （吉他）',
                    imgUrl: '',
                    item: 84
                  },
                  {
                    name: '合成主音6 （人声）',
                    imgUrl: '',
                    item: 85
                  },
                  {
                    name: '合成主音7 （五度锯齿波）',
                    imgUrl: '',
                    item: 86
                  },
                  {
                    name: '合成主音8 （贝斯加主音）',
                    imgUrl: '',
                    item: 87
                  }
                ]
              },
              {
                name: '合成柔音',
                imgUrl: require('./images/Synth Pad.png'),
                items: [
                  {
                    name: '合成音色1 （新世纪）',
                    imgUrl: '',
                    item: 88
                  },
                  {
                    name: '合成音色2 （温暖）',
                    imgUrl: '',
                    item: 89
                  },
                  {
                    name: '合成音色3 （八度复音合成）',
                    imgUrl: '',
                    item: 90
                  },
                  {
                    name: '合成音色4 （人声合唱）',
                    imgUrl: '',
                    item: 91
                  },
                  {
                    name: '合成音色5 （弓奏玻璃杯）',
                    imgUrl: '',
                    item: 92
                  },
                  {
                    name: '合成音色6 （金属）',
                    imgUrl: '',
                    item: 93
                  },
                  {
                    name: '合成音色7 （光环）',
                    imgUrl: '',
                    item: 94
                  },
                  {
                    name: '合成音色8 （横归）',
                    imgUrl: '',
                    item: 95
                  }
                ]
              },
              {
                name: '合成特效',
                imgUrl: require('./images/Synth Effects.png'),
                items: [
                  {
                    name: '雨',
                    imgUrl: require('./images/Synth Effects FX 1(rain).png'),
                    item: 96
                  },
                  {
                    name: '电影音效',
                    imgUrl: require('./images/Synth Effects FX 2(soundtrack).png'),
                    item: 97
                  },
                  {
                    name: '水晶',
                    imgUrl: require('./images/Synth Effects FX 3(crystal).png'),
                    item: 98
                  },
                  {
                    name: '气氛',
                    imgUrl: '',
                    item: 99
                  },
                  {
                    name: '魅影',
                    imgUrl: '',
                    item: 101
                  },
                  {
                    name: '回音',
                    imgUrl: '',
                    item: 102
                  },
                  {
                    name: '科幻',
                    imgUrl: '',
                    item: 103
                  }
                ]
              },
              {
                name: '民族乐器',
                imgUrl: require('./images/Ethnic Koto.png'),
                items: [
                  {
                    name: '西塔琴',
                    imgUrl: require('./images/Ethnic Sitar.png'),
                    item: 104
                  },
                  {
                    name: '五弦琴（斑鸠琴）',
                    imgUrl: require('./images/Ethnic Banjo.png'),
                    item: 105
                  },
                  {
                    name: '三味线',
                    imgUrl: require('./images/Ethnic Shamisen.png'),
                    item: 106
                  },
                  {
                    name: '十三弦琴（古筝）',
                    imgUrl: require('./images/Ethnic Koto.png'),
                    item: 107
                  },
                  {
                    name: '卡林巴铁片琴',
                    imgUrl: require('./images/Ethnic Kalimba.png'),
                    item: 108
                  },
                  {
                    name: '苏格兰风笛',
                    imgUrl: require('./images/Ethnic Bagpipe.png'),
                    item: 109
                  },
                  {
                    name: '古提琴',
                    imgUrl: require('./images/Strings Violin.png'),
                    item: 110
                  },
                  {
                    name: '唢呐',
                    imgUrl: require('./images/Ethnic Shanai.png'),
                    item: 111
                  }
                ]
              },
              {
                name: '打击乐器',
                imgUrl: require('./images/Percussive Drums.png'),
                items: [
                  {
                    name: '叮当铃',
                    imgUrl: require('./images/Percussive Tinkle Bell.png'),
                    item: 112
                  },
                  {
                    name: '阿哥哥铃',
                    imgUrl: require('./images/Percussive Agogo.png'),
                    item: 113
                  },
                  {
                    name: '钢鼓',
                    imgUrl: require('./images/Percussive Steel Drums.png'),
                    item: 114
                  },
                  {
                    name: '木鱼',
                    imgUrl: require('./images/Percussive Woodblock.png'),
                    item: 115
                  },
                  {
                    name: '太鼓',
                    imgUrl: require('./images/Percussive Taiko Drum.png'),
                    item: 116
                  },
                  {
                    name: '旋律鼓',
                    imgUrl: require('./images/Percussive Melodic Tom.png'),
                    item: 117
                  },
                  {
                    name: '合成鼓',
                    imgUrl: require('./images/Percussive Melodic Tom.png'),
                    item: 118
                  },
                  {
                    name: '铜钹',
                    imgUrl: require('./images/Percussive Reverse Cymbal.png'),
                    item: 119
                  }
                ]
              },
              {
                name: '声音特效',
                imgUrl: require('./images/Sound effects.png'),
                items: [
                  {
                    name: '吉他换把杂音',
                    imgUrl: require('./images/Sound effects Guitar Fret Noise.png'),
                    item: 120
                  },
                  {
                    name: '呼吸声',
                    imgUrl: require('./images/Sound effects.png'),
                    item: 121
                  },
                  {
                    name: '海浪声',
                    imgUrl: require('./images/Sound effects Seashore.png'),
                    item: 122
                  },
                  {
                    name: '鸟鸣',
                    imgUrl: require('./images/Sound effects Bird Tweet.png'),
                    item: 123
                  },
                  {
                    name: '电话铃声',
                    imgUrl: require('./images/Sound effects Telephone Ring.png'),
                    item: 124
                  },
                  {
                    name: '直升机',
                    imgUrl: require('./images/Sound effects Helicopter.png'),
                    item: 125
                  },
                  {
                    name: '拍手',
                    imgUrl: require('./images/Sound effects Applause.png'),
                    item: 126
                  },
                  {
                    name: '枪声',
                    imgUrl: require('./images/Sound effects Gunshot.png'),
                    item: 127
                  }
                ]
              },
              {
                name: '打击乐音符',
                imgUrl: require('./images/Percussive Drums.png'),
                hideArrow: true,
                item: 128
              }
            ]
          },
          {
            name: '电子键盘移调',
            imgUrl: '',
            iconName: 'icon-transpose',
            value: 1
          }
        ],
        toolbarHidden: false,
        yidiaoValue: null,
        controlButtons: [
          {
            pianoKey: 73,
            text: '',
            icon: '0xe636',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 11,
            longClick: true,
            hidden: true
          },
          {
            pianoKey: 75,
            text: '',
            icon: '0xe64c',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 12,
            hidden: true
          },
          {
            pianoKey: 78,
            text: '',
            icon: '0xe63b',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 13,
            longClick: true
          },
          {
            pianoKey: 80,
            text: '',
            icon: '0xe650',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 14,
            longClick: true
          },
          {
            pianoKey: 82,
            text: '',
            icon: '0xe69a',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 15,
            hidden: false
          },
          {
            pianoKey: 66,
            text: '',
            icon: '0xe60f',
            backgroundColor: '#4000',
            dotColor: '#fff',
            id: 16,
            hidden: true
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
      [KEY66] () {
        this.buttonActions('left')
      },
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
      [KEY85] () {
        this.buttonActions('yidiaoDown')
      },
      [KEY86] () {
        this.buttonActions('yidiaoReset')
      },
      [KEY87] () {
        this.buttonActions('yidiaoUp')
      },
      [LONG_KEY78] () {
        this.buttonActions('up')
      },
      [LONG_KEY80] () {
        this.buttonActions('down')
      },
      [BACK_PRESSED] () {
        // this.buttonActions('back')
        /**
         * @desc 需求改动，返回键逐步返回
         */
        this.buttonActions('left')
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
            // this.buttonActions('back')
            this.buttonActions('left')
        }
      }
    },
    computed: {
      ...mapGetters(['bookInfo'])
    },
    methods: {
      setSelect (index, listName) {
        console.log(listName)
        switch (this.listIndex) {
          case 0:
            if (listName !== 'list1') {
              return
            }
            if (index === 0) {
              this.listIndex = 1
            }
            this.listIndex1 = index
            break
          case 1:
            if (listName !== 'list2') {
              return
            }
            this.listIndex2 = index
            this.buttonActions('ok')
            break
          case 2:
            if (listName !== 'list3') {
              return
            }
            this.listIndex3 = index
            this.buttonActions('ok')
            break
        }
      },
      buttonActions (type) {
        switch (type) {
          case 'prevPage':
            if (this.listIndex === 1 && this.listIndex1 === 0) {
              this.listIndex2 = Math.max(this.listIndex2 - 9, 0)
            }
            break
          case 'nextPage':
            if (this.listIndex === 1 && this.listIndex1 === 0) {
              this.listIndex2 = Math.min(this.listIndex2 + 9, this.list[this.listIndex1].items.length - 1)
            }
            break
          case 'up':
            switch (this.listIndex) {
              case 0:
                this.listIndex1 = Math.max(this.listIndex1 - 1, 0)
                if (this.listIndex1 === 0) {
                  // 隐藏ok按钮
                  this.title2 = '电子键盘音色'
                } else {
                  this.title2 = '电子键盘移调'
                }
                break
              case 1:
                if (this.listIndex1 === 0) {
                  this.listIndex2 = Math.max(this.listIndex2 - 1, 0)
                }
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
                if (this.listIndex1 === 0) {
                  this.listIndex2 = Math.min(this.listIndex2 + 1, this.list[this.listIndex1].items.length - 1)
                }
                break
              case 2:
                let items = this.list[this.listIndex1].items
                this.listIndex3 = Math.min(this.listIndex3 + 1, items[this.listIndex2].items.length - 1)
                break
            }
            break
          case 'ok':
            if (this.listIndex === 2) {
              let item = this.list[0].items[this.listIndex2].items[this.listIndex3].item
              this.chosedItemListIndex = this.listIndex2
              this.list[0].imgUrl = this.list[0].items[this.listIndex2].items[this.listIndex3].imgUrl || this.list[0].items[this.listIndex2].imgUrl
              this.chosedItem = item
              return modules.device.setKeyboardTimbre(item)
            }
            if (this.listIndex === 1) {
              if (this.listIndex1 === 0) {
                if (this.list[0].items[this.listIndex2].items) {
                  this.title3 = this.list[0].items[this.listIndex2].name
                } else {
                  this.chosedItemListIndex = this.listIndex2
                  this.chosedItem = this.list[0].items[this.listIndex2].item
                  this.list[0].imgUrl = this.list[0].items[this.listIndex2].imgUrl
                  return modules.device.setKeyboardTimbre(this.list[0].items[this.listIndex2].item)
                }
              }
            }
            this.listIndex = Math.min(this.listIndex + 1, 2)
            break
          case 'yidiaoDown':
            // 电子键盘移调
            this.yidiaoValue = Math.max(this.yidiaoValue - 1, -5)
            modules.volume.setKeyBoardOffset(this.yidiaoValue)
            break
          case 'yidiaoUp':
            // 电子键盘移调
            this.yidiaoValue = Math.min(this.yidiaoValue + 1, 7)
            modules.volume.setKeyBoardOffset(this.yidiaoValue)
            break
          case 'yidiaoReset':
            this.yidiaoValue = 0
            modules.volume.setKeyBoardOffset(0)
            break
          case 'left':
            if (this.listIndex - 1 < 0) {
              return this.$router.back()
            }
            if (this.listIndex === 2) {
              this.listIndex3 = 0
            }
            if (this.listIndex === 1) {
              this.listIndex2 = 0
            }
            this.listIndex = Math.max(this.listIndex - 1, 0)
            break
          case 'back':
            return this.$router.back()
        }
      },
      getKeyboardTimbre () {
        modules.settings.getProperty('keyboardTimbre').then((data) => {
          this.list[0].items.forEach((value1, index1) => {
            if (value1.item === data) {
              this.chosedItemListIndex = index1
              this.list[0].imgUrl = value1.imgUrl
              return
            }
            value1.items && value1.items.forEach((value2, index2) => {
              if (data === value2.item) {
                this.chosedItemListIndex = index1
                this.list[0].imgUrl = value2.imgUrl || value1.imgUrl
                this.chosedItem = data
              }
            })
          })
        })
        console.log('获取键盘移调初始值')
        modules.settings.getProperty('keyboardOffset').then((data) => {
          if (data !== undefined) {
            this.yidiaoValue = data
          }
        })
      }
    },
    watch: {
      listIndex: function (val) {
        if (val === 1 && this.listIndex1 === 0) {
          this.controlButtons[0].hidden = false
          this.controlButtons[1].hidden = false
        } else {
          this.controlButtons[0].hidden = true
          this.controlButtons[1].hidden = true
        }
      },
      listIndex1: function (val) {
        if (this.listIndex === 0 && val === 0) {
          this.yidiaoButtonHidden = true
          this.controlButtons[4].hidden = false
        } else {
          this.yidiaoButtonHidden = false
          this.controlButtons[4].hidden = true
        }
      }
    },
    created () {
      this.getKeyboardTimbre()
    },
    mounted () {
    },
    components: {
      statusBar,
      timbreList
    }
  }
</script>

<style scoped>

</style>
