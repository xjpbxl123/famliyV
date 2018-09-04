/**
 * Create by Tommy on 2018/6/6
 */
import Vue from 'vue'
import toast from './toast.vue'
const ToastConstructor = Vue.extend(toast)

let toastElement = () => {
  let div = document.createElement('div')
  return new ToastConstructor({
    el: div
  })
}
let getInstance = () => {
  let instance = toastElement()
  instance.close = function () {
    this.visible = false
    removeDom(this.$el)
  }
  return instance
}

let removeDom = event => {
  if (event.parentNode) {
    event.parentNode.removeChild(event)
  }
}
let Toast = (options = {}) => {
  let instance = getInstance()
  let duration = options.duration || 1000
  instance.text = options.text
  instance.icon = options.icon || ''
  instance.iconLoading = options.iconLoading || false
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
    if (!options.allExit) {
      ~duration && (setTimeout(() => {
        instance.close()
      }, duration))
    }
  })
  return instance
}

export default Toast
