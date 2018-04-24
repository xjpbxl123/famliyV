<template>
  <div class="keyboard">
    <ul>
      <li v-for="(item,index) in keys" :key="index" :class="item.className" @click="clickKeyboard(index)">
        <span v-text="item.text"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'keyboard',
    props: {
      setValue: Function
    },
    data () {
      return {
        keys: [
          {
            text: '',
            className: 'lower'
          },
          {
            text: 'a',
            className: ''
          },
          {
            text: 'b',
            className: ''
          },
          {
            text: 'c',
            className: ''
          },
          {
            text: 'd',
            className: ''
          },
          {
            text: 'e',
            className: ''
          },
          {
            text: 'f',
            className: ''
          },
          {
            text: 'g',
            className: ''
          },
          {
            text: 'h',
            className: ''
          },
          {
            text: 'i',
            className: ''
          },
          {
            text: 'j',
            className: ''
          },
          {
            text: 'k',
            className: ''
          },
          {
            text: 'l',
            className: ''
          },
          {
            text: 'm',
            className: ''
          },
          {
            text: 'n',
            className: ''
          },
          {
            text: 'o',
            className: ''
          },
          {
            text: 'p',
            className: ''
          },
          {
            text: 'q',
            className: ''
          },
          {
            text: 'r',
            className: ''
          },
          {
            text: 's',
            className: ''
          },
          {
            text: 't',
            className: ''
          },
          {
            text: 'u',
            className: ''
          },
          {
            text: 'v',
            className: ''
          },
          {
            text: 'w',
            className: ''
          },
          {
            text: 'x',
            className: ''
          },
          {
            text: 'y',
            className: ''
          },
          {
            text: 'z',
            className: ''
          },
          {
            text: '0',
            className: ''
          },
          {
            text: '1',
            className: ''
          },
          {
            text: '2',
            className: ''
          },
          {
            text: '3',
            className: ''
          },
          {
            text: '4',
            className: ''
          },
          {
            text: '5',
            className: ''
          },
          {
            text: '6',
            className: ''
          },
          {
            text: '7',
            className: ''
          },
          {
            text: '8',
            className: ''
          },
          {
            text: '9',
            className: ''
          },
          {
            text: '',
            className: ''
          },
          {
            text: '',
            className: ''
          },
          {
            text: ' ',
            className: 'space'
          },
          {
            text: '',
            className: 'symbol'
          },
          {
            text: ',',
            symbolText: '^',
            className: ''
          },
          {
            text: '.',
            symbolText: '*',
            className: ''
          },
          {
            text: '?',
            symbolText: '+',
            className: ''
          },
          {
            text: '/',
            symbolText: '-',
            className: ''
          },
          {
            text: '!',
            symbolText: '=',
            className: ''
          },
          {
            text: '~',
            symbolText: '_',
            className: ''
          },
          {
            text: '@',
            symbolText: '<',
            className: ''
          },
          {
            text: '#',
            symbolText: '>',
            className: ''
          },
          {
            text: '$',
            symbolText: '\\',
            className: ''
          },
          {
            text: '%',
            symbolText: '(',
            className: ''
          },
          {
            text: '{',
            symbolText: ')',
            className: ''
          },
          {
            text: '}',
            symbolText: '[',
            className: ''
          },
          {
            text: '|',
            symbolText: ']',
            className: ''
          },
          {
            text: ':',
            symbolText: "'",
            className: ''
          },
          {
            text: '"',
            symbolText: '&',
            className: ''
          }
        ]
      }
    },
    methods: {
      /**
       * @desc 处理钢琴按下按键对应的文本
       * @param {Number} index - 按下按键对应的文本索引
       * */
      clickKeyboard (index) {
        let keys = this.keys
        let len = keys.length
        switch (index) {
          /// switch lower-case/upper-case
          case 0:
            let switchCase = String.prototype.toUpperCase
            index = index + 1 // 0是切换大小写,从1开始是英文
            if (/[A-Z]/.test(keys[index].text)) {
              switchCase = String.prototype.toLowerCase
            }
            while (index <= 26) {
              keys[index].text = switchCase.call(keys[index].text)
              index++
            }
            return ''
          case 40:
            /// 切换符号
            while (index < len) {
              let temp = keys[index].text
              keys[index].text = keys[index].symbolText
              keys[index].symbolText = temp
              index++
            }
            return ''
          case 64:
          case 65:
            return ''
        }
        this.setValue(keys[index].text)
      }
    }
  }
</script>

<style lang="scss" scoped>
.keyboard {
  position: absolute;
  bottom: 8px;
  overflow: hidden;
  margin-left: 24px;
  border-radius: 15px;
  width: 2800px;
  height: 54px;
  background: transparent url("./keyboard-bg.png") center no-repeat;
}

li {
  display: inline-block;
  width: 50px;
  height: 54px;
  line-height: 54px;
  vertical-align: middle;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  color: #000;
    &:nth-child(12n+1){
      color: #fff;
    }
    &:nth-child(12n+4){
      color: #fff;
    }
    &:nth-child(12n+6){
      color: #fff;
    }
    &:nth-child(12n+8){
      color: #fff;
    }
    &:nth-child(12n+11){
      color: #fff;
    }
    &:nth-child(12n+13){
      color: #fff;
    }
    &:nth-child(12n+1){
      color: #fff;
    }
}

.lower {
  background: transparent url("./icon-capital-open.png") center no-repeat;
}

.space {
  background: transparent url("./icon-space.png") center no-repeat;
}

.symbol {
  background: transparent url("./icon-punctuation.png") center no-repeat;
}
</style>
