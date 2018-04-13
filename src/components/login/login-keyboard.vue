<template>
  <div class="keyboard">
    <ul>
      <li v-for="(item,index) in keys" :key="index" :class="item.className">
        <span v-text="item.text"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'keyboard',
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
      clickKeyboard (key) {
        let keys = this.keys
        let len = keys.length
        switch (key) {
          case 40:
            while (++key < len) {
              let temp = keys[key].text
              keys[key].text = keys[key].symbolText
              keys[key].symbolText = temp
            }
            break
          case 64:
          case 65:
            return ''
          default:
            return this.keys[key].text
        }
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
  color: #fff;
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
