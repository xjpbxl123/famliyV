/**
 * Create by Moersing on 2018/5/23
 */
const globalEvent = weex.requireModule('globalEvent')
export default {
  created () {
    globalEvent.addEventListener('receiveMsgFromWeb', this.onReceiveMessageFromWeb)
  },
  destroyed () {
    globalEvent.removeEventListener('receiveMsgFromWeb')
  }
}
