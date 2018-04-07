import {isFunction} from 'lodash'
import * as keys from './pianoKeys'
const execEventWithContext = (event, context, params) => {
  if (arguments.length < 2) {
    throw new Error('events with context is required')
  }
  if (isFunction(event)) {
    event.call(context, params)
  }
}
/**
 * @desc 接收钢琴按下事件
 * @param {string|arrays} key - 按下那个键
 * */
export const handelClick = function (key) {
  let root = this.$root
  let globalKeyEvents = root.$options.find.globalKeyEvents
  let childrenEvents = this.$options.find
  let keySymbol = keys[`KEY${key}`]
  if (!keySymbol) {
    keySymbol = keys['KEY_COMBINE']
  }
  execEventWithContext(globalKeyEvents[keySymbol], root, key)
  execEventWithContext(childrenEvents[keySymbol], this, key)
}
/**
 * @desc 监听app发送过来的keyEvent
 * @param {object} vm - vue组件实例
 * */
const pianoClick = (vm) => {
  vm.$options.find = Object.assign({}, vm.$options.find)
  if (isFunction(window.app.keyEvent)) {
    window.app.keyEvent = null
  }
  window.app.keyEvent = ({keys}) => {
    if (!keys) {
      throw new Error('param `key` is required')
    }
    if (keys.length === 1) {
      handelClick.call(vm, keys[0])
    } else {
      handelClick.call(vm, keys)
    }
  }
}
export default pianoClick
