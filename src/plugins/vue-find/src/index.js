import {isObject} from 'lodash'
import pianoClick from './pianoClick'

class Find {
  constructor (options = {}) {
    this.globalKeyEvents = options.globalKeyEvents
  }
  static installed = false
  /**
   * @desc Vue plugin
   * @param {function} Vue
   * @param {object} [options]
   * */
  static install (Vue, options = {}) {
    if (!Find.installed) {
      Find.installed = true
    }
    Vue.mixin({
      beforeCreate () {
        /// 只在初始化的根组件绑定一次
        if (this.$root === this) {
          pianoClick(this)
          /// App 中的find忽略
          /// 忽略子组件的find
        } else if (this.$parent.$parent === this.$root && isObject(this.$options.find)) {
          pianoClick(this)
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$find', {
      get () {
        return this.$root.$options.find || {}
      }
    })
  }
}

export default Find
export * from './pianoKeys'
