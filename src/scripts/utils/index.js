/**
 * Created by moersing on 07/02/2018.
 */
import {isString} from 'lodash'
const os = (function () {
  return (function () {
    let
      u = navigator.userAgent
    return {
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
      windowPhone: u.indexOf('Windows Phone') >= 0,
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      iPod: u.indexOf('iPod') > -1, // 是否iPod
      weChat: u.match(/MicroMessenger/i) !== null// 是否为微信
    }
  })()
}())
/**
 * @desc 日期格式化
 * @param {Date|String} date - 需要格式化的时间,如果是字符串 date的含义等价于format,date将会重新赋值为new Date
 * @param {String} [format] - 格式化字符串
 * Y:年
 * M:月
 * d:日
 * h:时
 * m:分
 * s:秒
 * S:毫秒
 * @example formatDate(new Date(),'yyyy-MM-dd')
 * */
const formatDate = function (date, format) {
  if (isString(date)) {
    format = date
    date = new Date()
  }
  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1,
                              RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
export { os, formatDate }
